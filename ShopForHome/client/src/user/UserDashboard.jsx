import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';

import { read} from './apiUser';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
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

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    loadData();
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card'  style={{background:'#f98125', borderRadius:'0.8rem'}}>
        <h4 className='card-header'>User links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5' style={{background:'#f98125', borderRadius:'0.8rem'}}>
        <h3 className='card-header'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>Name: {name}</li>
          <li className='list-group-item'>Email: {email}</li>
          <li className='list-group-item'>Discount: {data.discount_coupon}%</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'  style={{background:'#f98125', borderRadius:'0.8rem'}}>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ₹{p.price}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
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
        
        <div className='col-md-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
        <div className='col-md-3'>{userLinks()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
