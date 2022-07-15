import React, { useEffect, useState } from 'react';

export default function UseEffect() {
	const [type, setType] = useState('users');
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/${type}`)
			.then((response) => response.json())
			.then((json) => setData(json));
	}, [type]);
	return (
		<>
			<div>UseEfect</div>
			<div>
				<h1> Ресурс: {type} </h1>
				<button
					onClick={() => {
						setType('users');
					}}>
					users
				</button>
				<button
					onClick={() => {
						setType('todos');
					}}>
					todos
				</button>
				<button
					onClick={() => {
						setType('posts');
					}}>
					posts
				</button>

				{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
				<div>
					{data.map((element, id) => {
						return <div key={id}>{element.username || element.title}</div>;
					})}
				</div>
			</div>
		</>
	);
}
