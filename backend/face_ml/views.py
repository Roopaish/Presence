import json
import os
from users.models import UserAttendance
import cv2
import face_recognition
from imutils import paths
import pickle
import time
from django.http import JsonResponse
from django.contrib.admin.views.decorators import user_passes_test
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from imutils.video import VideoStream
from datetime import date, timedelta
import imutils
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

@user_passes_test(lambda u: u.is_superuser)
def encode_images(request):
    dataset_path = 'datasets'
    encodings_path = 'encodings.pickle'

    if not os.path.exists(dataset_path):
        return JsonResponse({'success': False, 'message': 'Dataset directory not found'}, status=400)

    image_paths = list(paths.list_images(dataset_path))

    known_encodings = []
    known_names = []

    channel_layer = get_channel_layer()

    for (i, image_path) in enumerate(image_paths):
        name = os.path.basename(os.path.dirname(image_path))
        image = cv2.imread(image_path)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        boxes = face_recognition.face_locations(rgb)
        encodings = face_recognition.face_encodings(rgb, boxes)

        for encoding in encodings:
            known_encodings.append(encoding)
            known_names.append(name)

        async_to_sync(channel_layer.group_send)(
            'log_group',
            {
                'type': 'log_message',
                'message': f"Processed image {i+1}/{len(image_paths)} of {name}"
            }
        )

    async_to_sync(channel_layer.group_send)(
            'log_group',
            {
                'type': 'log_message',
                'message': f"[INFO] Serializing encodings..."
            }
        )
    data = {"encodings": known_encodings, "names": known_names}
    with open(encodings_path, "wb") as f:
        f.write(pickle.dumps(data))

    async_to_sync(channel_layer.group_send)(
        'log_group',
        {
            'type': 'log_message',
            'message': "Encoded images for all users"
        }
    )

    return JsonResponse({'success': True})

stop_stream = False

@user_passes_test(lambda u: u.is_superuser)
@csrf_exempt
def take_attendance(request):
    global stop_stream

    if request.method == 'POST':
        json_data = json.loads(request.body)
        display_video = json_data.get('display_video') or False
        channel_layer = get_channel_layer()
        dataset_path = 'datasets'
        encodings_path = 'encodings.pickle'
        image_paths = list(paths.list_images(dataset_path))

        if not os.path.exists(dataset_path):
            return JsonResponse({'success': False, 'message': 'Dataset directory not found'}, status=400)

        # Load the known faces and embeddings
        async_to_sync(channel_layer.group_send)(
            'log_group',
            {
                'type': 'log_message',
                'message': "[INFO] Loading encodings..."
            }
        )
        data = pickle.loads(open(encodings_path, "rb").read())
        # Initialize the video stream and allow the camera sensor to warm up
        async_to_sync(channel_layer.group_send)(
            'log_group',
            {
                'type': 'log_message',
                'message': "[INFO] Starting video stream..."
            }
        )
        vs = VideoStream(src=0).start()
        time.sleep(2.0)

        detected_users = []
        # Loop over frames from the video file stream
        while True:
            print(stop_stream)
            if stop_stream:
                break
            # Grab the frame from the threaded video stream
            frame = vs.read()

            # Convert the input frame from BGR to RGB then resize it to have
            # a width of 750px (to speed up processing)
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            rgb = imutils.resize(frame, width=750)
            r = frame.shape[1] / float(rgb.shape[1])
            # Detect the (x, y)-coordinates of the bounding boxes
            # corresponding to each face in the input frame, then compute
            # the facial embeddings for each face
            boxes = face_recognition.face_locations(rgb, model='hog')
            encodings = face_recognition.face_encodings(rgb, boxes)
            names = []

            # Loop over the facial embeddings
            for encoding in encodings:
                # Attempt to match each face in the input image to our known encodings
                matches = face_recognition.compare_faces(data["encodings"], encoding)
                name = "Unknown"
                # Check to see if we have found a match
                if True in matches:
                    # Find the indexes of all matched faces then initialize a
                    # dictionary to count the total number of times each face
                    # was matched
                    matchedIdxs = [i for (i, b) in enumerate(matches) if b]
                    counts = {}
                    # Loop over the matched indexes and maintain a count for
                    # each recognized face face
                    for i in matchedIdxs:
                        name = data["names"][i]
                        counts[name] = counts.get(name, 0) + 1
                    # Determine the recognized face with the largest number
                    # of votes (note: in the event of an unlikely tie Python
                    # will select the first entry in the dictionary)
                    name = max(counts, key=counts.get)

                # Update the list of names
                names.append(name)
                if name not in detected_users:
                    detected_users.append(name)
                    async_to_sync(channel_layer.group_send)(
                        'log_group',
                        {
                            'type': 'log_message',
                            'message': f"Recognized {name}"
                        }
                    )
                
                if len(detected_users) >= len(image_paths):
                    stop_stream = True
                    break

            if display_video:
                # Loop over the recognized faces
                for ((top, right, bottom, left), name) in zip(boxes, names):
                    # Rescale the face coordinates
                    top = int(top * r)
                    right = int(right * r)
                    bottom = int(bottom * r)
                    left = int(left * r)
                    # Draw the predicted face name on the image
                    cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                    y = top - 15 if top - 15 > 15 else top + 15
                    cv2.putText(frame, name, (left, y), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

                    # Display the output frame to the screen
                    cv2.imshow("Frame", frame)
                    key = cv2.waitKey(1) & 0xFF
                    # If the `q` key was pressed, break from the loop
                    if key == ord("q"):
                        break            

        stop_stream = False
        # Do a bit of cleanup
        cv2.destroyAllWindows()
        vs.stop()

        # Check attendance and mark it in the database
        today = date.today()
        attendance_queryset = UserAttendance.objects.filter(day=today.day, month=today.month, year=today.year)
        previous_day = today - timedelta(days=1)

        # Get the list of UserAttendance objects for the previous day
        previous_attendance_queryset = UserAttendance.objects.filter(day=previous_day.day, month=previous_day.month, year=previous_day.year)

        # Create a dictionary to store attendance status (present or not) for each user
        attendance_status = {}

        for email in names:
            if previous_attendance_queryset.filter(user__email=email).exists():
                attendance_status[email] = True
            else:
                attendance_status[email] = False

        for email, is_present in attendance_status.items():
            user = User.objects.get(email=email)
            attendance, created = UserAttendance.objects.get_or_create(
                user=user, day=today.day, month=today.month, year=today.year
            ) 

            if is_present:
                attendance.streak = attendance.streak + 1 if attendance_queryset.filter(user__name=name).exists() else 1
                async_to_sync(channel_layer.group_send)(
                    'log_group',
                    {
                        'type': 'log_message',
                        'message': f"Attendance taken for {name} (from embeddings)"
                    }
                )
            else:
                attendance.streak = 1
            attendance.save()

        return JsonResponse({'success': True, 'message': 'Attendance marked successfully'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)


@user_passes_test(lambda u: u.is_superuser)
@csrf_exempt
def stop_video_stream(request):
    global stop_stream

    if request.method == 'POST':
        if stop_stream:
            return JsonResponse({'success': False, 'message': 'Video stream is already stopped'})

        stop_stream = True  

        return JsonResponse({'success': True, 'message': 'Video stream stopped successfully'})
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)