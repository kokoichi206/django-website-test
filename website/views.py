from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.generic import FormView

from . import forms

class IndexView(TemplateView):
    template_name = "index.html"
    
    def get_context_data(self):
        ctxt = super().get_context_data()
        # ctxt["username"] = "太郎"
        return ctxt
        

class AboutView(TemplateView):
    template_name = "about.html"

    def get_context_data(self):
        ctxt = super().get_context_data()
        ctxt["num_services"] = 12345678
        ctxt["skills"] = [
            "Python",
            "C++",
            "JavaSript"
            ]
        return ctxt


class QuizView(TemplateView):
    template_name = "quiz.html"
    
    # def get_context_data(self):
    #     ctxt = super().get_context_data()
    #     # ctxt["username"] = "太郎"
    #     return ctxt

class QuizEasyView(TemplateView):
    template_name = "quiz/quiz_easy.html"
    
class QuizHardView(TemplateView):
    template_name = "quiz/quiz_hard.html"


class LoginFirstView(TemplateView):
    template_name = "login.html"

class AccessFirstView(TemplateView):
    template_name = "info.html"

class TimerView(TemplateView):
    template_name = "timer/timerMusic.html"

class QuizProfileView(TemplateView):
    template_name = "quiz/profile.html"

class WeightView(TemplateView):
    template_name = "weight/main.html"

class MemoView(TemplateView):
    template_name = "memo.html"


# FormViewを継承したViewを定義する
class GreetView(FormView):
    template_name = 'greet/index.html'  # テンプレート名(htmlファイル名)
    form_class = forms.GreetForm
    success_url = '/greet'

    def post(self, request, *args, **kwargs):
        form = self.get_form(self.form_class)
        if form.is_valid():
            if request.is_ajax():
                """Ajax 処理を別メソッドに切り離す"""
                print('### Ajax request')
                return self.ajax_response(form)
            # Ajax 以外のPOSTメソッドの処理
            return super().form_valid(form)
        # フォームデータが正しくない場合の処理
        return super().form_invalid(form)

    # def ajax_response(self, form):
    #     """jQuery に対してレスポンスを返すメソッド"""
    #     name = form.cleaned_data.get('name')
    #     # return HttpResponse(f'Hello {name}！')
    #     return HttpResponse(f'https://www.google.com/search?q={name}')



    def ajax_response(self, form):
        name = form.cleaned_data.get('name')

        from bs4 import BeautifulSoup
        import requests


        URL_top = 'https://www.google.com/search?q='
        # name = '筒井あやめ'
        URL = URL_top + name
        # URL = 'https://koko-django-website.herokuapp.com/greet/index'


        # response = req.get(URL, timeout=(3.0, 7.5))
        try:
            response = requests.get(URL, timeout=5)
            # print(response.text)
        except requests.exceptions.ConnectionError as err:
            return HttpResponse(f'error')
            # pass

        # return HttpResponse(f'OKKK')
        
        soup = BeautifulSoup(response.text, 'html.parser')
        articles = soup.find_all('div')

        # return HttpResponse(f'{URL}')
        # aho = str(soup)[:50]
        # return HttpResponse(f'{aho}')
        # return HttoResponse(f"{}")


        # return HttpResponse(f"{''.join(str(articles[0]))}")



        

        main_blocks = soup.find_all('div', class_='ZINbbc')
        # print(h2[2])
        c = 0
        contents = []
        for block in main_blocks:
            title = block.find('h3')
            if title is not None:
                content = block.find('div', class_='BNeawe s3v9rd AP7Wnd')
                if content is not None:
                    # print(title.text)
                    # print(content.text)
                    contents.append([title.text, content.text])
                    c += 1
                # print('-' * 100)
        # print(c)
        ans = ''
        # con = ''.join(contents)

        # return HttpResponse(f'Nothing')

        for con in contens:
            ans += ''.join(con)
        if ans:
            return HttpResponse(f'{ans}')
        else:
            return HttpResponse(f'Nothing')


        return HttpResponse(f'Nothing')


