import React, { Component, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';

import Settings from './components/Settings/Settings';
import MessagesContainer from './components/Dialogs/MessagesContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Layout from './components/Navbar/Layout';
import NotfoundPage from './components/NotfoundPage';
import User from './components/Users/User';
import LoginPage from './components/Login/LoginPage';
import { connect } from 'react-redux';
import { initialize } from './redux/appReducer';
import Preloader from './commons/loader/Preloader';
import UsersContainer from './components/Users/UsersContainer';

// import News from '';
const News = React.lazy(() => import('./components/News/News'));
// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
class App extends Component {
	componentDidMount() {
		this.props.initialize();
		// debugger;
	}
	// console.log('app', props);
	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}

		return (
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='profile/*' element={<ProfileContainer />}>
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
					<Route path='*' element={<NotfoundPage />} />
				</Route>
			</Routes>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialize,
});

export default connect(mapStateToProps, { initialize })(App);
