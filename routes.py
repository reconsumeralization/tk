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
    return jsonify({'message': 'Course created'}), 201

@bp.route('/courses', methods=['GET'])
@jwt_required()
def get_courses():
    courses = Course.query.all()
    return jsonify([course.serialize for course in courses]), 200

@bp.route('/assignments', methods=['POST'])
@jwt_required()
def create_assignment():
    data = request.get_json()
    new_assignment = Assignment(name=data['name'], course_id=data['course_id'], auto_grade=data['auto_grade'])
    db.session.add(new_assignment)
    db.session.commit()
    return jsonify({'message': 'Assignment created'}), 201

@bp.route('/assignments', methods=['GET'])
@jwt_required()
def get_assignments():
    assignments = Assignment.query.all()
    return jsonify([assignment.serialize for assignment in assignments]), 200

@bp.route('/tests', methods=['POST'])
@jwt_required()
def create_test():
    data = request.get_json()
    new_test = Test(name=data['name'], course_id=data['course_id'])
    db.session.add(new_test)
    db.session.commit()
    return jsonify({'message': 'Test created'}), 201

@bp.route('/tests', methods=['GET'])
@jwt_required()
def get_tests():
    tests = Test.query.all()
    return jsonify([test.serialize for test in tests]), 200

@bp.route('/chats', methods=['POST'])
@jwt_required()
def create_chat():
    data = request.get_json()
    new_chat = Chat(sender_id=data['sender_id'], receiver_id=data['receiver_id'], message=data['message'])
    db.session.add(new_chat)
    db.session.commit()
    return jsonify({'message': 'Chat created'}), 201

@bp.route('/chats', methods=['GET'])
@jwt_required()
def get_chats():
    chats = Chat.query.all()
    return jsonify([chat.serialize for chat in chats]), 200
```
