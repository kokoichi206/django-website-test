from django.urls import path

from .views import IndexView, AboutView, QuizView
from .views import QuizEasyView, QuizHardView, QuizProfileView
from .views import AccessFirstView, LoginFirstView
from .views import TimerView, WeightView, MemoView
from .views import GreetView, PythonView, TypingView
from .views import SudokuView, ReversiView, MemoryView
from .views import TetrisView, MarioView, ShootingView
from .views import RouletteView, RPG_View
from .views import IndexOldView, IndexOldAboutView
from .views import IndexFAQView, IndexLinkView, IndexStudyView, IndexGameView

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
    path('greet/execute', PythonView.as_view(), name='greety'),
    path('memo/', MemoView.as_view()),
    path('table/sudoku', SudokuView.as_view()),
    path('table/reversi', ReversiView.as_view()),
    path('table/memory', MemoryView.as_view()),
    path('tetris/tetris', TetrisView.as_view()),
    path('mario/mario', MarioView.as_view()),
    path('shooting/shooting', ShootingView.as_view()),
    path('greet/typing', TypingView.as_view()),
    path('greet/roulette', RouletteView.as_view()),
    path('rpg/main', RPG_View.as_view()),
    path('old/old', IndexOldView.as_view()),
    path('old/about_old', IndexOldAboutView.as_view()),
    path('main/FAQ', IndexFAQView.as_view()),
    path('main/link', IndexLinkView.as_view()),
    path('main/study', IndexStudyView.as_view()),
    path('main/game', IndexGameView.as_view()),
]

