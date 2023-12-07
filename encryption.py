from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

from models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity

encryption = Blueprint('encryption', __name__)

@encryption.route('/change_password', methods=['POST'])
@jwt_required()
def change_password():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user or not check_password_hash(user.password, data['old_password']):
        return jsonify({'message': 'Old password is incorrect'}), 401

    hashed_password = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    return jsonify({'message': 'Password changed successfully'}), 200

@encryption.route('/encrypt_data', methods=['POST'])
@jwt_required()
def encrypt_data():
    data = request.get_json()
    
    if 'data' not in data or not isinstance(data['data'], str):
        return jsonify({'message': 'No data provided or invalid data format'}), 400

    try:
        encoded_data = data['data'].encode()
        encrypted_data = fernet.encrypt(encoded_data).decode()
    except Exception as e:
        return jsonify({'message': 'Encryption failed', 'error': str(e)}), 500

    return jsonify(encrypted_data), 200

@encryption.route('/decrypt_data', methods=['POST'])
@jwt_required()
def decrypt_data():
    data = request.get_json()
    
    if 'data' not in data or not isinstance(data['data'], str):
        return jsonify({'message': 'No data provided or invalid data format'}), 400

    try:
        encoded_data = data['data'].encode()
        decrypted_data = fernet.decrypt(encoded_data).decode()
    except Exception as e:
        return jsonify({'message': 'Decryption failed', 'error': str(e)}), 500

    return jsonify(decrypted_data), 200
