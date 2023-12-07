# Use an official Python runtime as a parent image with a specific tag
FROM python:3.8.12-slim-buster as base

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files to the container
COPY app.py requirements.txt /app/

# Validate that requirements.txt exists
RUN test -f requirements.txt || { echo "ERROR: requirements.txt not found"; exit 1; }

# Validate that app.py exists
RUN test -f app.py || { echo "ERROR: app.py not found"; exit 1; }

# Ensure that app.py is not empty
RUN [ -s app.py ] || { echo "ERROR: app.py is empty"; exit 1; }

# Validate the format of requirements.txt (optional)
RUN pip check -r requirements.txt || { echo "ERROR: Invalid requirements.txt format"; exit 1; }

# Install required packages from requirements.txt in a single step
RUN pip install --no-cache-dir -r requirements.txt

# Start a new stage from the base image
FROM base as final

# Expose the port the app will run on
EXPOSE 5000

# Define environment variable with a unique name
ENV MY_APP_NAME TeacherStudentParentAdminAi

# Ensure the application starts without buffering for better logging
ENV PYTHONUNBUFFERED 1

# Install gunicorn for production use
RUN pip install gunicorn

# Create a non-root user for better security
RUN adduser --disabled-password --gecos '' myuser
USER myuser

# Specify the number of Gunicorn workers as a build argument (default to 4)
ARG WORKER_COUNT=4

# Define the default executable for the container
ENTRYPOINT ["gunicorn", "-w", "${WORKER_COUNT}", "-b", "0.0.0.0:5000", "app:app"]
