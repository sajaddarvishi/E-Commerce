import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { fetchCategories } from '../actions/productActions';  // Import the fetchCategories action
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    // Fetch categories from Redux store
    const productCategories = useSelector(state => state.productCategories);
    const { categories, loading, error } = productCategories;

    useEffect(() => {
        dispatch(fetchCategories());  // Fetch categories when the component loads
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header style={{ direction: 'rtl', backgroundColor: '#6AA84F' }}>
            <Navbar variant="dark" expand="lg" collapseOnSelect style={{ backgroundColor: '#6AA84F' }}>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>{t('ProShop')}</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '40px' }}>
                            <SearchBox />
                        </div>

                        <Nav className="mr-auto">
                            {/* Static title for categories dropdown */}
                            <NavDropdown title="دسته‌بندی کالاها" id='categories-dropdown'>
                                {loading && <NavDropdown.Item>Loading...</NavDropdown.Item>}
                                {error && <NavDropdown.Item>{error}</NavDropdown.Item>}
                                {categories && categories.map((category, index) => (
                                    <LinkContainer to={`/category/${category}`} key={index}>
                                        <NavDropdown.Item>{category}</NavDropdown.Item>
                                    </LinkContainer>
                                ))}
                            </NavDropdown>

                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i>{t('Login1')}</Nav.Link>
                            </LinkContainer>

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
                            ) : null}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>{t('Users')}</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>{t('Products')}</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>{t('Orders')}</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
