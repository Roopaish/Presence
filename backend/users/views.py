import json
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
# from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.decorators import login_required


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        username = json_data.get('username')
        email = json_data.get('email')
        password = json_data.get('password')
        password_confirm = json_data.get('password_confirm')
        first_name = json_data.get('first_name')
        last_name = json_data.get('last_name')

        if not (username and email and password and password_confirm and first_name and last_name):
            return JsonResponse({'success': False,
                                 'message': 'Please provide all required fields.'})

        if password != password_confirm:
            return JsonResponse({'success': False, 'message': 'Passwords do not match.'})

        # Create the user
        try:
            if User.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'Username already exists.'})

            if User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email already exists.'})

            user = User.objects.create_user(
                username=username, email=email, password=password,
                first_name=first_name, last_name=last_name
            )

            user.save()

            return JsonResponse({'success': True, 'message': 'Account created successfully!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        username = json_data.get('username')
        password = json_data.get('password')

        if not (username and password):
            return JsonResponse(
                {'success': False, 'message': 'Please provide username and password.'}
            )

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Login successful!'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid username or password.'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'})


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
        'last_name': user.last_name
    }
    return JsonResponse({'success': True, 'data': user_data})


@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        email = json_data.get('email')

        user = User.objects.filter(email=email).first()
        if user:
            mail_subject = 'Reset your password'
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = reverse('reset_password', kwargs={
                                 'uidb64': uid, 'token': token})
            # TODO: Change this to your frontend URL
            reset_url = f'http://localhost:3000/{reset_link}'

            email_body = render_to_string(
                'users/forgot_password_email.html',
                {
                    'user': user,
                    'reset_url': reset_url,
                }
            )

            send_mail(mail_subject, email_body,
                      'settings.EMAIL_HOST_USER', [email])

            return JsonResponse({'success': True,
                                 'message': 'An email has been sent to reset your password.'})

        return JsonResponse({'success': False, 'message': 'No user found with this email.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        new_password = json_data.get('new_password')

        if not new_password:
            return JsonResponse({'success': False, 'message': 'Please provide new password.'})

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        # pylint: disable=E1101
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return JsonResponse({'success': False, 'message': 'Invalid reset link.'})

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return JsonResponse({'success': True, 'message': 'Password reset successfully.'})

        return JsonResponse({'success': False, 'message': 'Invalid reset link.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})
