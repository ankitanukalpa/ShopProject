import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getWishlist } from './WishlistHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Button from 'react-bootstrap/Button'

import Copyright from './Copyright';
import { isAuthenticated } from '../auth';
import { read} from '../user/apiUser';
import { colors } from '@material-ui/core';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getWishlist());
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
        <h2>Your wishlist has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToWishlistButton={false}
            wishlistUpdate={true}
            showRemoveProductButton={false}
            
            showremoveWishListButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your Wishlist is empty. <br /> <Link to='/shop' style={{textDecoration:'none' }}>Continue Shopping.</Link>
    </h2>
  );

  return (
    <Layout
      title='Wishlist'
      description='Manage your wishlist items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
   
      <Copyright />
    </Layout>
  );
};

export default Wishlist;
