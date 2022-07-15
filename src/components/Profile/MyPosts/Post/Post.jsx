import React from 'react';
import s from './Post.module.css';
export default function Post(props) {
	return (
		<div className={s.item}>
			<img src={props.img} alt="ava" />
			{props.message}
			{props.age}
			<div>
				<span> I have the {props.count} like</span>
			</div>
		</div>
	);
}
