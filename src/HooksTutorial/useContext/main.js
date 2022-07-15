import React from 'react';
import { useAlert } from './AlertContext';

export default function Main() {
	const { toggle } = useAlert();

	return (
		<>
			<h2> Hello from example Context </h2>
			<button
				style={{
					width: '10%',
					height: '30%',
					textAlign: 'center',
					alignSelf: 'center',
					marginLeft: '45%',
				}}
				className={`btn`}
				onClick={toggle}>
				{' '}
				show alert{' '}
			</button>
		</>
	);
}
