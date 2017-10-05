import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/recuderCombine'

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
let store = createStore(todoApp)
ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
