import React from 'react';
import s from './Sidebar.module.css';
import FriendItem from './FriendItem/FriendItem';

export default function Sidebar(props) {
	// debugger;

	const friendItem = props.friendsData.map((item, index) => {
		return (
			<FriendItem name={item.name} age={item.age} img={item.img} key={index} />
		);
	});

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				<h1>Friends</h1>
			</div>
			<div className={s.content}>{friendItem}</div>
		</div>
	);
}
