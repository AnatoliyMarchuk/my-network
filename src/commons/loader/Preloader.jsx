import React from 'react';
import s from './Preloader.module.css';

export default function Preloader() {
	return (
		<div className={s.container}>
			<div className={s.lds_roller}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
