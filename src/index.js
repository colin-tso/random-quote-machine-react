import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Then we set the value in the --height custom property to the root of the document
document.documentElement.style.setProperty("--page-height", `${window.innerHeight}px`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('quote-box')
);

// We listen to the resize event
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty("--page-height", `${window.innerHeight}px`);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
