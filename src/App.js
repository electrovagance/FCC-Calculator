import React, { Component } from 'react';
import Display from './components/Display';
import ClearInput from './components/ClearInput';
import Operators from './components/Operators';
import Numbers from './components/Numbers';
import Decimal from './components/Decimal';
import Calculate from './components/Calculate';
import './App.css';

const numRegEx = /\d/;
const operatorRegEx = /x+-\\/ig;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: ['0']
    }
  }

  //function for checking for valid inpud
  input = (event) => {
    const input = event.target.innerHTML;
    if (numRegEx.test(parseInt(input))) console.log(input);
    else if (operatorRegEx.test(input)) console.log('t')
  }

  componentDidMount = () => {
    document.getElementById('buttons').addEventListener('click', this.input)
  }

  componentWillUnmount = () => {
    document.removeEventListener(this.input)
  }

  render() {
    return (
      <div className="App" >
        <div id="calculator">
          <Display input={this.state.inputArr} />
          <section id="buttons">
            <ClearInput />
            <Operators />
            <Numbers />
            <Decimal />
            <Calculate />
          </section>
        </div>
      </div>
    );
  }

};

export default App;
