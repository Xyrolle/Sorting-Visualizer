import React, { useState, useEffect, Fragment, useRef } from 'react';

import { getMergeSortAnimations } from '../../sortingAlgorithms';

import './SortingVisualizer.scss';

const SortingVisualizer = () => {
	const [ numbers, setNumbers ] = useState([]);
	const [ columns, setColumns ] = useState(10);
	const [ range, setRange ] = useState({ min: 1, max: 100 });
	const [ animationSpeed, setAnimationSpeed ] = useState(100);

	const minInputRef = useRef(null);
	const maxInputRef = useRef(null);

	const PRIMARY_COLOR = '#ff4136';
	const SECONDARY_COLOR = '#0f4c75';

	useEffect(
		() => {
			generateNumbers(range.min, range.max);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ columns, range ]
	);

	const generateNumberInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	const generateNumbers = (min = 1, max = 100) => {
		const nums = [];
		for (let i = 0; i < columns; ++i) {
			nums[i] = generateNumberInRange(min, max);
		}
		setNumbers(nums);
	};

	const handleChangeRange = (min, max) => {
		if (!isNaN(min) && !isNaN(max) && min > 0 && min < 101 && max > 0 && max < 101) {
			min = Number(min);
			max = Number(max);
			setRange({ min, max });
		}
	};

	const mergeSort = () => {
		const animations = getMergeSortAnimations(numbers);
		console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [ barOneIdx, barTwoIdx ] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color =

						i % 3 === 0 ? SECONDARY_COLOR :
						PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * animationSpeed);
			} else {
				setTimeout(() => {
					const [ barOneIdx, newHeight ] = animations[i];
					const barOne = arrayBars[barOneIdx];
					barOne.classList.remove(barOne.classList[1]);
					barOne.classList.add(`bar-${newHeight}`);
				}, i * animationSpeed);
			}
		}
	};

	return (
		<Fragment>
			<div className='slider-container'>
				<p>Amount of numbers</p>
				<input type='range' min='3' max='50' value={columns} onChange={(evt) => setColumns(evt.target.value)} />
				<p>Animation speed</p>
				<input
					type='range'
					min='1'
					max='1000'
					className='animation-speed'
					value={animationSpeed}
					onChange={(evt) => setAnimationSpeed(evt.target.value)}
				/>
			</div>
			<button onClick={() => generateNumbers()}>Reset</button>
			<input type='text' placeholder='Min value' ref={minInputRef} />
			<input type='text' placeholder='Max value' ref={maxInputRef} />
			<button onClick={() => handleChangeRange(minInputRef.current.value, maxInputRef.current.value)}>Go</button>
			<button
				onClick={() => {
					mergeSort();
				}}
			>
				Merge sort
			</button>
			<div className='chart' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
				{numbers.map((value, idx) => <div className={`array-bar bar-${value}`} key={idx} />)}
			</div>
		</Fragment>
	);
};

export default SortingVisualizer;
