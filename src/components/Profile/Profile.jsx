import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

export default function Profile(props) {
	// console.log('Props from profile', props);
	// debugger;

	return (
		<div className={s.Profile}>
			<ProfileInfo
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				updateProfile={props.updateProfile}
				savePhoto={props.savePhoto}
				profileUpdateSuccess={props.profileUpdateSuccess}
			/>
			<MyPostsContainer />
		</div>
	);
}
