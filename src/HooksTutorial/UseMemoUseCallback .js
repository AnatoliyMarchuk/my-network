import React, { useState } from 'react';

export default function UseMemoUseCallback() {
	const [num, setNum] = useState(34);
	const setNumber = (prev) => {
		console.log(prev + 1);
	};

	return (
		<div>
			<h1>UseMemo</h1>
			<h2> Пораховане значення: {num}</h2>
			<button className='btn' onClick={setNum((prev) => prev + 1)}>
				додати
			</button>
			<button className='btn' onClick={setNumber((prev) => prev - 1)}>
				відняти
			</button>
		</div>
	);
}
