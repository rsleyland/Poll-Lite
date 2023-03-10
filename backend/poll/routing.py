from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("ws/poll/<str:poll_name>/", consumers.PollDetailConsumer.as_asgi(), name="websocket-poll-detail"),
]