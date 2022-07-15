import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import store from './redux/redux-store';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';

// debugger;
ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App className='container' />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
