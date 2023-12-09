from transformers import pipeline


class PersonalizedLearningAI:
    def __init__(self):
        self.personalized_learning_ai = pipeline('text-classification')

    def get_learning_recommendation(self, student_performance):
        return self.personalized_learning_ai(student_performance)

personalized_learning_ai = PersonalizedLearningAI()

def init():
    print("Personalized Learning AI Initialized")

def get_learning_recommendation(student_performance):
    return personalized_learning_ai.get_learning_recommendation(student_performance)