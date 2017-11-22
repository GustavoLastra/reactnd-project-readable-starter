import React, { Component } from 'react';
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Button } from 'reactstrap';
import '../App.css';

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

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
      <Menu
      id={ "sidebar" }
      className={ "my-menu" }
      isOpen={this.state.open}
      >
        <ul className="menu-list">
          <li className="menu-segment">Sort by</li>
          <li><a id="hot" className="menu-item" href="/">HOT</a></li>
          <li><a id="fresh" className="menu-item" href="/about">FRESH</a></li>
          <li className="menu-segment">Categories</li>
          <li><a id="awesome" className="menu-item" href="/awesome">AWESOME</a></li>
          <li><a id="funny" className="menu-item" href="/funny">FUNNY</a></li>
          <li><a id="food" className="menu-item" href="/food">FOOD</a></li>
          <li><a id="sports" className="menu-item" href="/sports">SCIENCE</a></li>
          <li><a onClick={ this.showSettings } className="menu-item" href="">SPORTS</a></li>
        </ul>
      </Menu>

        <header className="App-header">
          <img src={taco} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LordTaco</h1>
        </header>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
