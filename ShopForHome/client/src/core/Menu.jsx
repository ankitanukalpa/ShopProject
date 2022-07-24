import React, { Fragment } from 'react';
import { Link, withRouter, forceUpdate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import { itemWishTotal } from './WishlistHelpers';

import { fade, makeStyles } from '@material-ui/core/styles';
// import AdminPanelSettingsIcon from '@material-ui/core/AdminPanelSettings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { Tooltip } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreIcon from '@material-ui/icons/Store';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import { pink } from '@mui/material/colors';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900', textDecoration: 'none' };
  } else {
    return { color: '#ffffff', textDecoration: 'none' };
  }
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'secondary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div style={{ backgroundColor: '#2c599d' }}>
        <MenuItem>
          <Link style={isActive(history, '/')} to='/'>
            <IconButton aria-label='Home' color='inherit'>
              <HomeIcon  />
            </IconButton>
            Home
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/shop')} to='/shop'>
            <IconButton aria-label='Shop' color='inherit'>
              <StorefrontIcon />
            </IconButton>
            Shop
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/cart')} to='/cart'>
            <IconButton aria-label='Cart' color='#2c599d'>
              <Badge badgeContent={itemTotal()} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
             Cart
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={isActive(history, '/wishlist')} to='/wishlist'>
            <IconButton aria-label='Wishlist' color='#2c599d'>
              <Badge badgeContent={itemWishTotal()} color='#2c599d'>
                <FavoriteIcon color='success' />
              </Badge>
            </IconButton>
            Wishlist
          </Link>
        </MenuItem>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <MenuItem>
            <Link
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              <IconButton aria-label='Dashboard' color='inherit'>
                <DashboardIcon />
              </IconButton>
              Dashboard
            </Link>
          </MenuItem>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <MenuItem>
            <Link
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              <IconButton aria-label='Dashboard' color='black'>
                <DashboardIcon />
              </IconButton>
              Dashboard
            </Link>
          </MenuItem>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <MenuItem>
              <Link style={isActive(history, '/signin')} to='/signin'>
                <IconButton aria-label='Signin' color='black'>
                  <AccountCircleIcon />
                </IconButton>
                Signin
              </Link>
            </MenuItem>

            <MenuItem>
              <Link style={isActive(history, '/signup')} to='/signup'>
                <IconButton aria-label='Signup' color='black'>
                  <PersonAddIcon />
                </IconButton>
                Signup
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={isActive(history, '/signup')} to='/signup'>
                <IconButton aria-label='Signup' color='black'>
                  <PersonAddIcon />
                </IconButton>
                Admin SignUp
              </Link>
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated() && (
          <MenuItem>
            <span
              style={{ cursor: 'pointer', color: 'black' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              <IconButton aria-label='Signout' color='black'>
                <ExitToAppIcon />
              </IconButton>
              Signout
            </span>
          </MenuItem>
        )}
      </div>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' style={{ background: 'white' }}>
        <Toolbar>
          <a href='/' style={{ color: '#2c599d' }}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='brand'
            >
              <StoreIcon style={{color:'#2c599d'}}/>
            </IconButton>
          </a>
          <a href='/' style={{ color: 'black', textDecoration: 'none' }}>
            <Typography className={classes.title} variant='h6' noWrap>
              Shop For Home
            </Typography>
          </a>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link style={isActive(history, '/')} to='/'>
              <Tooltip title="Home" placement='start-top'>
              <IconButton aria-label='Home' color='black'>
                <HomeIcon style={{color:'#2c599d'}}/>
              </IconButton>
              </Tooltip>
            </Link>

            <Link style={isActive(history, '/shop')} to='/shop'>
              <Tooltip title="Shop" placement='start-top'>
              <IconButton aria-label='Shop' color='black'>
                <StorefrontIcon style={{color:'#2c599d'}} />
              </IconButton>
              </Tooltip>
            </Link>

            <Link style={isActive(history, '/wishlist')} to='/wishlist'>
            <Tooltip title="Wishlist" placement='start-top'>
              <IconButton aria-label='Wishlist' color='black'>
                <Badge badgeContent={itemWishTotal()} color='secondary'>
                  <FavoriteIcon style={{color:'#2c599d'}} />
                </Badge>                
              </IconButton>
              </Tooltip>
            </Link>

            <Link style={isActive(history, '/cart')} to='/cart'>
            <Tooltip title="Cart" placement='start-top'>
              <IconButton aria-label='Cart' color='black'>
                <Badge badgeContent={itemTotal()} color='secondary'>
                  <ShoppingCartIcon  style={{color:'#2c599d'}}/>
                </Badge>
              </IconButton>
              </Tooltip>
            </Link>
           

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'
              >
                <Tooltip title="Dashboard" placement='start-top'>
                <IconButton aria-label='Dashboard' color='black'>
                  <DashboardIcon style={{color:'#2c599d'}}/>
                </IconButton>
                </Tooltip>
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                style={isActive(history, '/admin/dashboard')}
                to='/admin/dashboard'
              >
                <Tooltip title="Dashboard" placement='start-top'>
                <IconButton aria-label='Dashboard' color='black'>
                  <DashboardIcon style={{color:'#2c599d'}} />                   
                </IconButton>
                </Tooltip>
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, '/signin')} to='/signin'>
                <Tooltip title="SignIn" placement='start-top'>
                  <IconButton aria-label='Signin' color='black'>
                    <AccountCircleIcon style={{color:'#2c599d'}}/>                     
                  </IconButton>
                  </Tooltip>
                </Link>

                <Link style={isActive(history, '/signup')} to='/signup'>
                <Tooltip title="SignUp" placement='start-top'>
                  <IconButton aria-label='Signup' color='black'>
                    <PersonAddIcon style={{color:'#2c599d'}}/>                     
                  </IconButton>
                  </Tooltip>
                </Link>
                <Link style={isActive(history, '/adminsignup')} to='/adminsignup'>
                <Tooltip title="Admin SignUp" placement='start-top'>
                  <IconButton aria-label='Signup' color='black'>
                  <PersonAddIcon style={{color:'#2c599d'}}/>                   
                  </IconButton>
                  </Tooltip>
                </Link>
              </Fragment>
            )}

            {isAuthenticated() && (
              <span
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                <Tooltip title="Signout" placement='start-top'> 
                <IconButton aria-label='Signout' color='black'>
                  <ExitToAppIcon style={{color:'#2c599d'}}/>
                   
                </IconButton>
                </Tooltip>
              </span>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(MaterialAppBar);
