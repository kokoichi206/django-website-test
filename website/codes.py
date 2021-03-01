from django import forms


class CodeForm(forms.Form):
    # name = forms.CharField(label='May I have your name?')
    # code = forms.CharField(label='Code here\n')
    code = forms.CharField(label='Code here\n', widget=forms.Textarea(attrs={'cols': '80', 'rows': '10'}))

