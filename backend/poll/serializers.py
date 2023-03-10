from rest_framework import serializers
from .models import Poll, PollChoice



class PollSerializer(serializers.ModelSerializer):

    class Meta:
        model = Poll
        fields = '__all__'


class PollWithChoicesSerializer(serializers.ModelSerializer):

    choices = serializers.SerializerMethodField(read_only=True)
    total_votes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Poll
        fields = '__all__'

    def get_choices(self, obj):
        return PollChoicesSerializer(obj.choices.all(), many=True).data
    
    def get_total_votes(self, obj):
        choices = obj.choices.all()
        count = 0
        for c in choices:
            count += c.votes
        return count


        
class PollChoicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = PollChoice
        fields = '__all__'