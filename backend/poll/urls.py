from django.urls import path
from .views import create_poll, get_poll, vote_poll

urlpatterns = [
    path('create/', create_poll, name="create-poll"),
    path('get/<str:poll_name>/', get_poll, name="get-poll"),
    path('vote/', vote_poll, name="vote-poll"),
]
