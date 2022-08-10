import React from 'react';
import s from '../Profile.module.css';
import Profile from '../Profile';
import { connect } from 'react-redux';
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	updateProfile,
	savePhoto,
} from '../../../redux/profileReducer.ts';
import withRouter from '../../../hoc/withRouter';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { useEffect } from 'react';
import { usePreviousValue } from '../../../hooks/usePreviousValue';

function ProfileContainerFC(props) {
	const userId = props.router.params.userId;
	const refreshProfile = () => {
		let profileId = props.router.params.userId;
		if (!profileId) {
			profileId = props.userId;
		}
		props.getUserProfile(profileId);
		props.getUserStatus(profileId);
	};
	const previousValue = usePreviousValue(userId);
	useEffect(() => {
		refreshProfile();
		// console.log('render');
	}, []);
	useEffect(() => {
		if (props.router.params.userId !== previousValue) {
			refreshProfile();
		}
	}, []);
	return (
		<div className={s.Profile}>
			<Profile
				{...props}
				isOwner={!props.router.params.userId}
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				updateProfile={props.updateProfile}
				savePhoto={props.savePhoto}
				profileUpdateSuccess={props.profileUpdateSuccess}
			/>
		</div>
	);
}

let mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		userId: state.auth.userId,
		isAuth: state.profilePage.isAuth,
		profileUpdateSuccess: state.profilePage.profileUpdateSuccess,
	};
};

export default compose(
	connect(mapStateToProps, {
		getUserProfile,
		getUserStatus,
		updateUserStatus,
		savePhoto,
		updateProfile,
	}),
	withRouter,
	withAuthRedirect
)(ProfileContainerFC);
