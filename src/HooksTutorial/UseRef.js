import React, { useEffect, useRef, useState } from 'react';

export default function UseRef() {
	const [value, setValue] = useState('');
	const renderCount = useRef(1);
	const inputRef = useRef(null);
	const prevValue = useRef('');

	const focus = () => {
		inputRef.current.focus();
	};

	useEffect(() => {
		renderCount.current++;
	});
	useEffect(() => {
		prevValue.current = value;
	}, [value]);
	return (
		<div>
			<h1> HookUseRef</h1>
			<h2> Кількість рендерів: {renderCount.current} </h2>
			<h2> Попередній state: {prevValue.current} </h2>
			<input
				ref={inputRef}
				type='text'
				onChange={(e) => {
					setValue(e.target.value);
				}}
				value={value}
			/>{' '}
			<button className='btn btn-primary' onClick={focus}>
				{' '}
				Focus{' '}
			</button>
		</div>
	);
}
