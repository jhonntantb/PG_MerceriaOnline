import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from './routes';

//views
import Home from './views/Home/Home';
import ShopCart from './views/ShopCart/ShopCart';
import Product from './views/Product/Product';
import ProductCreation from './views/ProductCreation/ProductCreation';
import ProductUpdate from './views/ProductCreation/ProductUpdate';
import Landing from './views/Landing/Landing';
import ContactUs from './views/ContactUs/Map';

//components
import SignUpPage from './components/Authentication/SignUp/index';
import SignInPage from './components/Authentication/SignIn';
import Account from './components/Authentication/Account';
import PasswordForgetPage from './components/Authentication/PasswordForget';
import ProductList from './components/ProductList/ProductList';
import Navbar from './components/Nav/Navbar';
import Form from './components/Admin/FormDetail/FormCategory';
import Stock from './components/Admin/Stock/Stock.jsx';
import UsersAdmin from './components/Admin/Users/index';
import AboutUs from './components/AboutUs/AboutUs'
import CartForm from './views/CartForm/CartForm';
import CreateCheckoutButton from './components/MPago/index';
import NavAdmin from './components/Admin/NavAdmin/NavAdmin';
import Order from './components/Admin/Order/Order';
import OrderDetail from './components/Admin/Order/OrderDetail';
import AfterCheckout from './components/MPago/afterCheckout';
import AfterCheckoutRejected from './components/MPago/afterCheckout-reject';
import Shopping from './components/UserShop/Shopping';
import Wishlist from './views/Wishlist/Whislist';
import UserOrdenDetail from './components/UserShop/UserOrdenDetail';
import AccountConfirmation from './components/Authentication/Account/accountConfirmation';
import Index from './components/UserProfile';
import Office from './components/Admin/Office/Office';
import Turnero from './components/Turnero/Turnero';
import SearchAutoComplete from './components/Nav/SearchAutoComplete';


function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Navbar} />
      <Route exact path='/' component={Landing} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
  
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.PRODUCTS} component={ProductList} />
      <Route path={ROUTES.PRODUCT} component={Product} />
      <Route path={ROUTES.CART} exact component={ShopCart} />
      <Route path={ROUTES.CART_ORDER} component={CartForm} />
      <Route path='/productupdate/:id' component={ProductUpdate} />
      <Route path={ROUTES.CONTACT_US} component={ContactUs} />
      <Route path='/pagar' component={CreateCheckoutButton} />
      <Route path='/after-checkout' component={AfterCheckout} />
      <Route path='/after-checkout-reject' component={AfterCheckoutRejected} />

      <Route path={ROUTES.ADMIN} component={NavAdmin} />
      <Route path={ROUTES.MANAGE_USERS} component={UsersAdmin} />
      <Route exact path={ROUTES.STOCK} component={Stock} />
      <Route exact path={ROUTES.ORDER} component={Order} />
      <Route exact path={ROUTES.FORM} component={Form} />
      <Route exact path={ROUTES.PRODUCT_CREATION} component={ProductCreation} />
      <Route exact path={ROUTES.WISHLIST} component={Wishlist} />
      <Route exact path="/admin/orders/:id" component={OrderDetail} />
      <Route path={ROUTES.USER_SHOP} exact component={Shopping} />
      <Route path="/user/compras/:id" exact component={UserOrdenDetail} />
      <Route path='/AccountConfirmation' component={AccountConfirmation} />
      <Route path={ROUTES.USER_DATA} component={Index} />
      <Route exact path="/search_ac" component={SearchAutoComplete}/>
      <Route path={ROUTES.ADMIN_OFFICES} exact component={Office}/>
      <Route path="/user/turnero" exact component={Turnero}/>
      <Route path={ROUTES.ABOUT_US} component={AboutUs}/>
      
    </React.Fragment>
  )
}

export default App