from flask import Blueprint#, jsonify
from flask_login import login_required#, current_user
from app.models import Post, Photo, Comment, Like

posts_router = Blueprint('posts', __name__)

@posts_router.route('/')
#@login_required
def get_all_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@posts_router.route('/<int:id>')
#@login_required
def get_single_post(id):
    post = Post.query.get(id)
    return post.to_dict()

@posts_router.route('/create_post', methods=['post'])
#@login_required
def create_post():
    return

# Gets all photos a specific post
@posts_router.route('/<int:id>/photos')
#@login_required
def get_photos_by_post(id):
    photos_by_id = Photo.query.filter(Photo.post_id == id).all()
    return {'photos': [photo.to_dict() for photo in photos_by_id]}

# Gets all comments a specific post
@posts_router.route('/<int:id>/comments')
#@login_required
def get_comments_by_post(id):
    comments_by_id = Comment.query.filter(Comment.post_id == id).all()
    return {'comments': [comment.to_dict() for comment in comments_by_id]}

# Gets all likes a specific post
@posts_router.route('/<int:id>/likes')
#@login_required
def get_likes_by_post(id):
    likes_by_id = Like.query.filter(Like.post_id == id).all()
    return {'likes': [like.to_dict() for like in likes_by_id]}
