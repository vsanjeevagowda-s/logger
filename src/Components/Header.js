import React from 'react'
import {
  Row,
  Col,
  InputGroup,
  Input,
} from 'reactstrap';

export default function Header({ searchKey, onSearchKeyChange }) {
  return (
    <Row className='py-2 text-light bg-dark'>
      <Col className='h6 text-center' sm={1} xs={12}>
        Logger
        </Col>
      <Col />
      <Col className='text-right' sm={5} xs={12}>
        <InputGroup>
          <Input placeholder="search" name='searchKey' value={searchKey} onChange={(e) => onSearchKeyChange(e)} />
        </InputGroup>
      </Col>
    </Row>
  )
}
