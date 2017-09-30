import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.css';

//import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
