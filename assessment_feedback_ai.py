from transformers import pipeline
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from typing import List

class AssessmentFeedbackAI:
    def __init__(self):
        self.assessment_feedback_ai = pipeline('sentiment-analysis')
        self.chatbot = ChatBot('AssessmentChatBot')
        trainer = ChatterBotCorpusTrainer(self.chatbot)
        trainer.train("chatterbot.corpus.english")  # Train the chatbot based on the English corpus

    def get_assessment_feedback(self, student_answers: List[str]) -> List[dict]:
        try:
            return self.assessment_feedback_ai(student_answers)
        except Exception as e:
            print(f"An error occurred: {e}")
            return []

    def get_conversation(self, conversation: str) -> str:
        return str(self.chatbot.get_response(conversation))

assessment_feedback_ai = AssessmentFeedbackAI()

def init() -> None:
    print("Assessment Feedback AI Initialized")

def get_assessment_feedback(student_answers: List[str]) -> List[dict]:
    return assessment_feedback_ai.get_assessment_feedback(student_answers)

def get_conversation(conversation: str) -> str:
    return assessment_feedback_ai.get_conversation(conversation)

if __name__ == "__main__":
    init()
    student_answers = ["I love this class!", "This is too difficult."]
    feedback = get_assessment_feedback(student_answers)
    print(feedback)
    conversation = get_conversation("Tell me about the test results.")
    print(conversation)