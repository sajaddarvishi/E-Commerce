import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SearchBox() {
    const { t, i18n } = useTranslation();

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (keyword) {
                history.push(`/?keyword=${keyword}&page=1`)
            } else {
                history.push(history.location.pathname)
            }
        }
    }


    const isRTL = i18n.language === 'fa' || i18n.language === 'ar';

    return (
        <Form 
            onKeyPress={submitHandler} 
            inline 
            style={{
                display: 'flex', 
                alignItems: 'center', 
                direction: isRTL ? 'rtl' : 'ltr', 
                background: '#f5f5f5', 
                borderRadius: '25px', 
                padding: '5px', 
                border: 'none', 
                boxShadow: 'none' 
            }}
        >
            <i className='fas fa-search' style={{ margin: '0 10px', color: '#aaa' }}></i>

            <Form.Control
                type='text'
                name='q'
                placeholder={t('search')}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 p-1'
                style={{
                    border: 'none', 
                    background: 'transparent', 
                    outline: 'none', 
                    width: '100%', 
                    direction: isRTL ? 'rtl' : 'ltr',
                    boxShadow: 'none' 
                }}
            />
        </Form>
    )
}

export default SearchBox
