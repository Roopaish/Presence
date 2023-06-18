import os
import cv2
import face_recognition
from imutils import paths
import pickle
from django.http import JsonResponse
from django.contrib.admin.views.decorators import staff_member_required
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@staff_member_required
def encode_images(request):
    dataset_path = 'datasets'
    encodings_path = 'encodings.pickle'

    if not os.path.exists(dataset_path):
        return JsonResponse({'error': 'Dataset directory not found'})

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
                'message': f"Processed image {i+1}/{len(image_paths)}"
            }
        )

    print("[INFO] Serializing encodings...")
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
