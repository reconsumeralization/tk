from typing import List
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    """A class that represents a user of the application.

    Attributes:
        id (int): Primary key of the user table.
        username (str): Unique username of the user.
        password (str): Hashed password of the user.
        role (str): Role of the user, such as 'student' or 'teacher'.
        courses (List[Course]): Courses the user is enrolled in.
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), index=True, unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    courses = relationship("Course", secondary="user_course", backref="users", cascade="all, delete-orphan")


class Course(db.Model):
    """A class that represents a course of the application.

    Attributes:
        id (int): Primary key of the course table.
        name (str): Name of the course.
        teacher_id (int): Foreign key referencing the teacher of the course.
        users (List[User]): Users enrolled in the course.
        assignments (List[Assignment]): Assignments of the course.
        tests (List[Test]): Tests of the course.
    """

    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    users = relationship("User", secondary="user_course", backref="courses", cascade="all, delete-orphan")
    assignments = relationship("Assignment", backref="course")
    tests = relationship("Test", backref="course")


class UserCourse(db.Model):
    """A class that represents the association table between users and courses.

    Attributes:
        id (int): Primary key of the user_course table.
        user_id (int): Foreign key referencing the user of the association.
        course_id (int): Foreign key referencing the course of the association.
    """

    __tablename__ = "user_course"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))


class Assignment(db.Model):
    """A class that represents an assignment of the application.

    Attributes:
        id (int): Primary key of the assignment table.
        name (str): Name of the assignment.
        course_id (int): Foreign key referencing the course of the assignment.
        auto_grade (bool): Indicates whether the assignment is auto-graded or not.
    """

    __tablename__ = "assignments"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    auto_grade = db.Column(db.Boolean, default=False)


class Test(db.Model):
    """A class that represents a test of the application.

    Attributes:
        id (int): Primary key of the test table.
        name (str): Name of the test.
        course_id (int): Foreign key referencing the course of the test.
        date (datetime): Date of the test.
    """

    __tablename__ = "tests"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    date = db.Column(db.DateTime, nullable=False)


class Chat(db.Model):
    """A class that represents a chat message of the application.

    Attributes:
        id (int): Primary key of the chat table.
        sender_id (int): Foreign key referencing the sender of the message.
        receiver_id (int): Foreign key referencing the receiver of the message.
        message (str): Content of the message.
        timestamp (datetime): Timestamp of the message.
    """

    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())