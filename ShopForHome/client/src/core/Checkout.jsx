import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  processPayment,
  createOrder,
} from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';


const Checkout = ({ products, setRun, discount1 = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });
  

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

 

  

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      var total = currentValue + nextValue.count * nextValue.price;
      // console.log(total)
      var val= total;
      if(typeof variable !== 'undefined'){
        console.log(total)
        return (val-((total*discount1)/100));
        
      }
      if(discount1>0){
        console.log(total)
        return (val-((total*discount1)/100));
      }
      return (total);
    
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <Button variant='contained' color='primary'>
          Sign in to checkout
        </Button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
        
        const paymentData = {

          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: products,
              amount: getTotal(products),
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log('payment success and empty cart');
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ ...data, error: error.message , loading: false});
          });
    
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      { products.length > 0 ? (
        <div>
          <div className='gorm-group mb-3'>
            <label className='text-muted'>Delivery address: </label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <button onClick={buy} className='btn btn-info btn-block'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  return (
    <div>
      <h2>Total: ₹{getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
