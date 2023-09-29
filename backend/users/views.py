import json
import os
import requests
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import user_passes_test
from django.db import models
from users.models import Attendance
from datetime import datetime, timedelta


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        username = json_data.get('email')
        email = json_data.get('email')
        password = json_data.get('password')
        password_confirm = json_data.get('password_confirm')
        first_name = json_data.get('first_name')
        last_name = json_data.get('last_name')
        is_superuser = json_data.get('is_superuser')

        if not (username and email and password and password_confirm and first_name and last_name):
            return JsonResponse({'success': False,
                                 'message': 'Please provide all required fields.'}, status=400)

        if password != password_confirm:
            return JsonResponse({'success': False, 'message': 'Passwords do not match.'}, status=400)

        # Create the user
        try:
            if User.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'Username already exists.'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email already exists.'}, status=400)

            user = User.objects.create_user(
                username=username, email=email, password=password,
                first_name=first_name, last_name=last_name,
                is_superuser=is_superuser or False
            )

            user.save()

            return JsonResponse({'success': True, 'message': 'Account created successfully!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)


@csrf_exempt
def user_login(request):
    print(request)
    if request.method == 'POST':
        json_data = json.loads(request.body)
        username = json_data.get('username')
        password = json_data.get('password')

        if not (username and password):
            return JsonResponse(
                {'success': False, 'message': 'Please provide email and password.'}, status=400
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Login successful!'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid email or password.'}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)


@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'success': True, 'message': 'Logout successful!'})


@login_required
def get_current_user(request):
    user = request.user
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'has_submitted_images': user.is_staff or False,
        'is_superuser': user.is_superuser or False
    }
    return JsonResponse({'success': True, 'data': user_data})


@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        email = json_data.get('email')

        user = User.objects.filter(email=email).first()
        if user:
            mail_subject = 'Reset your password for Presence'
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            email_body = render_to_string(
                'users/forgot_password_email.html',
                {
                    'user': user,
                    'reset_url': f'http://localhost:3000/reset-password/{uid}/{token}',
                }
            )

            send_mail(subject=mail_subject,
                      message='',
                      from_email='settings.EMAIL_HOST_USER',
                      recipient_list=[email],
                      html_message=email_body
                      )

            return JsonResponse({'success': True,
                                 'message': 'An email has been sent to reset your password.'})

        return JsonResponse({'success': False, 'message': 'No user found with this email.'}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)


@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        new_password = json_data.get('new_password')

        if not new_password:
            return JsonResponse({'success': False, 'message': 'Please provide new password.'}, status=400)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        # pylint: disable=E1101
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return JsonResponse({'success': False, 'message': 'Invalid reset link.'}, status=400)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return JsonResponse({'success': True, 'message': 'Password reset successfully.'})

        return JsonResponse({'success': False, 'message': 'Invalid reset link.'}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)


@csrf_exempt
def google_login(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        token = json_data.get('token')

        try:
            url = f"https://www.googleapis.com/oauth2/v1/userinfo?access_token={token}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                print(data)
                email = data.get('email')
                if not email:
                    return JsonResponse({'success': False, 'message': 'Unable to fetch user email from Google API.'}, status=400)

                User = get_user_model()
                try:
                    user = User.objects.get(email=email)
                except User.DoesNotExist:
                    return JsonResponse({'success': False, 'message': 'User does not exist.'}, status=400)

                login(request, user)

                return JsonResponse({'success': True, 'message': 'Google login successful.'})
            else:
                return JsonResponse({'success': False, 'message': 'Failed to fetch user information from Google API.'}, status=400)

        except ValueError as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)


