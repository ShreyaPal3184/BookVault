from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionCheckBookAvailability(Action):
    def name(self) -> Text:
        return "action_check_book_availability"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        book = tracker.get_slot('book')
        # Add logic to check availability from your database
        is_available = True  # Replace with actual logic
        if is_available:
            dispatcher.utter_message(text=f"{book} is available for rent.")
        else:
            dispatcher.utter_message(text=f"Sorry, {book} is currently not available.")
        return []

class ActionRentBook(Action):
    def name(self) -> Text:
        return "action_rent_book"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        book = tracker.get_slot('book')
        # Add logic to rent the book from your database
        dispatcher.utter_message(text=f"You have successfully rented {book}. Enjoy reading!")
        return [SlotSet("book", None)]

class ActionReturnBook(Action):
    def name(self) -> Text:
        return "action_return_book"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        book = tracker.get_slot('book')
        # Add logic to return the book to your database
        dispatcher.utter_message(text=f"You have successfully returned {book}. Thank you!")
        return [SlotSet("book", None)]

class ActionFineInquiry(Action):
    def name(self) -> Text:
        return "action_fine_inquiry"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Add logic to check fines from your database
        fines = 0  # Replace with actual logic
        if fines > 0:
            dispatcher.utter_message(text=f"You have {fines} in overdue fines.")
        else:
            dispatcher.utter_message(text="You have no outstanding fines.")
        return []
