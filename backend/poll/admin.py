from django.contrib import admin
from .models import Poll, PollChoice

admin.site.register(Poll)
admin.site.register(PollChoice)
