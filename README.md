# Presence: Automated Attendance System

## Code of conduct

- Always create new branches from latest main branch
- Create and name the branch the feature you are adding
- After completion of task, send a PR to main
- If any merge conflicts are there, solve it yourself and be very careful

## How to run

- Clone the repo
- Go to the backend folder
  - Create a virtual environment using `python -m venv .venv`
  - Activate the virtual environment using `.venv\Scripts\activate`
  - Install the dependencies using `pip install -r requirements.txt`
  - Copy the `.env.example` file to `.env` and fill the values
  - Run the migrations using `python manage.py migrate`
  - Create a superuser using `python manage.py createsuperuser`
  - Run the server using `python manage.py runserver` or `daphne presence.asgi:application` to run the server with asgi configuration to handle both http and websocket requests
- Go to the frontend folder
  - Install the dependencies using `yarn install`
  - Copy the `.env.example` file to `.env.local`
  - Run the server using `yarn dev`
- Go to `localhost:3000` to see the app running
