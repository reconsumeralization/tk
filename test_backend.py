import unittest

import routes
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import Assignment, Chat, Course, Test, User, UserCourse, db

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
        self.assertIsNotNone(user.password)
        self.assertNotEqual(user.password, 'testpassword')  # password should be hashed

    def test_get_users(self):
    def test_register(self):
    def test_get_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        response = self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpassword',
            'role': 'student'
        })
        self.assertEqual(response.status_code, 201)
        user = User.query.filter_by(username='testuser').first()
        self.assertIsNotNone(user)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.role, 'student')

    def test_login(self):
    def test_register_existing_user(self):
        response = self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpassword',
            'role': 'student'
        })
        self.assertEqual(response.status_code, 400)  # should fail because user already exists
        response = self.app.post('/login', json={
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsNotNone(data['access_token'])

    def test_profile(self):
    def test_login_nonexistent_user(self):
        response = self.app.post('/login', json={
            'username': 'nonexistentuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 400)  # should fail because user does not exist
        response = self.app.get('/profile', headers={
            'Authorization': 'Bearer ' + self.access_token
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['username'], 'testuser')
        self.assertEqual(data['role'], 'student')
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)

    def test_create_course(self):
    def test_profile_without_token(self):
        response = self.app.get('/profile')
        self.assertEqual(response.status_code, 401)  # should fail because no token provided
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
    def test_change_password(self):
    def test_create_course_without_teacher(self):
        response = self.app.post('/courses', json={
            'name': 'testcourse'
        })
        self.assertEqual(response.status_code, 400)  # should fail because no teacher_id provided
        response = self.app.post('/change_password', json={
            'old_password': 'testpassword',
            'new_password': 'newpassword'
        }, headers={
            'Authorization': 'Bearer ' + self.access_token
        })
        self.assertEqual(response.status_code, 200)
        user = User.query.filter_by(username='testuser').first()
        self.assertIsNotNone(user)
        self.assertNotEqual(user.password, 'testpassword')

    def test_encrypt_data(self):
    def test_change_password_with_wrong_old_password(self):
        response = self.app.post('/change_password', json={
            'old_password': 'wrongpassword',
            'new_password': 'newpassword'
        }, headers={
            'Authorization': 'Bearer ' + self.access_token
        })
        self.assertEqual(response.status_code, 400)  # should fail because old password is incorrect
        response = self.app.post('/encrypt_data', json={
            'data': 'testdata'
        }, headers={
            'Authorization': 'Bearer ' + self.access_token
        })
        self.assertEqual(response.status_code, 200)

    def test_decrypt_data(self):
        response = self.app.post('/decrypt_data', json={
            'data': 'testdata'
        }, headers={
            'Authorization': 'Bearer ' + self.access_token
        })
        self.assertEqual(response.status_code, 200)
        response = self.app.get('/courses')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)

    def test_create_assignment(self):
    def test_encrypt_data_without_token(self):
        response = self.app.post('/encrypt_data', json={
            'data': 'testdata'
        })
        self.assertEqual(response.status_code, 401)  # should fail because no token provided
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
    def test_create_assignment_without_course(self):
        response = self.app.post('/assignments', json={
            'name': 'testassignment'
        })
        self.assertEqual(response.status_code, 400)  # should fail because no course_id provided

if __name__ == "__main__":
    unittest.main()
    def test_user_model(self):
        user = User(username='testuser', password='testpassword', role='student')
        self.db.session.add(user)
        self.db.session.commit()
        user = User.query.filter_by(username='testuser').first()
        self.assertIsNotNone(user)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.role, 'student')

    def test_course_model(self):
        course = Course(name='testcourse', teacher_id=1)
        self.db.session.add(course)
        self.db.session.commit()
        course = Course.query.filter_by(name='testcourse').first()
        self.assertIsNotNone(course)
        self.assertEqual(course.name, 'testcourse')
        self.assertEqual(course.teacher_id, 1)
    def test_user_model_without_password(self):
        user = User(username='testuser', role='student')
        self.db.session.add(user)
        with self.assertRaises(Exception):  # should fail because no password provided
            self.db.session.commit()
    def test_course_model_without_teacher(self):
        course = Course(name='testcourse')
        self.db.session.add(course)
        with self.assertRaises(Exception):  # should fail because no teacher_id provided
            self.db.session.commit()