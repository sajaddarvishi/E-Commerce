import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col } from 'react-bootstrap';

function CategoryScreen() {
    const { categoryName } = useParams();  // Extract category name from the URL

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts('', categoryName));  // Fetch products for this category
    }, [dispatch, categoryName]);

    return (
        <div>
            <h1>Products in "{categoryName}"</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.length === 0 && <Message variant='info'>No products found in this category</Message>}
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default CategoryScreen;
