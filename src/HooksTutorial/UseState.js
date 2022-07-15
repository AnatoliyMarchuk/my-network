import React, { useState } from 'react';

export default function UseState() {
	const [count, setCount] = useState(0);
	const [state, setTitle] = useState({
		title: 'title',
		date: 22,
	});
	const increment = () => {
		setCount((prev) => prev + 1);
		setCount(count + 1);
		return count;
	};
	const decrement = () => {
		setCount(count - 1);
		return count;
	};

	const changeTitle = () => {
		setTitle((prev) => {
			return {
				...prev,
				title: 'new title',
			};
		});
	};
	return (
		<div>
			<h1> Counter: {count}</h1>

			<button className='btn btn-primary' style={{ margin: '10px' }} onClick={increment}>
				{' '}
				add{' '}
			</button>
			<button className='btn btn-primary' onClick={decrement}>
				{' '}
				remove{' '}
			</button>
			<div>{state.title}</div>
			<h2>{state.date}</h2>
			<button onClick={changeTitle}> change title </button>
		</div>
	);
}
