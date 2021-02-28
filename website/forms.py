from django import forms


class GreetForm(forms.Form):
    name = forms.CharField(label='May I have your name?')

