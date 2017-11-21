import React, { Component } from 'react';
import logo from './logo.svg';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Button } from 'reactstrap';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick() {
	   this.setState({
		     open: !this.state.open
	      });
  }
  showSettings (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
      <Menu
      id={ "sidebar" }
      className={ "my-menu" }
      isOpen={this.state.open}
      >
        <ul>
          <li><a id="home" className="menu-item" href="/">Home</a></li>
          <li><a id="about" className="menu-item" href="/about">About</a></li>
          <li><a id="contact" className="menu-item" href="/contact">Contact</a></li>
          <li><a onClick={ this.showSettings } className="menu-item" href="">Settings</a></li>
        </ul>
      </Menu>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">

          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
