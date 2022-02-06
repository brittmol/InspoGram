from flask import Blueprint#, jsonify
from flask_login import login_required#, current_user
from app.models import Photo

photos_router = Blueprint('photos', __name__)

@photos_router.route('/')
#@login_required
def get_all_photos():
    photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in photos]}
