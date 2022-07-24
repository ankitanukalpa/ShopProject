import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Button from 'react-bootstrap/Button'

import Copyright from './Copyright';
import { isAuthenticated } from '../auth';
import { read} from '../user/apiUser';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

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
    

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to='/shop'>Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-md-4'>
          <h2 className='mb-4'>Your cart summary: </h2>
          <div>
          <Button onClick={loadData} variant="outline-info">Apply Your {data.discount_coupon} Discount</Button>{' '}
          </div>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} discount1={data.discount_coupon}/>
        </div>
        <div className='col-md-2'></div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
