from django import forms


class CodeForm(forms.Form):
    # code = forms.CharField(label='Code here\n')
    code = forms.CharField(label='', widget=forms.Textarea(attrs={'cols': '80', 'rows': '10'}), required=False)

