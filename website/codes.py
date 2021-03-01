from django import forms


class CodeForm(forms.Form):
    # name = forms.CharField(label='May I have your name?')
    code = forms.CharField(label='?')

