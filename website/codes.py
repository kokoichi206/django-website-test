from django import forms


class CodeForm(forms.Form):
    # code = forms.CharField(label='Code here\n')
    code = forms.CharField(widget=forms.Textarea(attrs={'cols': '80', 'rows': '10'}))

