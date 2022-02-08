from flask import Blueprint, request#, jsonify
from flask_login import login_required, current_user
from app.forms.comment_form import CreateCommentForm
from app.forms.post_form import CreatePostForm, EditPostForm
from app.models import Comment, db, Like, Post, Photo
from app.api.auth_routes import validation_errors_to_error_messages

posts_router = Blueprint('posts', __name__)

# Grabs all the post
@posts_router.route('/')
#@login_required
def get_all_posts():
    #posts = Post.query.all() # querys to our data base to prepare all the json data
    posts = Post.query.all() #querys joins table
    photos = Photo.query.all()
    comments = Comment.query.all()

    newObj = {} # creates a new object
    for post in posts:
        newObj[str(post.to_dict()['id'])] = {'Post':{**post.to_dict(), 'Photo': [], 'Comment': []}}

    for photo in photos:
        newObj[str(photo.to_dict()['post_id'])]["Post"]["Photo"].append(photo.to_dict())

    for comment in comments:
        newObj[str(comment.to_dict()['post_id'])]["Post"]["Comment"].append(comment.to_dict())

    return newObj
    #return {'posts': [post.to_dict() for post in posts]}

# Grabs a single post by id
@posts_router.route('/<int:id>')
@login_required
def get_single_post(id):
    post = Post.query.get(id)
    return post.to_dict()

# Create a new post along with adding photo
@posts_router.route('/create_post', methods=['POST'])
@login_required
def create_post():
    form = CreatePostForm()
    # req = request.json # grabs the information from our form/data
    # new_post = Post(caption=req['caption'], user_id=current_user.id) # create a new post to upload
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(caption=form.data['caption'], user_id=current_user.id)
    # will allow user to add multiple photo at once
        # for url in req['photo']:
        db.session.add(new_post)
        db.session.commit()
        # for url in form.data['photo']:
        new_photos = Photo(photo=form.data['photo'], post_id=new_post.id)
        db.session.add(new_photos)
        db.session.commit()

        return new_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# create comment on a post
@posts_router.route('/<int:id>/comment/create', methods=['POST'])
@login_required
def comment_on_post(id):
    form = CreateCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(comment=form.data['comment'], user_id=current_user.id, post_id=id)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit caption on a post
@posts_router.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_post(id):
    form = EditPostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # new_post = Post(caption=form.data['caption'], user_id=current_user.id)
        update_post = Post.query.get(id) # grabs the post that needs editing
        update_post.caption = form.data['caption'] # replace old caption with new
        db.session.add(update_post)
        db.session.commit() # commit changes to data base
        return update_post.to_dict() # return edited post in dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# delete a specific post
@posts_router.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
    orig_post = Post.query.get(id) # grabs the post you want to delete

    db.session.delete(orig_post) # deletes the post from data base
    db.session.commit() # commits the changes in database
    return {"message": "Deleted"}

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

# Gets all likes a specific post or add a like to a post
@posts_router.route('/<int:id>/likes', methods=['GET', 'POST'])
@login_required
def get_edit_likes_by_post(id):
    if (request.method == 'POST'):
        # checks the database if the user has liked this post before
        liked = Like.query.filter_by(user_id=current_user.id, post_id=id).first()

        # if the user has not liked this post before
        # create a liked model and add it into database
        if not liked:
            like = Like(is_liked=True, user_id=current_user.id, post_id=id)
            db.session.add(like)
            db.session.commit()

        # else delete the liked from the database because it means
        # user is trying to unlike a post
        else:
            db.session.delete(liked)
            db.session.commit()

    likes_by_id = Like.query.filter(Like.post_id == id).all()
    return {'likes': [like.to_dict() for like in likes_by_id]}
