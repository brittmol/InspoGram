from flask import Blueprint, request#, jsonify
from flask_login import login_required, current_user
from app.forms.comment_form import CreateCommentForm
from app.forms.post_form import CreatePostForm, EditPostForm
from app.models import Comment, db, Like, Post, Photo, User
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
    print(form.data['caption'], 'pre if ********************')
    if "image" not in request.files:
        return {"errors": ["Please upload photo"]}, 400
    image = request.files["image"]
    if not allowed_file(image.filename):
        return {"errors": ["File type not permitted"]}, 400
    if form.validate_on_submit():
        print(form.data['caption'], 'post if ********************')

        new_post = Post(caption=form.data['caption'], user_id=current_user.id)
    # will allow user to add multiple photo at once
        # for url in req['photo']:
        db.session.add(new_post)
        db.session.commit()
        # for url in form.data['photo']:
        # new_photos = Photo(photo=form.data['photo'], post_id=new_post.id)
        # db.session.add(new_photos)
        # db.session.commit()
        # if "image" not in request.files:
        #     return {"errors": ["image required"]}, 400

        # image = request.files["image"]
        # if not allowed_file(image.filename):
        #     return {"errors": ["file type not permitted"]}, 400

        image.filename = get_unique_filename(image.filename)

        print(image.filename, 'image****************')
        upload = upload_file_to_s3(image)
        print(upload, 'upload****************')

        if "url" not in upload:
            # if the dictionary doesn't have a filename key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        # we can use the
        new_image = Photo(post_id=new_post.id, photo=url)#post id instead of user
        db.session.add(new_image)
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
@posts_router.route('/<int:id>/likes', methods=['POST'])
@login_required
def get_edit_likes_by_post(id):
    like = Like(is_liked=True,post_id=id,user_id=current_user.id)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@posts_router.route('/<int:id>/feed')
#@login_required
def get_all_posts_by_following(id):
    user = User.query.get(id)
    following = [u.id for u in user.following]
    feed = Post.query.filter(Post.user_id.in_(following)).all()

    return {"posts": [post.to_dict() for post in feed]}

@posts_router.route('/<int:id>/likes/delete', methods=['DELETE'])
#@login_required
def delete_likes(id):
    like = Like.query.filter(Like.user_id==current_user.id, Like.post_id==id).first()
    db.session.delete(like)
    db.session.commit()
    return {**like.to_dict()}
