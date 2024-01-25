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


## Code Improvement Script

The `sweep_issues_aggregator.py`, `security_audit_tests.py`, and `code_quality_tests.py` scripts are automated tools that analyze the codebase to identify areas for improvement, suggest enhancements, and ensure the security and quality of the code. They integrate with Sweep AI's capabilities to detect issues related to code quality, performance, security vulnerabilities, and potential refactoring.

To use the scripts:

1. Run the `sweep_issues_aggregator.py` script from the repository root with `python -m sweep_code_improver` to identify general code improvements.
2. Execute the `security_audit_tests.py` script with `python -m tests.security_audit_tests` to perform security audits and penetration testing.
3. Run the `code_quality_tests.py` script with `python -m tests.code_quality_tests` to analyze code quality using static analysis tools.
4. Review the output from each script, which includes suggestions for code improvements and identified security vulnerabilities.
5. Apply the suggested changes and address any vulnerabilities to enhance the codebase according to best practices and security standards.

The backend and frontend components are thoroughly tested with unit and integration tests.

## Community Participation and Contribution

For detailed contribution guidelines, please refer to our [CONTRIBUTING.md](/CONTRIBUTING.md) file.

To contribute to the project, follow the guidelines below:

1. Clone the repository using `git clone repository_url`.
2. Install the backend dependencies with `cd backend` and `pip install -r requirements.txt`.
3. Install the frontend dependencies with `cd frontend` and `npm install`.
4. Start the backend server with `python app.py` from the backend directory.
5. Launch the frontend by running `npm start` from the frontend directory.

Contribution Guidelines:

- Familiarize yourself with the project by reviewing the codebase and documentation.
- Create a new branch for your contribution: `git checkout -b feature-branch-name`.
- Make your changes, ensuring adherence to the project's coding style and guidelines.
- Write clear, concise commit messages for each significant change.
- Push your branch to the repository and create a pull request for review.
- Participate in discussions and code reviews to address feedback and improve your contribution.
- Respect the intellectual property rights of others.
- Uphold the project's code of conduct and facilitate a welcoming and inclusive environment.

Enhancing the Project:

- Report issues, propose new features, and provide constructive feedback.
- Contribute to testing efforts to ensure the reliability and stability of the application.
- Improve documentation, code comments, and tutorials to enhance the project's accessibility.

For comprehensive documentation, refer to [Documentation.md](/Documentation.md). Our future development roadmap is detailed in [ROADMAP.md](/ROADMAP.md).

## Documentation


This README offers a brief introduction to the application, with instructions for setup and usage. For comprehensive documentation, refer to [Documentation.md](/Documentation.md). Our future development roadmap is detailed in [ROADMAP.md](/ROADMAP.md).


## Security


Security is a paramount concern, and as such, the system employs JSON Web Tokens (JWT) to manage user authentication securely. All data is transmitted over HTTPS to ensure confidentiality and integrity of the data in transit.


## Future Enhancements


In upcoming iterations, we aim to incorporate state-of-the-art AI capabilities to enable predictive analytics, enhancing the decision-making process and driving student success. Additionally, mobile applications for both Android and iOS platforms are under development to extend accessibility and reach.

## Code Improvement Script

The `sweep_issues_aggregator.py` script is an automated tool that analyzes the codebase to identify areas for improvement and suggest enhancements. It integrates with Sweep AI's capabilities to detect issues related to code quality, performance, and potential refactoring.

To use the script:

1. Run the script from the repository root with `python -m sweep_code_improver`.
2. Review the output, which includes suggestions for code improvements.
3. Apply the suggested changes to enhance the codebase according to best practices.

## Constraints


Adherence to the project delivery timeline is critical, and we are cognizant of the hardware and infrastructure constraints that may impact development. Our approach is designed to be pragmatic, ensuring milestones are met without compromising on the quality or performance of the application.



## Setup

## How to Report Bugs or Request Features

To report a bug or request a new feature, please use the issue templates provided in the `.github/ISSUE_TEMPLATE/` directory. Bug reports should follow the [bug_report.md](/.github/ISSUE_TEMPLATE/bug_report.md) template and feature requests should follow the [feature_request.md](/.github/ISSUE_TEMPLATE/feature_request.md) template.

## Pull Requests

When submitting a pull request, please use the pull request template provided in the `.github/PULL_REQUEST_TEMPLATE.md` file. This will ensure that your contributions are consistent with our project requirements.

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
