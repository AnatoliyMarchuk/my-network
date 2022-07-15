import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

export default function Header(props) {
	// debugger;

	// console.log(props.authPhoto);
	return (
		<header className={s.header}>
			<img
				className={s.logo}
				src='https://templates.iqonic.design/socialv/bs5/vue/dist/img/logo.f507d54e.png'
				alt='img'
			/>
			<div className={s.login}>
				{/* <img src={avaLogin} alt="login" /> */}
				{props.isAuth ? (
					<div>
						{props.login}{' '}
						<button type='submit' className={`btn ${s.btn}`} onClick={props.userLogout}>
							{' '}
							Logout{' '}
						</button>
					</div>
				) : (
					<NavLink to='/login' className={`${s.btn} btn`}>
						login
					</NavLink>
				)}
				<br />
			</div>
		</header>
	);
}
