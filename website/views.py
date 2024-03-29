from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.generic import FormView

from . import forms
from . import codes

class IndexView(TemplateView):
    template_name = "index.html"
    
    def get_context_data(self):
        ctxt = super().get_context_data()
        # ctxt["username"] = "太郎"
        return ctxt

class IndexFAQView(TemplateView):
    template_name = "main/FAQ.html"

class IndexLinkView(TemplateView):
    template_name = "main/link.html"

class IndexStudyView(TemplateView):
    template_name = "main/study.html"
    
class IndexGameView(TemplateView):
    template_name = "main/game.html"

class IndexOldView(TemplateView):
    template_name = "old/old.html" 
 
class IndexOldAboutView(TemplateView):
    template_name = "old/aboutOld.html" 


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

class SudokuView(TemplateView):
    template_name = "table/sudoku.html"

class ReversiView(TemplateView):
    template_name = "sudoku/reversi.html"

class TetrisView(TemplateView):
    template_name = "tetris/tetris.html"

class MarioView(TemplateView):
    template_name = "mario/mario.html"
    
class ShootingView(TemplateView):
    template_name = "shooting/shooting.html"

class MemoryView(TemplateView):
    template_name = "table/memory.html"

class TypingView(TemplateView):
    template_name = "greet/typing.html"

class RouletteView(TemplateView):
    template_name = "greet/roulette.html"

class RPG_View(TemplateView):
    template_name = "rpg/main.html"


# FOR web_practice
class HotSpotView(TemplateView):
    template_name = "web_practice/hotspot/index.html"
class ClockView(TemplateView):
    template_name = "web_practice/clock/index.html"
class JokeView(TemplateView):
    template_name = "web_practice/joke/index.html"


# FormViewを継承したViewを定義するa
class PythonView(FormView):
    template_name = 'greet/execute.html'  # テンプレート名(htmlファイル名)
    form_class = codes.CodeForm
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
    
    def ajax_response(self, form):
        str_program = form.cleaned_data.get('code')
        # if '\n' in code:
        #     return HttpResponse(f'there is new line')

        import re
        prog = re.search('print\((.*)\)', str_program)
        printValue = prog.group(1)
        hoge = 0
        exec_local = {'hoge': hoge}
        str_new = str_program.replace(f'print({printValue})', f'hoge={printValue}')
        print(str_new)
        exec(str_new, {}, exec_local)
        hoge = exec_local['hoge']
        print(hoge)

        # print('a+b=', a+b) などに対応したい
        if len(hoge) > 1:
            tmp = ''
            for a in hoge:
                tmp += str(a)
                hoge = tmp

        return HttpResponse(f'{hoge}')



# # FormViewを継承したViewを定義するa
# class PythonView(FormView):
#     template_name = 'greet/execute.html'  # テンプレート名(htmlファイル名)
#     form_class = codes.CodeForm
#     success_url = '/greet'

#     def post(self, request, *args, **kwargs):
#         form = self.get_form(self.form_class)
#         if form.is_valid():
#             if request.is_ajax():
#                 """Ajax 処理を別メソッドに切り離す"""
#                 print('### Ajax request')
#                 return self.ajax_response(form)
#             # Ajax 以外のPOSTメソッドの処理
#             return super().form_valid(form)
#         # フォームデータが正しくない場合の処理
#         return super().form_invalid(form)
    
#     def ajax_response(self, form):
#         code = form.cleaned_data.get('code')
#         return HttpResponse(f'{code}')







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
        # ans = form_class.search(name)
        # return HttpResponse(f'{ans}')


        from bs4 import BeautifulSoup
        import requests

        URL_top = 'https://www.google.com/search?q='
        # word = '筒井あやめ'
        URL = URL_top + name

        try:
            response = requests.get(URL, timeout=5)
        except requests.exceptions.ConnectionError as err:
            return HttpResponse(f'error: cannot open the URL')
        
        soup = BeautifulSoup(response.text, 'html.parser')
        articles = soup.find_all('div')


        main_blocks = soup.find_all('div', class_='ZINbbc')
        contents = []
        for block in main_blocks:
            title = block.find('h3')
            if title is not None:
                content = block.find('div', class_='BNeawe s3v9rd AP7Wnd')
                if content is not None:
                    contents.append([title.text, content.text])

        ans = ''
        for con in contents:
            ans += '<br>'.join(con)
            # ans = ans + '-' * 100 + '\n'
            ans = ans + '<br>' + '-' * 100 + '<br>'

        if ans:
            return HttpResponse(f'{ans}')
        else:
            return HttpResponse(f'Nothing')
