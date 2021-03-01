from django import forms


class GreetForm(forms.Form):
    # name = forms.CharField(label='May I have your name?')
    name = forms.CharField(label='What do you wanna research? k ')

