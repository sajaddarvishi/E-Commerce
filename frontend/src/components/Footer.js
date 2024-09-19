import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ backgroundColor: '#2c2c2c', color: '#fff', padding: '20px 0' }}>
      <Container>
        <Row>
          
          <Col md={6} className='text-center text-md-left mb-3 mb-md-0'>
            <h5  style={{ letterSpacing: 'normal',color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{t('FollowUs')}</h5>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' style={{ margin: '0 10px' }}>
              <i className="fab fa-twitter" style={{ fontSize: '30px', color: '#fff' }}></i>
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' style={{ margin: '0 10px' }}>
              <i className="fab fa-instagram" style={{ fontSize: '30px', color: '#fff' }}></i>
            </a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' style={{ margin: '0 10px' }}>
              <i className="fab fa-linkedin" style={{ fontSize: '30px', color: '#fff' }}></i>
            </a>
          </Col>
          
          <Col md={6} className='text-center text-md-right'>
            <h5 style={{ letterSpacing: 'normal', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{t('ContactUs')}</h5>
            <p >{t('Addressf')}</p>
            <p>
              <i className="fas fa-phone"></i> {t('Phonef')} | <i className="fas fa-envelope"></i> {t('Emailf')}
            </p>
            <p>
              {t('LegalInquiries')}
            </p>
          </Col>
        </Row>

        <Row className='mt-4'>
      

          
          <Col md={6} className='text-center text-md-right'>
            <p>{t('AllRightsReserved')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
