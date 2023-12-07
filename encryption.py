from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
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

    hashed_password = generate_password_hash(data['new_password'])
    user.password = hashed_password
    db.session.commit()

    return jsonify({'message': 'Password changed successfully'}), 200

@encryption.route('/encrypt_data', methods=['POST'])
@jwt_required()
def encrypt_data():
    data = request.get_json()

    enc_key = "QKZEjJQaRvOSH3BdAH-QY4nvoo-WEZ8VUNMZvd5uh0I=".encode('utf-8')
    fernet = Fernet(enc_key)
    encrypted_data = {key: fernet.encrypt(value.encode('utf-8')).decode('utf-8') for key, value in data.items()}

    return jsonify(encrypted_data), 200

@encryption.route('/decrypt_data', methods=['POST'])
@jwt_required()
def decrypt_data():
    data = request.get_json()

    enc_key = "QKZEjJQaRvOSH3BdAH-QY4nvoo-WEZ8VUNMZvd5uh0I=".encode('utf-8')
    fernet = Fernet(enc_key)
    decrypted_data = {key: fernet.decrypt(value.encode('utf-8')).decode('utf-8') for key, value in data.items() if value}

    return jsonify(decrypted_data), 200
