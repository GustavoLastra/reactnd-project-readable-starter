import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';





class App extends Component {

  state = {
    hamburgerOpen: false,
  }


  handleClick= () => {
      this.setState({
          hamburgerOpen: !this.state.open
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <HamburgerMenu
            isOpen={this.state.open}
            menuClicked={this.handleClick.bind(this)}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color='black'
            borderRadius={0}
            animationDuration={0.5}
        />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
