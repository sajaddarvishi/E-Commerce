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

// Import for React hooks
import { useState, useEffect } from 'react'; // <-- Import useState and useEffect from React

// Import for styled-components and utilities
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { getDirection } from './utils/languageUtils';  // Utility function to determine RTL or LTR

// Global styles that depend on the theme direction (RTL or LTR)
const GlobalStyle = createGlobalStyle`
  body {
    direction: ${(props) => props.theme.direction};
    text-align: ${(props) => (props.theme.direction === 'rtl' ? 'right' : 'left')};
  }
`;

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'fa'); // Default to 'fa' (Persian) or saved language from localStorage

  const direction = getDirection(language); // Determine direction based on language

  // Update the `dir` attribute of the HTML document dynamically
  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  return (
    <ThemeProvider theme={{ direction }}>
      <GlobalStyle />
      <Router>
        <Header />
        <main className="py-3">
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
            <Route path='/cart/:id?' component={CartScreen} />

            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />

            <Route path='/admin/productlist' component={ProductListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

            <Route path='/admin/orderlist' component={OrderListScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
