// File: /mnt/data/App.js
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import CategoryScreen from './screens/CategoryScreen';

function App() {
  useEffect(() => {
    document.documentElement.lang = 'fa';  // Set language to Farsi (Persian)
    document.documentElement.dir = 'rtl';  // Set direction to RTL globally
    document.body.classList.add('rtl');    // Apply RTL class to body for styling
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="py-3 main-content" style={{ direction: 'rtl', textAlign: 'right' }}>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/category/:categoryName' component={CategoryScreen} />
            <Route path='/cart/:id?' component={CartScreen} />

            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />

            <Route path='/admin/productlist' component={ProductListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

            <Route path='/admin/orderlist' component={OrderListScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
