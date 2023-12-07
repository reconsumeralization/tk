// Define your root state
interface RootState {
  users: any[];
  courses: any[];
  assignments: any[];
  tests: any[];
  chats: any[];
}

// Define your initial state
const initialState: RootState = {
  users: [],
  courses: [],
  assignments: [],
  tests: [],
  chats: []
}

// Define your configuration
const configuration = {
  // Define your configuration properties here
};

// Define your sagas
function* rootSaga() {
  // Define your sagas here
}

// Now, let's adjust your existing code
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Action, Middleware, Reducer } from 'redux'; // Added Reducer import
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import App from './App';
import createRootReducer from './reducers';

const rootReducer: Reducer<RootState, Action<string>> = createRootReducer(); // Added type for rootReducer

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

const configureStore = (initialState: RootState, configuration: any) => {
  const store = createStore(
    rootReducer,
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
