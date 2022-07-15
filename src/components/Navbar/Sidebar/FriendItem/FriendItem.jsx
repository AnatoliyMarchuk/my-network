import React from 'react';
import s from './FriendItem.module.css';

export default function FriendItem(props) {
	return (
		<div className={s.wrapper}>
			<img src={props.img} alt="img" />
			<div className={s.name}>{props.name} </div>
			<div className={s.age}>{props.age} </div>
		</div>
	);
}
