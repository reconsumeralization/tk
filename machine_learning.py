from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd

class MachineLearning:
    def __init__(self):
        self.model = RandomForestClassifier()

    def train_model(self, data, target):
        X_train, X_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        print(f"Model trained with accuracy: {accuracy}")

    def predict(self, data):
        return self.model.predict(data)

machine_learning = MachineLearning()

def init():
    print("Machine Learning Module Initialized")

def train_model(data, target):
    machine_learning.train_model(data, target)

def predict(data):
    return machine_learning.predict(data)