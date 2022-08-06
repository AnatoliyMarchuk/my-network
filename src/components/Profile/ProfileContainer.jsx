import React, { Component } from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	updateProfile,
	savePhoto,
} from '../../redux/profileReducer';
import withRouter from '../../hoc/withRouter';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

// debugger;

class ProfileContainer extends Component {
	refreshProfile() {
		let profileId = this.props.router.params.userId;
		if (!profileId) {
			profileId = this.props.userId;
		}
		this.props.getUserProfile(profileId);
		this.props.getUserStatus(profileId);
	}
	componentDidMount() {
		this.refreshProfile();
	}
	componentDidUpdate(prevProps) {
		// debugger;
		if (this.props.router.params.userId !== prevProps.router.params.userId) {
			this.refreshProfile();
		}
	}

	render() {
		return (
			<>
				<div className={s.Profile}>
					<Profile
						{...this.props}
						isOwner={!this.props.router.params.userId}
						profile={this.props.profile}
						status={this.props.status}
						updateUserStatus={this.props.updateUserStatus}
						updateProfile={this.props.updateProfile}
						savePhoto={this.props.savePhoto}
						profileUpdateSuccess={this.props.profileUpdateSuccess}
					/>
				</div>
			</>
		);
	}
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
)(ProfileContainer);
