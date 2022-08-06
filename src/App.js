import React, { Component, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';

import Settings from './components/Settings/Settings';
import MessagesContainer from './components/Dialogs/MessagesContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import Layout from './components/Navbar/Layout';
import ErrorPage from './components/ErrorPage';
import User from './components/Users/User';
import LoginPage from './components/Login/LoginPage';
import { connect } from 'react-redux';
import { globalError, initialize } from './redux/appReducer.ts';
import Preloader from './commons/loader/Preloader';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainerFC from './components/Profile/functionComponent/ProfileContainerFC';

// import News from '';
const News = React.lazy(() => import('./components/News/News'));
// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
class App extends Component {
	catchAllUnhandledErrors = (reason, promise) => {
		console.log('reason', reason, '', reason.message);
		process.on('unhandledRejection', (reason, promise) => {
			console.error(`Uncaught error in`, promise);
		});

		globalError(reason);
		alert('Some error!!! ');
	};

	componentDidMount() {
		this.props.initialize();
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	}
	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	}
	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}

		return (
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='profile/*' element={<ProfileContainerFC />}>
						<Route path=':userId' element={<User />} />
					</Route>
					<Route path='dialogs/*' element={<MessagesContainer />} />
					<Route path='users/*' element={<UsersContainer />} />
					<Route
						path='news'
						element={
							<div>
								<Suspense fallback={<div>Завантаження...</div>}>
									<News />
								</Suspense>
							</div>
						}
					/>
					<Route path='login' element={<LoginPage />} />
					<Route path='settings' element={<Settings />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>
			</Routes>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialize,
});

export default connect(mapStateToProps, { initialize })(App);
