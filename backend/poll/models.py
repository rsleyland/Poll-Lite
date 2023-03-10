from django.db import models

class Poll(models.Model):
    name = models.CharField(max_length=128, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    question = models.TextField()


class PollChoice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="choices")
    choice = models.TextField()
    choice_id = models.CharField(max_length=1)
    votes = models.IntegerField(default=0)

    def inc_vote(self):
        self.votes +=1
        self.save()

    def dec_vote(self):
        self.votes -=1
        self.save()

    def __str__(self):
        return "(%c) - %s" % (self.choice_id, self.choice)