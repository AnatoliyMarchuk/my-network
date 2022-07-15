import React from 'react';
import s from './User.module.css';
import userPhoto from '../../../assets/img/AvaDefault.png';

import { NavLink, Outlet } from 'react-router-dom';

export default function UserList({ users, followingInProgress, unfollow, follow }) {
	return (
		<div>
			<div className={s.columnCard}>
				<div className={s.cardBlock}>
					<div className={s.cardBody}>
						<div className={s.profileHeaderImage}>
							<div className={s.coverContainer}>
								<img
									src='https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/page-img/profile-bg2.jpg'
									alt='bg img'
								/>
							</div>
							<div className={s.profileInfo}>
								<div className={s.userDetail}>
									<div className={s.profileDetail}>
										<div className={s.profileImage}>
											<NavLink to={'/profile/' + users.id}>
												<img
													src={users.photos.large !== null ? users.photos.small : userPhoto}
													alt='Img'
												/>
											</NavLink>
										</div>
										<div className={s.userDataBlock}>
											<h4> {users.name}</h4>
											<h6> {'u.location.city'}</h6>
											<h6> {users.status}</h6>
											<h6> {users.age} </h6>
											<h6> {'u.country'} </h6>
											<p> some text </p>
										</div>
									</div>
									<Outlet />

									{users.followed ? (
										<button
											type='submit'
											className={`btn ${s.btnPrimary}`}
											disabled={followingInProgress.some((id) => id === users.id)}
											onClick={() => {
												unfollow(users.id);
											}}>
											Following
										</button>
									) : (
										<button
											type='submit'
											className={`btn ${s.btnSecondary}`}
											disabled={followingInProgress.some((id) => id === users.id)}
											onClick={() => {
												follow(users.id);
											}}>
											UnFollowing
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
