import React, { useState } from 'react';
import { useEffect } from 'react';
import s from './Paginator.module.css';

export default function Paginator({
	totalItemCount,
	pageSize,
	currentPage,
	selectedPage,
	onPageChange,
	portionSize = 10,
	...props
}) {
	let pagesCount = Math.ceil(totalItemCount / pageSize);
	let pages = [];

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}
	useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage]);
	let portionCount = Math.ceil(pagesCount / portionSize);
	const [portionNumber, setPortionNumber] = useState(1);
	let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionNumber = portionNumber * portionSize;

	return (
		<>
			<nav aria-label='Page navigation example'>
				<ul className='pagination'>
					{portionNumber > 1 && (
						<button
							className='page-link'
							onClick={() => {
								setPortionNumber(portionNumber - 1);
							}}>
							Previous
						</button>
					)}
					{pages
						.filter((p) => {
							return p >= leftPortionNumber && p <= rightPortionNumber;
						})
						.map((p, index) => {
							return (
								<li
									key={index}
									className={` page-item page-link ${currentPage === p ? s.selectedPage : null}`}
									onClick={() => {
										onPageChange(p);
									}}>
									{' '}
									{p}
								</li>
							);
						})}
					{portionCount > portionNumber ? (
						<button
							className='page-link'
							onClick={() => {
								setPortionNumber(portionNumber + 1);
							}}>
							Next
						</button>
					) : null}
				</ul>
			</nav>
		</>
	);
}
