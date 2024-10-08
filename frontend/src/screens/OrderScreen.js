import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { useTranslation } from 'react-i18next'
import { formatPriceToPersian } from '../utils/priceFormatter';
import { formatNumberToPersian } from '../utils/numberFormatter';


function OrderScreen({ match, history }) {

    const { t } =useTranslation()
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails
    
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
   
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
    
        if (!order || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, userInfo, successDeliver, history]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <div>
                    <h1>{t('Order')} {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{t('Shipping')}</h2>
                                    <p><strong>{t('Name')} </strong> {order.user.name}</p>
                                    <p><strong>{t('Email')} </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                    <p>
                                        <strong>{t('Address1')} </strong>
                                        {order.shippingAddress.address},  {order.shippingAddress.city}
                                        {'  '}
                                        {order.shippingAddress.postalCode},
                                {'  '}
                                        {order.shippingAddress.country}
                                    </p>
                                </ListGroup.Item>
                                {order.isDelivered ? (
                                        <Message variant='success'>{t('Deliveredon')} {order.deliveredAt}</Message>
                                    ) : (
                                            <Message variant='warning'>{t('NotDelivered')}</Message>
                                        )}

                                <ListGroup.Item>
                                    <h2>{t('PaymentMethod')}</h2>
                                    <p>
                                        <strong>{t('Method')} </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>{t('Paidon')} {order.paidAt}</Message>
                                    ) : (
                                            <Message variant='warning'>{t('NotPaid')}</Message>
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>{t('OrderItems')}</h2>
                                    {order.orderItems.length === 0 ? <Message variant='info'>
                                        {t('Order is empty')}
                            </Message> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {formatPriceToPersian((item.qty * item.price).toFixed(2))} = {formatPriceToPersian(item.price)} * {formatNumberToPersian(item.qty)} 

                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>{t('OrderSummary')}</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{t('Items1')}</Col>
                                            <Col>{formatPriceToPersian(order.itemsPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{t('Shipping1')}</Col>
                                            <Col>{formatPriceToPersian(order.shippingPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{t('Tax:')}</Col>
                                            <Col>{formatPriceToPersian(order.taxPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{t('Total1')}</Col>
                                            <Col>{formatPriceToPersian(order.totalPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            {t('MarkAsDelivered')}
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderScreen
