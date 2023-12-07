from flask import Flask, request
from transformers import pipeline


class AIModule:
    def __init__(self):
        self.lesson_planning_ai = pipeline('text-generation')
        self.personalized_learning_ai = pipeline('text-classification')
        self.assessment_feedback_ai = pipeline('sentiment-analysis')

    def generate_lesson_plan(self, topic):
        try:
            return self.lesson_planning_ai(topic)[0]['generated_text']
        except Exception as e:
            print(f"Error in generate_lesson_plan: {e}")
            return None

    def get_learning_recommendation(self, student_performance):
        try:
            return self.personalized_learning_ai(student_performance)
        except Exception as e:
            print(f"Error in get_learning_recommendation: {e}")
            return None

    def get_assessment_feedback(self, student_answers):
        try:
            return self.assessment_feedback_ai(student_answers)
        except Exception as e:
            print(f"Error in get_assessment_feedback: {e}")
            return None

ai_module = AIModule()

def init():
    print("AI Module Initialized")

def generate_lesson_plan(topic):
    return ai_module.generate_lesson_plan(topic)

def get_learning_recommendation(student_performance):
    return ai_module.get_learning_recommendation(student_performance)

def get_assessment_feedback(student_answers):
    return ai_module.get_assessment_feedback(student_answers)

app = Flask(__name__)

@app.route('/generate_lesson_plan', methods=['POST'])
def generate():
    data = request.get_json()
    result = generate_lesson_plan(data['topic'])
    if result is None:
        return {"error": "Error in generating lesson plan"}, 500
    return {"result": result}, 200

@app.route('/get_learning_recommendation', methods=['POST'])
def recommend():
    data = request.get_json()
    result = get_learning_recommendation(data['performance'])
    if result is None:
        return {"error": "Error in getting learning recommendation"}, 500
    return {"result": result}, 200

@app.route('/get_assessment_feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    result = get_assessment_feedback(data['answers'])
    if result is None:
        return {"error": "Error in getting assessment feedback"}, 500
    return {"result": result}, 200

if __name__ == '__main__':
    app.run(debug=True)