import React from 'react';
import { useParams } from 'react-router-dom';

export default function User() {
	let params = useParams();

	console.log(params);
	return <h2>User: {params.userId}</h2>;
}
