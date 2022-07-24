import React from 'react'
import { listStocks, sendmail } from './apiAdmin';
import { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import Table from 'react-bootstrap/Table'


export default function Stocks() {
	const [data, setData] = useState([]);

	const loadData = () => {
		sendmail();
		listStocks().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setData(data);
			}
		});
	};
	useEffect(() => {
		loadData();
	}, []);

	return (
		<Layout
			title='Product Stock'
			description='All products Stocks'
			className='container-fluid'
		>

			<div >
				<Table striped bordered hover size="sm" variant="dark">
					<thead>
						<tr>
							<th>Name</th>
							<th >Stocks</th>
						</tr>
					</thead>
					<tbody>
						{data.map((list, index) => (
							<tr key={index}>
								<td >{list.name}</td>
								<td >{list.quantity}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Layout>
	)
}
