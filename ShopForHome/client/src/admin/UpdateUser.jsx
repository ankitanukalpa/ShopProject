import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
// import { isAuthenticated } from '../auth';
import {  Redirect } from 'react-router-dom';
import {  readUser, updateUserA } from '../user/apiUser';

const UpdateUser = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    discount_coupon:'',

    error: false,
    success: false,
  });


  const { name, email, password, error, success,discount_coupon } = values;

  const init = (userId) => {

    readUser(userId).then((data) => {
        console.log(data)
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email, discount_coupon: data.discount_coupon });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUserA(match.params.userId, { name, email, password,discount_coupon }).then(
      (data) => {
        if (data.error) {
   
          alert(data.error);
        } else {
         
          setValues({...values,
            name: data.name,
            email: data.email,
            discount_coupon: data.discount_coupon,
            success: true,})
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to='/admin/dashboard' />;
    }
  };

  const profileUpdate = (name, email, password,discount_coupon) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>discount_coupon</label>
        <input
          type='number'
          onChange={handleChange('discount_coupon')}
          className='form-control'
          value={discount_coupon}
        />
      </div>
      

      <button onClick={clickSubmit} className='btn btn-primary'>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Profile'
      description='Update your User Data'
      className='container-fluid'
    >
      <h2 className='mb-4'>Profile update</h2>
      {profileUpdate(name, email, password, discount_coupon)}
      {redirectUser(success)}
    </Layout>
  );
};

export default UpdateUser;
