from django.urls import path

from .views import IndexView, AboutView, QuizView

urlpatterns = [
    path('', IndexView.as_view()),
    path('about/', AboutView.as_view()),
    path('quiz/', QuizView.as_view()),
    path('quiz/easy', QuizView.as_view()),
    path('quiz/hard', QuizView.as_view()),
    # path('contact/', IndexView.as_view()),
]
