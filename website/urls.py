from django.urls import path

from .views import IndexView, AboutView, QuizView
from .views import QuizEasyView, QuizHardView
from .views import AccessFirstView, LoginFirstView

urlpatterns = [
    path('', IndexView.as_view()),
    path('about/', AboutView.as_view()),
    path('quiz/', QuizView.as_view()),
    path('quiz/easy', QuizEasyView.as_view()),
    path('quiz/hard', QuizHardView.as_view()),
    path('login', LoginFirstView.as_view()),
    path('info', AccessFirstView.as_view()),
    # path('contact/', IndexView.as_view()),
]
