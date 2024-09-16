import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { useTranslation } from 'react-i18next';
import { getDirection } from '../utils/languageUtils';  // Import for RTL/LTR

function Header() {
    const { t } = useTranslation();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    // Language switching logic
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'fa'); // Default to 'fa' (Persian)
    const direction = getDirection(language);

    // Update the `dir` attribute of the HTML document dynamically
    useEffect(() => {
        document.documentElement.setAttribute('dir', direction);
    }, [direction]);

    // Save the language preference in localStorage
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    // Toggle language between 'fa' and 'en'
    const handleLanguageToggle = () => {
        setLanguage(language === 'fa' ? 'en' : 'fa');
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>{t('ProShop')}</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>{t('Cart')}</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>{t('Profile')}</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>{t('Logout')}</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>{t('Login1')}</Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>{t('Users')}</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>{t('Products')}</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>{t('orders')}</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                            {/* Language toggle button */}
                            <button 
                                onClick={handleLanguageToggle} 
                                className="btn btn-sm btn-light ml-2">
                                {language === 'fa' ? 'EN' : 'FA'}
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
