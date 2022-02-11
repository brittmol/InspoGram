from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
from wtforms.fields import FileField


class CreatePostForm(FlaskForm):
    image = FileField('Photo', validators=[DataRequired(message='Please upload photo')])
    caption = StringField('Caption',validators=[Length(max=150, message="Caption must be less than 150 characters long")])
    # photo = StringField('URL', validators=[DataRequired(),
    #     Length(min=10, message='Must be a valid URL')])

class EditPostForm(FlaskForm):
    caption = StringField('Caption',validators=[Length(max=500, message="Caption must be less than 500 characters long")])
