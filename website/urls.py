from django.urls import path

from .views import IndexView, AboutView, QuizView
from .views import QuizEasyView, QuizHardView, QuizProfileView
from .views import AccessFirstView, LoginFirstView
from .views import TimerView, WeightView, MemoView
from .views import GreetView

urlpatterns = [
    path('', IndexView.as_view()),
    path('about/', AboutView.as_view()),
    path('quiz/', QuizView.as_view()),
    path('quiz/easy', QuizEasyView.as_view()),
    path('quiz/hard', QuizHardView.as_view()),
    path('quiz/profile', QuizProfileView.as_view()),
    path('login', LoginFirstView.as_view()),
    path('info', AccessFirstView.as_view()),
    path('timer/timerMusic', TimerView.as_view()),
    path('weight/main', WeightView.as_view()),
    # path('contact/', IndexView.as_view()),
    path('greet/index', GreetView.as_view(), name='greet'),
    path('memo/', MemoView.as_view()),
]

