import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, Store, CombinedState } from 'redux'; // Added CombinedState import
import { Provider } from 'react-redux';
import createRootReducer from './reducers';
import rootSaga from './sagas';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { StrictMode } from 'react';
import React from 'react';

// Ensure that your root reducer has a default export for RootState
const rootReducer = createRootReducer(initialState, configuration); // Replace initialState and configuration with actual values

const sagaMiddleware = createSagaMiddleware();

const store: Store<CombinedState<RootState>> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware), initialState, configuration)
);
sagaMiddleware.run(rootSaga);

const RootComponent = () => (
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);

// Use a separate function for rendering to improve code readability
const renderApp = () => {
  render(<RootComponent />, document.getElementById('root'));
};

// Call the render function
renderApp();
