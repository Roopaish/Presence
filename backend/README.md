## Running the project

1.  Install dependencies

    > if in vscode

    - Open VSCode, download recommended extensions of python
    - Ctrl+shift+p, Create new virtual environment by selecting requirements.txt

2.  Open terminal, you will see venv in the terminal else activate it `name-of-the-env\Scripts\activate`
3.  `python manage.py migrate`
4.  `python manage.py createsuperuser` (to create a admin then go to localhost:8000/admin and login)
5.  `python manage.py runserver`

## Creating new app

1. python manage.py startapp app-name
2. Register the app in settings.py
3. Make migrations after defining the model `python manage.py makemigrations app-name`
4. To see the migration query `python manage.py sqlmigrate app-name 0001`
5. To apply changes to database `python manage.py migrate`

## Creating a django project | Useful commands

1. `python -m venv name-of-env` (create new env to make files isolated from the system)
2. Enter into the env
   name-of-the-env\Scripts\activate
   Note: To exit environment: deactivate
3. `pip install django` (intall django in current env)
4. `django-admin startproject name-of-project` (create a project)
5. `cd name-of-project` (go to project directory)
6. `python manage.py migrate` (run migrations, generate sqlite database for now)
7. `python manage.py runserver 8000`(run development server, the server will start at localhost:8000, 8000 is optional, can be any port)
8. `python manage.py createsuperuser` (to create a admin then go to localhost:8000/admin and login)
9. `pip freeze > requirements.txt` (generate requirements file, so others know what pacakges and versions are being used)
10. `pip install -r requirements.txt` (to install packages from requirements.txt)

## Creating a django apps

Django apps are like modules, they are reusable components of a project. They can be used in other projects as well.

### Already installed apps

```py
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin', # admin interface
    'django.contrib.auth', # authenticating user
    'django.contrib.contenttypes',
    'django.contrib.sessions', # session management
    'django.contrib.messages', # displaying one-time notifications to user
    'django.contrib.staticfiles', # serve static files
]
```

### Creating a custom app

```bash
python manage.py startapp app-name
```

Register the app

```py
# settings.py
INSTALLED_APPS = [
    ...
    'app-name'
]
```

Quick look at modules of app

- admin.py: define how the app interacts with the admin interface
- apps.py: define configuration for the app
- models.py: define database models, which are used to interact with database
- tests.py: define tests for the app
- views.py: request handling logic, no html

## Superuser

Username: presence-admin
Email: rupesh39943@gmail.com
Password: presence-admin-sars
