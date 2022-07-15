import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import s from './Layout.module.css';
import SidebarContainer from './Sidebar/SidebarContainer';
import HeaderContainer from '../Header/HeaderContainer';

export default function layout() {
	const setActive = ({ isActive }) => (isActive ? `${s.item_Active}` : `${s.item}`);
	return (
		<>
			{/* >
			 */}
			<div className=' app-wrapper-content'>
				<HeaderContainer />
				{/* <div className=" app-wrapper-content"> */}
				<nav className={s.nav}>
					<NavLink to='/' className={setActive}>
						HomePage
					</NavLink>
					<NavLink to='/profile' className={setActive}>
						Profile
					</NavLink>
					<NavLink to='/dialogs' className={setActive}>
						Messages
					</NavLink>
					<NavLink to='/users' className={setActive}>
						Users
					</NavLink>
					<NavLink to='/news' className={setActive}>
						News
					</NavLink>
					<NavLink to='/settings' className={setActive}>
						Settings
					</NavLink>
					<SidebarContainer />
				</nav>
				{/* </div> */}
				<main className={s.main}>
					<Outlet />
				</main>
				<footer className={s.footer}>2022</footer>
			</div>
		</>
	);
}
