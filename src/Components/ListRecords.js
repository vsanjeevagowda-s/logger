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
      displayDescription: description,
      id: id,
      isEditRecordFormOpen: false,
    }
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  handleEditForm(flag) {
    this.setState({
      isEditRecordFormOpen: flag,
    })
  };

  handleInput(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  onUpdateClick(id){
    const { description } = this.state;
    const { handleUpdate } = this.props;
    const data = {
      description,
      id,
    }
    const res = window.confirm('Are you sure?')
    if (!res) return;
    handleUpdate(data);
    this.setState({
      displayDescription: description,
      isEditRecordFormOpen: false,
    })
  }

  render() {
    const {
      id,
      date,
      description,
      displayDescription,
      isEditRecordFormOpen
    } = this.state;
    return (
      <Row key={id} className=''>
        <Col sm={12} className='py-2' >
          <div className='border p-2'>
            <div className='font-weight-bold clearfix'>
              {new Date(date).toLocaleDateString()}
              <span
                className='float-right cursor-pointer h5'>
                { 
                  isEditRecordFormOpen &&
                  <i 
                  onClick={() => this.onUpdateClick(id)} 
                  className="fa fa-save mr-4" />
                }
                {
                  isEditRecordFormOpen &&
                  <i 
                  onClick={() => this.handleEditForm(false)}
                  className="fa fa-times-circle" />
                }
                {
                  !isEditRecordFormOpen &&
                  <i 
                  onClick={() => this.handleEditForm(true)}
                  className="fa fa-edit h4" />
                }
              </span>
            </div>
            {!isEditRecordFormOpen &&
              <div 
              className='border py-2 px-1  description-div'>
                {displayDescription}
              </div>}
            {isEditRecordFormOpen &&
              <textarea
                onChange={(e) => this.handleInput(e)}
                className='w-100 border py-2 px-1'
                rows={10}
                name='description'
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
      handleUpdate,
    } = this.props;
    return records.map(record => {
      return <Record handleUpdate={handleUpdate} key={record.id} record={record} />
    })
  }
};


export default ListRecords;