import React, { Component } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import Vigenere from './pages/vigenere';
import AutoVigenere from './pages/auto-key-vigenere';
import ExtVigenere from './pages/ext-vigenere';
import Affine from './pages/affine';
import Playfair from './pages/playfair';
import Hill from './pages/hill';
import Substitution from './pages/substitution';
import Permutation from './pages/permutation';
import { Container } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible : 1
    }
  }

  render(){
    return (
      <div>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand>Dripto</Navbar.Brand>
            <Nav className="me-auto">
              <Button variant="dark" onClick={() => this.setState({visible: 1})}>
                Vigenere
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 2})}>
                Auto-Key Vigenere
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 3})}>
                Extended Vigenere
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 4})}>
                Affine Cypher
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 5})}>
                Playfair Cypher
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 6})}>
                Hill Cypher
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 7})}>
                Substitution
              </Button>
              <Button variant="dark" onClick={() => this.setState({visible: 8})}>
                Permutation
              </Button>
            </Nav>
          </Container>
        </Navbar>
        
        <Container>
          {this.state.visible === 1 ? <Vigenere /> :
          this.state.visible === 2 ? <AutoVigenere /> :
          this.state.visible === 3 ? <ExtVigenere /> :
          this.state.visible === 4 ? <Affine /> :
          this.state.visible === 5 ? <Playfair /> :
          this.state.visible === 6 ? <Hill /> :
          this.state.visible === 7 ? <Substitution /> :
          this.state.visible === 8 ? <Permutation /> :
          null}
        </Container>
      </div>
    );
  }
}

export default App;
