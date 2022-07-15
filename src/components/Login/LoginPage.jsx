import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { userLogin } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

function LoginPage(props) {
	// console.log('Props:', props);
	if (props.isAuth) {
		// debugger;
		return <Navigate to='/profile' />;
	}

	return (
		<LoginForm userLogin={props.userLogin} login={props.login} captchaUrl={props.captchaUrl} />
	);
}

let mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		captchaUrl: state.auth.captchaUrl,
	};
};

export default connect(mapStateToProps, { userLogin })(LoginPage);
