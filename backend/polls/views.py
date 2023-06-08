import random
from django.http import HttpResponse
from django.http import JsonResponse

def index():
    return HttpResponse("Hello, world. You're at the polls index.")


def generate_random_number(_, seed):
    random.seed(seed)
    number = random.randint(1, 100)
    return JsonResponse({'seed': seed, 'number': number})
