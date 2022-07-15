import React from 'react';
import s from './Users.module.css';

import Paginator from '../../commons/Paginator/Paginator';
import UserList from './UserList/UserList';

export default function Users({
	totalUsersCount,
	pageSize,
	currentPage,
	selectedPage,
	onPageChange,
	followingInProgress,
	follow,
	unfollow,
	users,
}) {
	// debugger;
	return (
		<div className={s.contentPage}>
			<div className={s.container}>
				<Paginator
					currentPage={currentPage}
					onPageChange={onPageChange}
					totalItemCount={totalUsersCount}
					pageSize={pageSize}
					selectedPage={selectedPage}
				/>
				<div className={s.row}>
					{users.map((u) => (
						// <div>UserID:{u.id}</div>

						<UserList
							key={u.id}
							users={u}
							followingInProgress={followingInProgress}
							unfollow={unfollow}
							follow={follow}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
