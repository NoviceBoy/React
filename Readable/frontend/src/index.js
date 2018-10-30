import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore , applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';

import postApp from './reducers/index'

import Application from './components/Application';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 

let store = createStore(
  postApp,
  composeEnhancers( applyMiddleware( thunkMiddleware )))
  

ReactDOM.render(
   <Provider store={store}> 
  	<div>
	<Application/>
    </div>
   </Provider>,
   document.getElementById('root')
)
registerServiceWorker();

