import React, { useState } from 'react';
import Alert from '../../HooksTutorial/useContext/Alert';
import AlertProvider from '../../HooksTutorial/useContext/AlertContext';
import Main from '../../HooksTutorial/useContext/main';

import s from './Settings.module.css';

export default function Settings() {
	return (
		<div className={s.settings}>
			<h1> Settings</h1>
			<AlertProvider>
				<Alert />
				<Main />
			</AlertProvider>
		</div>
	);
}
