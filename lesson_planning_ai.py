
from transformers import pipeline

class LessonPlanningAI:
    def __init__(self):
        self.lesson_planning_ai = pipeline('text-generation')

    def generate_lesson_plan(self, topic):
        return self.lesson_planning_ai(topic)[0]['generated_text']

lesson_planning_ai = LessonPlanningAI()

def init():
    print("Lesson Planning AI Initialized")

def generate_lesson_plan(topic):
    return lesson_planning_ai.generate_lesson_plan(topic)