import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SearchBox() {
    const { t } = useTranslation();

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.location.pathname)
        }
    }

    return (
        <Form 
            onSubmit={submitHandler} 
            inline 
            style={{ display: 'flex', alignItems: 'center', direction: 'ltr' }}
        >
         
            <Button
                type='submit'
                variant='outline-success'
                className='p-1'
                style={{ marginRight: '10px' }}  
            >
                {t('جستجو')}
            </Button>

            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 p-1'
                style={{ width: '300px' }} 
            />
        </Form>
    )
}

export default SearchBox
