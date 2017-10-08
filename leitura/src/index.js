import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/'
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
)

ReactDOM.render(<BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
