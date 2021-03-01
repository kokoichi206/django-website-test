from django import forms


class CodeForm(forms.Form):
    # code = forms.CharField(label='Code here\n')
    attrs = {'placeholder':'a = 5<br>b = 4<br>print(a+b)','cols': '80', 'rows': '10', 'class': 'prettyprint linenums'}
    code = forms.CharField(label='', widget=forms.Textarea(attrs=attrs), required=False)

    # def __init__(self):
    #     super().__init__(*args, **kwargs)
    #     self.fields['code'].widget.attrs["class"] = "prettyprint linenums"

