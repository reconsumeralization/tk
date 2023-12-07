import unittest

import numpy as np
import pandas as pd
from ai_features import DataAnalyzer


class TestAIFeatures(unittest.TestCase):
    def test_analyze_data(self):
        data = pd.DataFrame({
            'A': [1, 2, 3, 4, 5],
            'B': [2, 3, 4, 5, 6],
            'C': [3, 4, 5, 6, 7]
        })
        analyzer = DataAnalyzer()
        result = analyzer.analyze_data(data)
        self.assertEqual(result['A']['mean'], 3.0)
        self.assertEqual(result['B']['mean'], 4.0)
        self.assertEqual(result['C']['mean'], 5.0)

    def test_train_model(self):
        data = pd.DataFrame({
            'A': [1, 2, 3, 4, 5],
            'B': [2, 3, 4, 5, 6]
        })
        X = data[['A']]
        y = data['B']
        analyzer = DataAnalyzer()
        mse = analyzer.train_model(X, y)
        self.assertLess(mse, 1e-6)

    def test_predict_data(self):
        data = pd.DataFrame({
            'A': [1, 2, 3, 4, 5],
            'B': [2, 3, 4, 5, 6]
        })
        X = data[['A']]
        y = data['B']
        analyzer = DataAnalyzer()
        analyzer.train_model(X, y)
        predictions = analyzer.predict_data(X)
        self.assertTrue(np.allclose(predictions, y))

if __name__ == '__main__':
    unittest.main()
