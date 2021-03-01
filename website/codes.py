from django import forms


class CodeForm(forms.Form):
    # code = forms.CharField(label='Code here\n')
    attrs = {'placeholder':"a = 5\nb = 4\nprint(f'a + b = {a+b}')",'cols': '80', 'rows': '10', 'class': 'prettyprint linenums'}
    code = forms.CharField(label='', widget=forms.Textarea(attrs=attrs), required=False)

    # def __init__(self):
    #     super().__init__(*args, **kwargs)
    #     self.fields['code'].widget.attrs["class"] = "prettyprint linenums"

