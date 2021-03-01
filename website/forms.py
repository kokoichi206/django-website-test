from django import forms


class GreetForm(forms.Form):
    # name = forms.CharField(label='May I have your name?')
    name = forms.CharField(label='What do you wanna search? ')


    # ここに書いて使えてる？
    def search(self, word):

        from bs4 import BeautifulSoup
        import requests

        URL_top = 'https://www.google.com/search?q='
        # word = '筒井あやめ'
        URL = URL_top + word

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
            ans += ''.join(con)
            # ans = ans + '-' * 100 + '\n'
            ans = ans + '<br>' + '-' * 100 + '<br>'
        
        if ans:
            return ans
        else:
            return 'Nothing'