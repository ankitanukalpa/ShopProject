import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Wishlist from './core/Wishlist';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import NotFound from './core/NotFound';
import SaleReport from './admin/SaleReport';
import Stocks from './admin/Stocks';
import manageUser from './admin/ManageUser';
import updateUser from './admin/UpdateUser';
import ManageDiscount from './admin/ManageDiscount';
import UpdateDiscount from './admin/UpdateDiscount';
import BulkUpload from './admin/BulkUpload';
import AdminSignUp from './user/AdminSignUp';




const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        {/* <Route path='/sale' component={SaleReport} exact /> */}
        <Route path='/bulkupload' component={BulkUpload} exact />
        <Route path='/manageUser' component={manageUser} exact />
        <Route path='/updateUser/:userId' component={updateUser} exact />
        <Route path='/updateDiscount/:userId' component={UpdateDiscount} exact />
        {/* <Route path='/stocks' component={Stocks} exact /> */}
        <Route path='/shop' component={Shop} exact />
        <Route path='/signin' component={Signin} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/adminsignup' component={AdminSignUp} exact />
        <PrivateRoute path='/user/dashboard' component={Dashboard} exact />
        <AdminRoute path='/admin/dashboard' component={AdminDashboard} exact />
        <AdminRoute path='/create/category' component={AddCategory} exact />
        <AdminRoute path='/create/product' component={AddProduct} exact />
        <Route path='/product/:productId' component={Product} exact />
        <Route path='/cart' component={Cart} exact />
        <Route path='/wishlist' component={Wishlist} exact />
        <AdminRoute path='/admin/orders' component={Orders} exact />
        <PrivateRoute path='/profile/:userId' component={Profile} exact />
        <AdminRoute path='/admin/products' component={ManageProducts} exact />
        <AdminRoute
          path='/admin/product/update/:productId'
          component={UpdateProduct}
          exact
        />
        <AdminRoute path='/admin/bulkupload' component={BulkUpload} exact />
        <AdminRoute path='/admin/stocks' component={Stocks} exact />
        <AdminRoute path='/admin/saleReport' component={SaleReport} exact />
        <AdminRoute path='/admin/manageUser' component={manageUser} exact />
        <AdminRoute path='/admin/manageDiscount' component={ManageDiscount} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
