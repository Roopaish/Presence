from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import os


def hello(request):
    return HttpResponse("Hello world ! ")


def hello2(request):
    return render(request, 'hello.html', {'name': 'Django'})


@csrf_exempt
def save_images(request):
    if request.method == 'POST':
        person_name = request.POST.get('personName')
        images = request.FILES.getlist('image')

        if not person_name:
            return HttpResponseBadRequest('Missing personName parameter')

        save_dir = f'./dataset/{person_name}'
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)

        for index, image in enumerate(images):
            file_path = os.path.join(save_dir, f'{index + 1}.jpg')
            with open(file_path, 'wb') as f:
                for chunk in image.chunks():
                    f.write(chunk)

        return HttpResponse('Images saved successfully')

    return HttpResponseBadRequest('Invalid request method')
