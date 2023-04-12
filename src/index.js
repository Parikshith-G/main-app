import React from 'react';
import ReactDOM from 'react-dom/client';
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import {positions, transitions,Provider as AlertProvider} from 'react-alert'
import { Provider } from 'react-redux';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));



const options ={
  timeout:5000,
  position :positions.BOTTOM_CENTER,
  transition:transitions.SCALE
}

root.render(
  
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}{...options}>
    <App />
    </AlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

