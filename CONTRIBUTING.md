2. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Start the backend server:
   ```
   python app.py
   ```
5. Launch the frontend:
   ```
   npm start
   ```

## Running Tests
To ensure the quality of the application, run the following tests:

1. Backend tests:
   ```
   cd backend
   pytest
   ```
2. Frontend tests:
   ```
   cd frontend
   npm test
   ```
3. End-to-end tests:
   ```
   npm run e2e
   ```

## Submitting Pull Requests
To submit a pull request, follow these steps:

1. Create a new branch:
   ```
   git checkout -b feature-branch-name
   ```
2. Make your changes and commit them with clear, descriptive messages:
   ```
   git commit -m "feat: Add new feature"
   ```
3. Push your branch to the repository:
   ```
   git push origin feature-branch-name
   ```
4. Create a pull request for review.

## Coding Standards
- Use meaningful variable and function names.
- Follow PEP 8 style guide for Python code.
- Use camelCase for JavaScript variables and functions.
- Write comments to explain complex logic.
- Keep functions small and focused on a single task.

## Commit Message Guidelines
Write commit messages that are clear and concise. Use the following format:
```
<type>: <subject>
<BLANK LINE>
<body>
