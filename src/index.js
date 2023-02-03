import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './utils/redux/store/appstore.js';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';
import { tokenInterceptor } from './utils/services/interceptor';


tokenInterceptor();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ErrorBoundary>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
