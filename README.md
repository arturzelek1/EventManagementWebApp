# Event Management Web Application

## 🧩 Features

- **Create & Edit Events**  
  Organizers can add new events by specifying details like name, date, location, and description.
- **Browse Events**  
  Users can explore a list of available events with options for filtering and sorting.
- **Register for Events**  
  Participants can sign up for events, with the system handling availability and capacity.
- **Admin Dashboard**  
  Provides organizers with tools to manage events and participants efficiently.

## 🛠️ Technologies Used

- **Frontend**: React, CSS
- **Backend**: Django  
- **Architecture**: The project is structured into two main modules – `frontend` and `backend` – to ensure maintainability and scalability.

## 🚀 Running the Project Locally

## Windows:
Commands cmd:
```
$ pip install django
$ pip install djangorestframework
$ pip install django-cors-headers
$ pip install django-allauth
```
********************************
## Linux/MacOS:
Project files should be in created venv

Commands terminal:
```
$ python -m venv myenv
$ source myenv/bin/activate
$ pip install django
$ pip install djangorestframework
$ pip install django-cors-headers
$ pip install django-allauth
```
Eventually, if you finished project, deactivate virtual environment:
```
$ deactivate
```

## Running project

Backend
```
$ cd source/backend/Event/
$ py manage.py runserver /Alternatively/ python3 manage.py runserver
```
Frontend
```
$ cd source/backend/Frontend/
$ yarn dev
```
## 📁 Project Structure

```plaintext
EventManagementWebApp/
├── backend/       # Server-side logic, API endpoints, data models
│   ├── app.py     # Main application file
│   └── ...        # Other backend scripts and modules
├── frontend/      # Frontend interface and static files
│   ├── index.html # Main HTML file
│   ├── styles/    # CSS styles
│   ├── scripts/   # JavaScript files
│   └── ...        # Other frontend components
├── README.md      # Project documentation (you’re reading it!)
└── LICENSE        # Project license (MIT)
