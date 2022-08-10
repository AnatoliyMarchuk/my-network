import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import messageReducer from './messageReducer.ts';
import sidebarReducer from './sidebarReducer';
import profileReducer from './profileReducer.ts';
import usersReducer from './usersReducer';
import authReducer from './authReducer.ts';
import appReducer from './appReducer.ts';

let reducers = combineReducers({
	profilePage: profileReducer,
	messagesPage: messageReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;
