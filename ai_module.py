```python
from transformers import pipeline

class AIModule:
    def __init__(self):
        self.lesson_planning_ai = pipeline('text-generation')
        self.personalized_learning_ai = pipeline('text-classification')
        self.assessment_feedback_ai = pipeline('sentiment-analysis')

    def generate_lesson_plan(self, topic):
        return self.lesson_planning_ai(topic)[0]['generated_text']

    def get_learning_recommendation(self, student_performance):
        return self.personalized_learning_ai(student_performance)

    def get_assessment_feedback(self, student_answers):
        return self.assessment_feedback_ai(student_answers)

ai_module = AIModule()

def init():
    print("AI Module Initialized")

def generate_lesson_plan(topic):
    return ai_module.generate_lesson_plan(topic)

def get_learning_recommendation(student_performance):
    return ai_module.get_learning_recommendation(student_performance)

def get_assessment_feedback(student_answers):
    return ai_module.get_assessment_feedback(student_answers)
```
