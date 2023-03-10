from .models import Poll, PollChoice
from .serializers import PollWithChoicesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import random
import string
from django.db import IntegrityError


@api_view(['POST'])
def create_poll(request):
    try:
        data = request.data
        poll = handlePollNameCreation(data["question"])
        choices = data["choices"]
        for cho in choices:
            print(cho)
            PollChoice.objects.create(
                poll = poll,
                choice = cho["choice"],
                choice_id = cho["choice_id"]
            )
        return Response({"message": "Success", "poll": PollWithChoicesSerializer(poll).data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"message": "Failure", "error": e}, status=status.HTTP_400_BAD_REQUEST)


def handlePollNameCreation(question):
    while True:
        try:
            name = "SP"+''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(16))
            poll = Poll.objects.create(
                name = name,
                question = question
            )
            return poll
        except IntegrityError:
            continue
        except Exception:
            return Exception




@api_view(['GET'])
def get_poll(request, poll_name):
    try:
        poll = Poll.objects.get(name=poll_name)
        serializer = PollWithChoicesSerializer(poll)
        return Response({"message": "Success", "poll": serializer.data}, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Failure"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def vote_poll(request):
    try:
        data = request.data
        new_choices = data["choices"]
        poll_name = data["poll_name"]
        poll = Poll.objects.get(name=poll_name)
        choices = poll.choices.all()
        for cho in choices:
            if cho.choice_id in new_choices:
                cho.inc_vote()
        return Response({"message": "Success"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"message": "Failure", "error": e}, status=status.HTTP_400_BAD_REQUEST)