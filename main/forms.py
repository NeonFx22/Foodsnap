from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class ImageUploadForm(forms.Form):
    image = forms.ImageField(
        required=True,
        label="Photo of your dish",
        widget=forms.ClearableFileInput(attrs={"accept": "image/*", "capture": "environment"}),
    )


class LoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)


class RegisterForm(UserCreationForm):
    # Collected for future use (password reset, notifications) but not required
    # since no email verification flow is implemented yet.
    email = forms.EmailField(required=False, help_text="Optional. Used for password recovery.")

    class Meta:
        model = User
        fields = ("username", "email")
