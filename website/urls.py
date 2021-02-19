from django.urls import path

from .views import IndexView, AboutView, QuizView
from .views import QuizEasyView, QuizHardView
from .views import AccessView, LoginView

urlpatterns = [
    path('', IndexView.as_view()),
    path('about/', AboutView.as_view()),
    path('quiz/', QuizView.as_view()),
    path('quiz/easy', QuizEasyView.as_view()),
    path('login', LoginView.as_view()),
    path('info', AccessView.as_view()),
    # path('contact/', IndexView.as_view()),
]
