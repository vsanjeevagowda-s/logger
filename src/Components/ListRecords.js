import React, { Component } from 'react';
import {
  Row,
  Col,
} from 'reactstrap';


class Record extends Component {
  constructor(props) {
    super(props);
    const { date, description, id } = props.record;
    this.state = {
      date: date,
      description: description,
      id: id,
      isEditRecordFormOpen: false,
    }
    this.handleEditForm = this.handleEditForm.bind(this);
  }

  handleEditForm() {
    this.setState({
      isEditRecordFormOpen: true,
    })
  }

  render() {
    const {
      id,
      date,
      description,
      isEditRecordFormOpen
    } = this.state;
    return (
      <Row key={id} className=''>
        <Col sm={12} className='py-2' >
          <div className='border p-2'>
            <div className='font-weight-bold clearfix'>
              {new Date(date).toLocaleDateString()}
              <span
                onClick={() => this.handleEditForm()}
                className='float-right cursor-pointer h5'><i className="fa fa-edit h4"></i></span>
            </div>
            {!isEditRecordFormOpen &&
              <div className='border py-2 px-1  description-div'>
                {description}
              </div>}
            {isEditRecordFormOpen &&
              <textarea
                className='w-100 border py-2 px-1  description-div'
                value={description} />}
          </div>
        </Col>
      </Row>
    )
  }
}


class ListRecords extends Component {

  render() {
    const {
      records,
    } = this.props;
    return records.map(record => {
      return <Record key={record.id} record={record} />
    })
  }
};


export default ListRecords;