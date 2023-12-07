import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Action, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import App from './App';
import rootReducer from './reducers'; // Import the root reducer

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

const configureStore = (initialState: RootState, configuration: any) => {
  const store = createStore(
    rootReducer, // Use the root reducer here
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware as Middleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

const RootComponent = ({ store }: { store: any }) => (
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>
  </StrictMode>
);

const renderApp = () => {
  const store = configureStore(initialState, configuration);
  render(<RootComponent store={store} />, document.getElementById('root'));
};

renderApp();
