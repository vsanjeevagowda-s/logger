import React from 'react'
import {
  Row,
  Col
} from 'reactstrap';

export default function Header() {
  return (
    <Row className='py-2 text-light bg-dark'>
      <Col sm={12} xs={12} className='h6'>
          Logger
      </Col>
    </Row>
  )
}
