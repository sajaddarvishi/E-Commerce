import React from 'react'
import {Spinner} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'


function Loader() {
  const { t } =useTranslation()

  return (
    <Spinner
       animation="border" 
       role="status"
       style={{
        height:'100px',
        width:'100px',
        margin:'auto',
        display:'block'
       }}
    >
      <span className='sr-only'>{t('Loading...')}</span>
    </Spinner>
  )
}

export default Loader
