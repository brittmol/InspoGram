from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class CreateCommentForm(FlaskForm):
    comment = TextAreaField('Comment', validators=[DataRequired()])
