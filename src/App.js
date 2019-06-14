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

const ROOT_URL='http://localhost:3001/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateForm = this.handleCreateForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onSearchKeyChange = this.onSearchKeyChange.bind(this);
    this.getSearchRecords = this.getSearchRecords.bind(this);
    this.apicallOnTimeOut = this.apicallOnTimeOut.bind(this);
    this.fetchRecords = this.fetchRecords.bind(this);
    this.searchKeySetTimeOutCtrl = ''
    this.state = {
      date: new Date().toISOString().split('T')[0],
      description: '',
      records: [],
      isCreateFormOpen: false,
      searchKey: '',
    }
  }

  apicallOnTimeOut(fun, params) {
    if (this.searchKeySetTimeOutCtrl) clearTimeout(this.searchKeySetTimeOutCtrl)
    this.searchKeySetTimeOutCtrl = setTimeout(() => {
      fun(params);
    }, 500);
  }

  onSearchKeyChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value.length <= 0) {
      this.apicallOnTimeOut(this.fetchRecords);
    } else {
      this.apicallOnTimeOut(this.getSearchRecords, e.target.value);
    }
  }

  async getSearchRecords(searchKey){
    try {
      const url = `${ROOT_URL}/records/search?key=${searchKey}`
      const resp = await fetch(url);
      if (resp.status !== 200) throw new Error('Failed to list');
      const data = await resp.json();
      this.setState({ records: data.resp });
    } catch (error) {
      alert(error);
    }
  }

  async fetchRecords(){
    try {
      const url = `${ROOT_URL}/records/list`
      const resp = await fetch(url);
      if (resp.status !== 200) throw new Error('Failed to list');
      const data = await resp.json();
      this.setState({ records: data.resp });
    } catch (error) {
      alert(error);
    }
  }

  componentDidMount() {
    this.fetchRecords();
  }

  async handleSubmit() {
    const { date, description } = this.state;
    const body = {
      date,
      description
    }
    try {
      const url = `${ROOT_URL}/records/create`
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
      const url = `${ROOT_URL}/records/update/${body.id}`
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
      searchKey,
    } = this.state;
    return (
      <Container fluid className='container-div'>
        <Header searchKey={searchKey} onSearchKeyChange={this.onSearchKeyChange}/>
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
