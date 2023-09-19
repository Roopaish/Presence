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

## What's left

- Attendance not marking (table has problem, need fix)

  - Attendance should be taken once a day (day-month-year => primary key)
  - Attendance can be taken for today only
  - Retake attendance not allowed
  - If retake attendance, first need to clear what was already taken for today
  - Saved data: Day, month, year, present-student-list (id-> foreign key to student),
  - While saving data: Student table should be updated too, like their streak should be increased, and Student (foreign key:attendance's list)

- Streak in Student table

  - If taken attendance, then increase it
  - If he/she is absent, then make it 0 again

- Student API/Front page

  - Attendance details: query: month, year response: days present in that month and year
  - Report mistake: day, month, year =>

- Reports: In admin panel

  - Attendance data should be shown
  - Y : no of student X: Date
