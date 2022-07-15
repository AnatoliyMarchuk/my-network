// import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

import { addMessageCreator } from '../../redux/messageReducer';
import Messages from './Messages';
let mapStateToProps = (state) => {
	return {
		usersData: state.messagesPage.users,
		messageData: state.messagesPage.messageData,
		newMessageText: state.messagesPage.newMessageText,
	};
};
let mapDispatchToProps = (dispatch) => {
	return {
		addMessage: (message) => {
			dispatch(addMessageCreator(message));
		},
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Messages);
