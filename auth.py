from flask import Blueprint, jsonify, request
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from models import User, db
from werkzeug.security import check_password_hash, generate_password_hash

auth = Blueprint('auth', __name__)

import re

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from validate_email import validate_email

limiter = Limiter(key_func=get_remote_address)

@auth.route('/register', methods=['POST'])
@limiter.limit("5/minute")  # limit the number of registration attempts per minute
def register():
    data = request.get_json()

    # validate username
    if not data['username'] or len(data['username']) < 3:
        return jsonify({'message': 'Invalid username'}), 400

    # validate email
    if not validate_email(data['username']):
        return jsonify({'message': 'Invalid email'}), 400

    # validate password complexity
    if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$', data['password']):
        return jsonify({'message': 'Password must be at least 8 characters, include at least one letter and one number'}), 400

    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password, role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registered successfully'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login Unsuccessful'}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify(access_token=access_token), 200

@auth.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    return jsonify(username=user.username, role=user.role), 200
    return jsonify(username=user.username, role=user.role), 200