@login_required
@csrf_exempt
def save_images(request):
    try:
        email = request.user.email
        images = request.FILES.getlist('image')

        folder_path = os.path.join('datasets', email)

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        for index, image in enumerate(images):
            file_path = os.path.join(folder_path, f'{index + 1}.jpg')
            with open(file_path, 'wb') as f:
                for chunk in image.chunks():
                    f.write(chunk)

        request.user.is_staff = True
        request.user.save()

        return JsonResponse({'success': True, 'message': 'Images saved successfully'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


# @api_view(['GET'])
# def student_list(request):
#     students = Student.objects.all()
#     serializer=StudentSerializer(students,many=True)
#     return Response(serializer.data)

@user_passes_test(lambda u: u.is_superuser)
def students_list(request):
    students = User.objects.filter(is_superuser=False)
    student_data = []

    for student in students:
        student_data.append({
            'id': student.id,
            'username': student.username,
            'email': student.email,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'has_submitted_images': student.is_staff or False,
            'is_superuser': student.is_superuser or False
        })

    return JsonResponse({
        'success': True,
        'data': student_data
    })


@user_passes_test(lambda u: u.is_superuser)
@csrf_exempt
def student_detail(request, id):
    if request.method == 'GET':
        student = get_object_or_404(User, id=id, is_superuser=False)
        # Customize the response data according to your requirements
        data = {
            'id': id,
            'username': student.username,
            'email': student.email,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'has_submitted_images': student.is_staff or False,
            'is_superuser': student.is_superuser or False
        }
        return JsonResponse({
            'success': True,
            'data': data
        })

    elif request.method == 'DELETE':
        student = get_object_or_404(User, id=id, is_superuser=False)
        student.delete()
        return JsonResponse({'success': False, 'message': f'Student with id {id} has been deleted'})

    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)








def count_attendance_streak(attendance_queryset):
    attendance_list = list(attendance_queryset)
    streak = 0
    max_streak = 0
    prev_date = None

    for attendance in attendance_list:
        current_date = datetime(attendance.year, attendance.month, attendance.day)

        # Check if the day is not a Saturday
        if current_date.weekday() != 5:
            if prev_date is not None and prev_date + timedelta(days=1) == current_date:
                streak += 1
            else:
                streak = 1

            if streak > max_streak:
                max_streak = streak

            prev_date = current_date
        else:
            streak = 0

    # Include the current day in the streak calculation
    current_date = datetime.now()
    if current_date.weekday() != 5:  # Check if the current day is not a Saturday
        if prev_date is not None and prev_date + timedelta(days=1) == current_date:
            streak += 1
        else:
            streak = 1

        if streak > max_streak:
            max_streak = streak

    return max_streak

















@login_required
@csrf_exempt
def get_attendance(request, month, year):
    if request.method == 'GET':
        user = request.user

        if not month or not year:
            return JsonResponse({'message': 'Month and year parameters are required.'}, status=400)

        try:
            month = int(month)
            year = int(year)
        except ValueError:
            return JsonResponse({'message': 'Invalid month or year.'}, status=400)

        attendance_queryset = Attendance.objects.filter(
            user=user, month=month, year=year).order_by('day')

        if not  attendance_queryset.exists():
            max_streak = 0

        else:    
             prev_month = month - 1 if month > 1 else 12
             prev_year = year if month > 1 else year - 1
             prev_attendance_queryset = Attendance.objects.filter(
                user=user, month=prev_month, year=prev_year).order_by('day')

             max_streak_current_month = count_attendance_streak(attendance_queryset)
             max_streak_prev_month = count_attendance_streak(prev_attendance_queryset)

             max_streak = max(max_streak_current_month, max_streak_prev_month)
       
        # if len(attendance_queryset) > 0 and attendance_queryset[0].day > 1:
        #     max_streak = 0

        current_day = datetime.now().day

        # is_current_day_present = prev_attendance_queryset.filter(day=current_day).exists()
         
         

        


        # if current_day not in [attendance.day for attendance in attendance_queryset if attendance.streak > 0]:
        #    max_streak = 0
        





        # Build the response data
        attendance_data = {
            'month': month,
            'year': year,
            'streak': max_streak,
            'start_day': attendance_queryset[0].day if attendance_queryset else 0,
            'end_day': attendance_queryset[len(attendance_queryset) - 1].day if attendance_queryset else 0,
            # 'attendance': [attendance.streak > 0 for attendance in attendance_queryset]
            'attendance_days': [attendance.day for attendance in attendance_queryset if attendance.streak > 0]

        }

        return JsonResponse({'success': True, 'data': attendance_data})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)


@user_passes_test(lambda u: u.is_superuser)
def get_all_attendance_of_day(request, year, month, day):
    if not day or not month or not year:
        return JsonResponse({'message': 'Day, month, and year parameters are required.'}, status=400)

    try:
        day = int(day)
        month = int(month)
        year = int(year)
    except ValueError:
        return JsonResponse({'message': 'Invalid day, month, or year.'}, status=400)

    # Retrieve the attendance data for the specified day, month, and year
    attendance_queryset = Attendance.objects.filter(
        day=day, month=month, year=year)

    present_users = []
    absent_users = []



    for attendance in attendance_queryset:
        user = attendance.user
        user_data = {'name': user.name, 'email': user.email}

        if attendance.streak > 0:
            present_users.append(user_data)
        else:
            absent_users.append(user_data)

    attendance_result = {'present_users': present_users,
                         'absent_users': absent_users}

    return JsonResponse({'success': True, 'data': attendance_result})




@user_passes_test(lambda u: u.is_superuser)
@csrf_exempt

def delete_attendance(request, year, month, day):
    print(request)
   
    if request.method == 'DELETE':
        

        try:
            # Convert year, month, and day to integers
            year, month, day = int(year), int(month), int(day)

            # Try to get the attendance entry for the specified date
            try:
                attendance = Attendance.objects.get(year=year, month=month, day=day)

            except Attendance.DoesNotExist:
                return JsonResponse({'success': False, 'message': 'Attendance entry not found for the specified date'}, status=404)

            # Delete the attendance entry
            attendance.delete()

            return JsonResponse({'success': True, 'message': f'Attendance entry deleted for {day}/{month}/{year}'}, status=200)

        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error while deleting attendance entry: {e}'}, status=500)

    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=200)




@user_passes_test(lambda u: u.is_superuser)
def get_attendance_by_month_year(request,year, month):

    if  not month or not year:
        return JsonResponse({'message': ' month, and year parameters are required.'}, status=400)
   
    try:
        month = int(month)
        year = int(year)
    except ValueError:
        return JsonResponse({'message': 'Invalid month or year.'}, status=400)

    attendance_queryset = Attendance.objects.filter(
        month=month, year=year)

    present_users = []
    user_ids = set(User.objects.filter(is_superuser=False).values_list('id', flat=True))

    present_user_ids = set(attendance_queryset.exclude(user__is_superuser=True).values_list('user_id', flat=True))
 
    absent_user_ids = user_ids - present_user_ids

    absent_users = User.objects.filter(id__in=absent_user_ids)
 

    absent_users_data = []

    for attendance in attendance_queryset:
        user = attendance.user
         
        user_data = {'name': user.username, 'email': user.email,'date':attendance.day}
        present_users.append(user_data)
        
        absent_users_data.extend([{'name': user.username, 'email': user.email, 'date': attendance.day} for user in absent_users])
    attendance_result = {'present_users': present_users}
   
    # absent_users_data = [{'name': user.username, 'email': user.email,'date':attendance.day} for user in absent_users]



    total_students = User.objects.filter(is_superuser=False).count()

    return JsonResponse({'success': True, 'data': {
            'attendance': attendance_result,
            'absent_users': absent_users_data
        },'total_student':total_students},status=200)
    
   