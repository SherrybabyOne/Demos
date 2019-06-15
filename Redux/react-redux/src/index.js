import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './01-redux';
import Page from './context-demo';
import { Provider } from './react-redux';
import { createStore,applyMiddleware } from './redux';
import {counter} from './01-redux';
import thunk from './redux-thunk';
import arrayThunk from './redux-array';

const store = createStore(counter,applyMiddleware(thunk,arrayThunk))
// const store = createStore(counter);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
);
