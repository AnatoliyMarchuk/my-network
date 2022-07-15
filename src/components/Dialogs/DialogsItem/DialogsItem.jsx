import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './DialogsItem.module.css';

export default function DialogsItem(props) {
	const path = '/dialogs/' + props.id;
	const setActive = ({ isActive }) =>
		isActive ? `${s.dialog_Active}` : `${s.dialog}`;

	return (
		<div className={s.dialog}>
			<NavLink className={setActive} to={path} img={props.img}>
				<img src={props.img} alt="ava" />
				{props.name}

				<div> {props.message}</div>
			</NavLink>
		</div>
	);
}
