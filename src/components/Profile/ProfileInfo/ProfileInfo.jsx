import React from 'react';
import Preloader from '../../../commons/loader/Preloader';
import s from './ProfileInfo.module.css';
import smileTrue from '../../../assets/img/smileTrue.png';
import smileFalse from '../../../assets/img/smileFalse.png';
import defaultPhoto from '../../../assets/img/AvaDefault.png';

import ProfileStatus from './ProfileStatus';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

export default function ProfileInfo({
	profile,
	status,
	updateUserStatus,
	isOwner,
	savePhoto,
	updateProfile,
	profileUpdateSuccess,
}) {
	let [editMode, setEditMode] = useState(false);

	if (!profile) {
		return <Preloader />;
	} else {
		const onMainPhotoSelected = (e) => {
			if (e.target.files.length) {
				savePhoto(e.target.files[0]);
			}
		};

		// console.log(profile);
		return (
			<div>
				<div className={s.backgroundImg}>
					<img
						src='https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/page-img/profile-bg3.jpg'
						alt='img'
					/>{' '}
				</div>
				<div className={s.ava_group}>
					<img
						className={s.img}
						src={profile.photos.large ? profile.photos.large : defaultPhoto}
						alt='large'
					/>
					{isOwner ? <input type='file' onChange={onMainPhotoSelected} /> : null}
				</div>
				<hr />

				<div className={s.description_block}>
					{' '}
					{editMode ? (
						<ProfileDataForm
							initialValues={profile}
							updateProfile={updateProfile}
							goToEditMode={setEditMode}
							profileUpdateSuccess={profileUpdateSuccess}
						/>
					) : (
						<div>
							<div className={s.status}>
								<ProfileStatus status={status} updateUserStatus={updateUserStatus} />{' '}
								<h2> {profile.fullName}</h2>
							</div>
							<ProfileData profile={profile} isOwner={isOwner} goToEditMode={setEditMode} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
	return (
		<>
			<div>
				{' '}
				{isOwner && (
					<button className='btn btn-info' onClick={goToEditMode}>
						edit
					</button>
				)}
			</div>
			<h4>
				<span> {profile.aboutMe}</span>
			</h4>
			<div className={s.description_job}>
				<b> looking for a job</b>
				{profile.lookingForAJob ? (
					<div>
						<b> Yes </b>
						<img src={smileTrue} alt='smile' />
					</div>
				) : (
					<div>
						<img src={smileFalse} alt='smile' />
						<b> No </b>
					</div>
				)}{' '}
				{profile.lookingForAJob && (
					<div>
						<b> My skills </b>:{profile.lookingForAJobDescription}
					</div>
				)}
				<hr />
				<div className={s.description_for_job}>{profile.lookingForAJobDescription}</div>
			</div>
			<div className={s.aboutMe}>
				<div>
					<b> About me</b>
					{profile.aboutMe}
				</div>
			</div>
			<div className={s.contacts}>
				<b>Contacts</b>:{' '}
				{Object.keys(profile.contacts).map((key) => {
					return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />;
				})}
			</div>
		</>
	);
};

const Contact = ({ contactTitle, contactValue }) => {
	return (
		<div>
			{' '}
			<b>{contactTitle}</b>:{contactValue}{' '}
		</div>
	);
};
