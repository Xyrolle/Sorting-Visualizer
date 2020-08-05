import React, { useState, useEffect, Fragment } from 'react';

import './SortingVisualizer.scss';

const SortingVisualizer = () => {
	const [ numbers, setNumbers ] = useState([]);
	const [ columns, setColumns ] = useState(10);
	const [ range, setRange ] = useState({ min: 1, max: 100 });

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

	const handleChange = (evt) => {
		evt.persist();
		let { name, value } = evt.target;
		try {
			let newValue = parseInt(value);
			if (Number.isInteger(newValue)) {
				setRange((prev) => {
					return { ...prev, [name]: newValue };
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Fragment>
			<div className='slider-container'>
				<p>Amount of numbers</p>
				<input type='range' min='3' max='50' value={columns} onChange={(evt) => setColumns(evt.target.value)} />
			</div>
			<button onClick={() => generateNumbers()}>Reset</button>
			<input type='text' name='min' placeholder='Min value' value={range.min} onChange={handleChange} />
			<input type='text' name='max' placeholder='Max value' value={range.max} onChange={handleChange} />
			<div className='chart' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
				{numbers.map((value, idx) => (
					<div className={`bar-${value}`} key={idx}>
						<span className='value'>{value}</span>
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default SortingVisualizer;
