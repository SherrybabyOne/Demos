import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './01-redux';
import Page from './context-demo';
import { Provider } from './react-redux';
import { createStore } from './redux';
import {counter} from './01-redux';

const store = createStore(counter);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
);
