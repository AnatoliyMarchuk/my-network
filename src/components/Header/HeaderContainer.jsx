import React from 'react';

import Header from './Header';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/authReducer';

function HeaderContainer(props) {
	return <Header {...props} userLogout={props.userLogout} />;
}
const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
	userId: state.auth.userId,
	authPhoto: state.auth.profilePhoto,
});

export default connect(mapStateToProps, {
	userLogout,
})(HeaderContainer);
