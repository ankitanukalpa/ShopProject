import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { deleteUser, getUser } from './apiAdmin';


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

  const destroy = (userId) => {
    deleteUser(userId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Manage Users'
      description='Perform CRUD on Users'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {users.length} Users</h2>
          <hr />
          <ul className='list-group'>
            {users.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <div>

                <Link to={`/updateUser/${p._id}`}>
                  <span className='badge badge-info' style={{marginRight:20}}>Update</span>
                </Link>
                <Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className='badge badge-danger'
                  >
                    Delete
                  </span>
                </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageUser;
