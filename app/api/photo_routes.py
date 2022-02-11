from flask import Blueprint, request#, jsonify
from flask_login import login_required, current_user#, current_user
from app.models import db, Photo, User
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

photos_router = Blueprint('photos', __name__)

@photos_router.route('/')
#@login_required
def get_all_photos():
    photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in photos]}


# from flask import Blueprint, request
# from app.models import db, Image
# from flask_login import current_user, login_required
# from app.s3_helpers import (
#     upload_file_to_s3, allowed_file, get_unique_filename)

# image_routes = Blueprint("photos", __name__)


@photos_router.route("/upload-profile-photo", methods=["PUT"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # we can use the
    # new_image = Photo(post_id=current_user, photo=url)#post id instead of user
    user = User.query.get(current_user.id)
    user.profile_image_url = url
    db.session.add(user)
    db.session.commit()
    return {"url": url}


# @image_routes.route("")
# def get_all_images():
#     images = Image.query.order_by(Image.id.desc()).all()
#     return {"images": [image.to_dict() for image in images]}
