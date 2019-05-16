import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      date: new Date().toISOString().split('T')[0],
    }
  }

  handleChange(e) {
    debugger
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { date, description } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">DATE:</Label>
                <Input
                  onChange={(e) => this.handleChange(e)}
                  value={date}
                  className='font-size'
                  type="date"
                  name="date" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">DESCRIPTION:</Label>
                <Input
                  value={description} className='font-size'
                  type="textarea"
                  rows={10}
                  name="date" />
              </FormGroup>
            </Form>
            <Button color="secondary" size="sm" block>SAVE</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
