from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class CreatePostForm(FlaskForm):
    caption = StringField('Caption')
    photos = StringField('URL', validators=[DataRequired(),
        Length(min=10, message='Must be a valid URL')])
    
