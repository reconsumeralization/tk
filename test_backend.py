import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db, User, Course, UserCourse, Assignment, Test, Chat
import routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(routes.bp)

class TestBackend(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.db = db

    def test_create_user(self):
        response = self.app.post('/users', json={
            'username': 'testuser',
            'password': 'testpassword',
            'role': 'student'
        })
        self.assertEqual(response.status_code, 201)
        user = User.query.filter_by(username='testuser').first()
        self.assertIsNotNone(user)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.role, 'student')

    def test_get_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)

    def test_create_course(self):
        response = self.app.post('/courses', json={
            'name': 'testcourse',
            'teacher_id': 1
        })
        self.assertEqual(response.status_code, 201)
        course = Course.query.filter_by(name='testcourse').first()
        self.assertIsNotNone(course)
        self.assertEqual(course.name, 'testcourse')
        self.assertEqual(course.teacher_id, 1)

    def test_get_courses(self):
        response = self.app.get('/courses')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)

    def test_create_assignment(self):
        response = self.app.post('/assignments', json={
            'name': 'testassignment',
            'course_id': 1
        })
        self.assertEqual(response.status_code, 201)
        assignment = Assignment.query.filter_by(name='testassignment').first()
        self.assertIsNotNone(assignment)
        self.assertEqual(assignment.name, 'testassignment')
        self.assertEqual(assignment.course_id, 1)

    def test_get_assignments(self):
        response = self.app.get('/assignments')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)

if __name__ == "__main__":
    unittest.main()