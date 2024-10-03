import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { useTranslation } from 'react-i18next'

function ProductEditScreen({ match, history }) {
    
    const { t } = useTranslation()
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const [errorName, setErrorName] = useState('')
    const [errorBrand, setErrorBrand] = useState('')
    const [errorCategory, setErrorCategory] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()

        // Validation checks for required fields
        let valid = true;

        if (!name || name.trim() === '') {
            setErrorName('Product name is required')
            valid = false
        } else {
            setErrorName('')
        }

        if (!brand || brand.trim() === '') {
            setErrorBrand('Brand is required')
            valid = false
        } else {
            setErrorBrand('')
        }

        if (!category || category.trim() === '') {
            setErrorCategory('Category is required')
            valid = false
        } else {
            setErrorCategory('')
        }

        // If all validations pass, dispatch the update
        if (!valid) {
            return
        }

        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                {t('goback')}
            </Link>

            <FormContainer>
                <h1>{t('EditProduct')}</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>{t('Name1')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name ? name : ''}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                                {errorName && <Message variant='danger'>{errorName}</Message>}
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>{t('Price')}</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>{t('Image')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >
                                </Form.File>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <Form.Label>{t('Brand')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand ? brand : ''}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                                {errorBrand && <Message variant='danger'>{errorBrand}</Message>}
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>{t('Stock')}</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>{t('Category')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={category ? category : ''}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                                {errorCategory && <Message variant='danger'>{errorCategory}</Message>}
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>{t('Description')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary' disabled={!name.trim() || !brand.trim() || !category.trim()}>
                                {t('Update')}
                            </Button>

                        </Form>
                    )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
