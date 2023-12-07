# TeacherStudentParentAdminAi System

## Overview

The TeacherStudentParentAdminAi system is a comprehensive web application designed to facilitate seamless communication and interaction between teachers, students, parents, administrators, and an integrated AI module. The system aims to enhance educational processes through features like auto-grading, chat, quizzes, tests, and personalized learning.

## Features

The system includes user roles for teachers, students, parents, administrators, and an AI module. It supports real-time chat, auto-grading of assignments, quizzes and tests, and AI integration for lesson planning, personalized learning, and assessment feedback.

## System Architecture

The backend is built with Python/Flask for server-side logic, SQLAlchemy for database management, and a RESTful API for frontend communication. The frontend uses React/TypeScript for a dynamic and responsive user interface, Redux for state management, and Axios for handling API requests. The AI module uses Hugging Face Transformers for natural language processing and is integrated with the backend services.


## Deployment

To package the application for deployment, Docker is used to create containers for both the frontend and backend components. Kubernetes is then used for orchestration, handling the deployment, scaling, and management of these containers. The following commands can be used:

1. Build the Docker images:
   - Backend: `docker build -t backend-image .` (run in the backend directory)
   - Frontend: `docker build -t frontend-image .` (run in the frontend directory)
2. Push the images to a registry (optional):
   - `docker push backend-image`
   - `docker push frontend-image`
3. Deploy the application using Kubernetes:
   - Apply the configuration files: `kubectl apply -f deployment.yml`
   - Monitor the deployment: `kubectl rollout status deployment/backend` and `kubectl rollout status deployment/frontend`



## Testing

Comprehensive tests are conducted to ensure the quality of the software. Unit tests cover individual functions and components, while integration tests assess the interactions between different parts of the system. To execute the tests, follow the commands below:

1. Backend tests:
   - Navigate to the backend directory and run `pytest`.
2. Frontend tests:
   - Navigate to the frontend directory and run `npm test`.
3. End-to-end tests:
   - Execute `npm run e2e` in the repository root.

The backend and frontend components are thoroughly tested with unit and integration tests.

## Documentation


This README offers a brief introduction to the application, with instructions for setup and usage. For comprehensive documentation, refer to [Documentation.md](/Documentation.md). Our future development roadmap is detailed in [ROADMAP.md](/ROADMAP.md).


## Security


Security is a paramount concern, and as such, the system employs JSON Web Tokens (JWT) to manage user authentication securely. All data is transmitted over HTTPS to ensure confidentiality and integrity of the data in transit.


## Future Enhancements


In upcoming iterations, we aim to incorporate state-of-the-art AI capabilities to enable predictive analytics, enhancing the decision-making process and driving student success. Additionally, mobile applications for both Android and iOS platforms are under development to extend accessibility and reach.


## Constraints


Adherence to the project delivery timeline is critical, and we are cognizant of the hardware and infrastructure constraints that may impact development. Our approach is designed to be pragmatic, ensuring milestones are met without compromising on the quality or performance of the application.



## Setup

To set up the application locally for development or testing purposes, follow these steps:

1. Clone the repository using `git clone repository_url`.
2. Install the backend dependencies with `cd backend` and `pip install -r requirements.txt`.
3. Install the frontend dependencies with `cd frontend` and `npm install`.
4. Start the backend server with `python app.py` from the backend directory.
5. Launch the frontend by running `npm start` from the frontend directory.



## Usage

Follow these steps to interact with the application:

1. Create a new user account by sending a POST request to `/api/users` with the required user details.
2. Log in by sending a POST request to `/api/login` to receive a JWT token.
3. Use the obtained JWT token to authenticate and access protected routes.
4. Interact with the AI module for educational support by using the available API endpoints at `/api/ai`.



## Code Snippets

The following are updated code excerpts from the project repository, showcasing the structure and functionality of key components:

### app.py

```python
# Updated app.py content goes here...
```

### routes.py

```python
# Updated routes.py content goes here...
```

### ai_module.py

```python
# Updated ai_module.py content goes here...
```


Here are some code snippets from the project:

### routes.py

```python
from flask import Blueprint, request, jsonify
from models import db, User, Course, UserCourse, Assignment, Test, Chat
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('routes', __name__)

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], password=data['password'], role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created'}), 201

@bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.serialize for user in users]), 200

@bp.route('/courses', methods=['POST'])
@jwt_required()
def create_course():
    data = request.get_json()
    new_course = Course(name=data['name'], teacher_id=data['teacher_id'])
    db.session.add(new_course)
    db.session.commit()
```
<<<EDITED_SELECTION_WILL_BE_INSERTED_HERE>>>
