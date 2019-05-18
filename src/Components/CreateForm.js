import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

const CreateForm = (props) => {
  const {
    date,
    description,
    handleCreateForm,
    handleChange,
    handleSubmit
  } = props;
  console.log('props =>', props);
  return (
    <Row className='border create-record-row position-fixed bg-light'>
      <Col className='create-record-col p-0'>
        <i className="fa fa-times-circle text-dark position-absolute create-form-close cursor-pointer" onClick={() => handleCreateForm(false)}></i>
        <div className='height-100'>
          <div className='height-20 border-bottom'>
            <input
              className='w-100 height-100 border-0'
              type='date'
              name='date'
              value={date}
              onChange={(e) => handleChange(e)} />
          </div>
          <div className='height-80'>
            <textarea
              className='w-100 height-100 border-0'
              value={description}
              name='description'
              placeholder='description...'
              onChange={(e) => handleChange(e)} />
          </div>
        </div>
        <i onClick={() => handleSubmit()}
          className="fa fa-save position-absolute text-dark save-icon cursor-pointer"></i>
      </Col>
    </Row>)
}

export default CreateForm;