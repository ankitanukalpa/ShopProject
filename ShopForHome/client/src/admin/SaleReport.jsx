import React from 'react'
import { listData } from './apiAdmin';
import { useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import Layout from '../core/Layout';
// import Table from 'react-bootstrap/Table'

export default function SaleReport() {
	const [data, setData] = useState([]);

	const [values, setValues] = useState({
		fromDate: '',
		toDate: '',
		error: '',
		loading: false,
	});

	const { fromDate, toDate, loading, error, } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // so that browser does not reload
		setValues({ ...values, error: false, loading: true });
		console.log(fromDate)

		listData({ values }).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setData(data);
			}
		});
	}


	return (
		<Layout
			title='Product Sale Report'
			description='All products Stocks'
			className='container-fluid'
		>
			<div>
				<form>
					<label >
						From:
						<input type="date" name='fromDate' onChange={handleChange('fromDate')} value={fromDate} />
					</label>
					<label>
						To:
						<input type="date" name='toDate' onChange={handleChange('toDate')} value={toDate} />
					</label>
					<button onClick={handleSubmit}>show</button>
				</form>
			</div>
			<div>
				<Table striped bordered hover size="sm" variant="dark">
					<thead>
						<tr>
							<th>Name</th>
							<th>sold</th>
							<th >Price</th>
							<th >Total</th>
							<th >quantity</th>
						</tr>
					</thead>
					<tbody>
						{data.map((list, index) => (
							<tr key={index}>
								<td >{list.name}</td>
								<td >{list.sold}</td>
								<td >{list.price}</td>
								<td >{list.sold * list.price}</td>
								<td >{list.quantity}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Layout>
	)
}
