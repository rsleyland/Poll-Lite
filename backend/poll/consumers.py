import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Poll
from .serializers import PollWithChoicesSerializer


class PollDetailConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["poll_name"]
        self.room_group_name = "poll_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

        # # get and send poll detail (will update after somebody votes and joins the socket layer (therefore will be realtime))
        data = await self.get_poll_detail()

        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_poll",
                             "poll": data,}
        )

    async def send_poll(self, event):
        poll = event["poll"]
        type = event["type"]
        await self.send(text_data=json.dumps({"poll": poll, "type": type}))


    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)



    @database_sync_to_async
    def get_poll_detail(self):
        poll = Poll.objects.get(name=self.room_name)
        serializer = PollWithChoicesSerializer(poll)
        return serializer.data
