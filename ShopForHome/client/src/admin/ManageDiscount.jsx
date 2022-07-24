import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getUser } from './apiAdmin';


const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUser().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };


  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Manage Discount'
      description='Manage Discount'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center' style={{font:'bold'}}>Total {users.length} Users</h2>
          <hr />
          <ul className='list-group'>
            {users.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <Link to={`/updateDiscount/${p._id}`}>
                  <span className='badge badge-info'>Add Discount</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageUser;
