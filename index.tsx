import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';

// Specify the root state type based on your reducers
type RootState = ReturnType<typeof reducers>;

// Create the Redux store with middleware (thunk) and DevTools
const store: Store<RootState> = createStore(
  reducers, 
  applyMiddleware(thunk)
);

// Render the React application
ReactDOM.render(
  <React.StrictMode>
    {/* 
      Provide the Redux store to the entire application 
      This ensures that all components can access the global state.
    */}
    <Provider store={store}>
      {/* 
        Set up React Router 
        This allows for navigation within the React application.
      */}
      <Router>
        {/* 
          Main application component 
          The root component that contains the entire application logic.
        */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);