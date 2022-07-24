import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

import Button from '@material-ui/core/Button';

import CardM from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { addItem, updateItem, removeItem } from './cartHelpers';

import { addWishItem,updateWishItem,removeWishItem } from './WishlistHelpers';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:'#f8eeec',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: '100px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card = ({
  product,
  showViewProductButton = true,
  showAddToWishButton = true,
  showAddToCartButton = true,
  showWishList= true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showremoveWishListButton = false,
  setRun = (f) => f, 
  run = undefined, 
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className='mr-2'>
          

          <button type="button" class="btn btn-dark my-3">View Product</button>
        </Link>
      )
    );
  };
 

  const addToCart = () => {

    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button onClick={addToCart} variant='outlined' color='info'>
          Add to cart
        </Button>
      )
    );
  };

  const addToWishlist = () => {
 
    addWishItem(product, setRedirect(true));
  };

  const wRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/wishlist' />;
    }
  };

  const showAddToWishBtn = (showAddToWishlistButton) => {
    return (
      showAddToWishlistButton && (
        
        <Link href={`/wishlist`} className='mr-2'>
          <button type="button" onClick={addToWishlist} className="btn btn "><FavoriteIcon style={{color: pink[500]}}/></button>
      </Link>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 10 ? (
      <span className='badge badge-info'>In Stock </span>
    ) :quantity > 0 ? (
      <span className='badge badge-danger'>Hurry Up</span>
    ) :(
      <span className='badge badge-danger'>Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); 
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='mt-2'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
 

  const removeWishListButton = (showremoveWishListButton ) => {
    return (
      showremoveWishListButton  && (
        <Button
          onClick={() => {
            removeWishItem(product._id);
            setRun(!run); 
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove
        </Button>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); 
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </Button>
      )
    );
  };

  

  const classes = useStyles();

  return (
   
    <Container className={classes.cardGrid} maxWidth='md' backgroundColor='#fb9b50'>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card}>
            {shouldRedirect(redirect)}
            <ShowImage item={product} url='product' />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' component='h2'>
                {product.name}
              </Typography>
              <Typography className={classes.productDescription}>{product.description.substring(0, 100)}</Typography>
              <p className='black-10'>Price: ₹{product.price}</p>
              <p className='black-9'>
                Category: {product.category && product.category.name}{' '}
              </p>{' '}
              <p className='black-8'>
                Added on {moment(product.createdAt).fromNow()}{' '}
              </p>
              {showStock(product.quantity)}
              <br></br>
              <span>
                {showViewButton(showViewProductButton)}
                {showAddToCartBtn(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showAddToWishBtn(showAddToWishButton)}  
                {removeWishListButton(showremoveWishListButton)}
              </span>
              {showCartUpdateOptions(cartUpdate)}
            </CardContent>
          </CardM>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
