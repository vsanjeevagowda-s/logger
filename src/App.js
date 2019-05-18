import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import {
  Container,
} from 'reactstrap';
import Header from './Components/Header';
import CreateForm from './Components/CreateForm';
import ListRecords from './Components/ListRecords';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateForm = this.handleCreateForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      date: new Date().toISOString().split('T')[0],
      description: '',
      records: [],
      isCreateFormOpen: false,
    }
  }

  async componentDidMount() {
    try {
      const url = 'http://192.168.1.4:3001/api/records/list'
      const resp = await fetch(url);
      if (resp.status !== 200) throw new Error('Failed to list');
      const data = await resp.json();
      this.setState({ records: data.resp });
    } catch (error) {
      alert(error);
    }
  }

  async handleSubmit() {
    const { date, description } = this.state;
    const body = {
      date,
      description
    }
    try {
      const url = 'http://192.168.1.4:3001/api/records/create';
      const resp = await fetch(url, {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      await resp.json();
      if (resp.status !== 201) throw new Error('Failed');
      this.setState({ isCreateFormOpen: false });
    } catch (error) {
      alert(error);
    }
  }

  async handleUpdate(body){
    try{
      const url = `http://192.168.1.4:3001/api/records/update/${body.id}`;
      const resp = await fetch(url, {
        method: 'put',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      await resp.json();
      if (resp.status !== 201) throw new Error('Failed');
    }catch(error){
      alert(error);
    }
  }

  handleChange(e) {
    try {
      this.setState({
        [e.target.name]: e.target.value,
      })
    } catch (error) {
      alert(error);
    }
  }

  handleCreateForm(flag) {
    this.setState({ isCreateFormOpen: flag })
  }

  handleEdit(){
    const { isEditRecordFormOpen } = this.state;
    this.setState({
      isEditRecordFormOpen: !isEditRecordFormOpen
    })
  }

  render() {
    const { 
      date, 
      description, 
      records, 
      isCreateFormOpen,
    } = this.state;
    return (
      <Container fluid className='container-div'>
        <Header />
        <ListRecords 
        records={records}
        handleUpdate={this.handleUpdate} />
        <i
          onClick={() => this.handleCreateForm(true)} className="fa fa-plus-circle fa-3x h1 add-record-span position-fixed"
        />
        {isCreateFormOpen &&
          <CreateForm
            date={date}
            description={description}
            handleCreateForm={this.handleCreateForm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />}
      </Container>
    );
  }
}

export default App;
