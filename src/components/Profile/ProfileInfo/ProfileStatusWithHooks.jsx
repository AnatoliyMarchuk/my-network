import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const ProfileStatusWithHooks = (props) => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
	};
	const deActivateEditMode = () => {
		setEditMode(false);
		props.updateUserStatus(status);
	};
	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};

	return (
		<div>
			{!editMode && (
				<div>
					{' '}
					<span onDoubleClick={activateEditMode}>{props.status || 'No status!!!'}</span>
				</div>
			)}
			{editMode && (
				<div>
					<input
						onChange={onStatusChange}
						autoFocus={true}
						onBlur={deActivateEditMode}
						value={status}
					/>
				</div>
			)}
		</div>
	);
};
