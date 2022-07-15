import React from 'react';
import { useAlert } from './AlertContext';

export default function Alert() {
	// debugger;
	const alert = useAlert();
	if (!alert.visible) return null;

	return (
		<div
			onClick={alert.toggle}
			style={{
				color: '#fff',
				fontSize: '30px',
				backgroundColor: '#FF7373',
				opacity: '0.9',
				alignSelf: 'center',
				margin: '10px',
				borderRadius: '10px',
			}}>
			Alert
		</div>
	);
}
