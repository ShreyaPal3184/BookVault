# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []


# actions/actions.py

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import openai

class ActionGenerateResponse(Action):
    def name(self) -> Text:
        return "action_generate_response"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        user_message = tracker.latest_message.get('text')
        generated_response = self.generate_response(user_message)
        
        dispatcher.utter_message(text=generated_response)
        
        return []

    def generate_response(self, user_message: Text) -> Text:
        openai.api_key = 'sk-proj-EQsGgwnzMQWP0hRocGmGT3BlbkFJCnaBvptYq6SdTbuLXjoZ'  # Replace with your ChatGPT API key
        response = openai.Completion.create(
            model="text-davinci-003",  # Adjust based on your ChatGPT model
            prompt=user_message,
            max_tokens=100  # Adjust based on desired response length
        )
        
        return response.choices[0].text.strip()
