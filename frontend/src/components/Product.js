import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatPriceToPersian } from '../utils/priceFormatter';


function Product({product}) {
  const { t } = useTranslation();

  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} /> 
        </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title> 
        </Link>  
        
        <Card.Text as="div" >
          <div className='my-3' >
            <Rating value={product.rating} text={`${product.numReviews} ${t('Review')}`} color={'#f8e825'} />
          </div>

        </Card.Text>
        <Card.Text as="h3"  className="price" style={{ fontWeight: 'bold', fontSize: '14px' }} >
          {formatPriceToPersian(product.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
