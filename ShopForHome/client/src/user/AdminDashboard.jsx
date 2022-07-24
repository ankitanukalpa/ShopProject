import React ,{ useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { read} from './apiUser';
import { colors } from '@material-ui/core';
import Copyright from '../core/Copyright';

const AdminDashboard = () => {
  const {
    user: {  name, email, role },
  } = isAuthenticated();

  const [data, setData] = useState([]);

  
    const loadData = () => {
      if(isAuthenticated()){
        const {
          user: { _id },
        } = isAuthenticated();
        const token = isAuthenticated().token;
    
  

      read(_id,token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setData(data);
        }
      });
    }
    };
    useEffect(() => {
      loadData();
    }, []);

  const adminLinks = () => {
    return (
      <div className='card' style={{width: '28rem' , background:'#f98125', borderRadius:'0.8rem'}}>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Create category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/bulkupload'>
              Bulk Upload
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Create product
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/orders'>
              View Orders
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/products'>
              Manage Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/stocks'>
              Product Stock
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/saleReport'>
              Sale Report
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/manageUser'>
              Manage Users
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/manageDiscount'>
              Discount Section
            </Link>
          </li>
          
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='card mb-5' style={{background:'#f98125', borderRadius:'0.8rem'}}>
        <h3 className='card-header'>Admin information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>Name: {name}</li>
          <li className='list-group-item'>Email: {email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-9'>{adminInfo()}</div>
        <div className='col-md-3'>{adminLinks()}</div>
      </div>
      <Copyright/>
    </Layout>
  );
};

export default AdminDashboard;
