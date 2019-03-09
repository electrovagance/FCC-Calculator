import React, { Component } from 'react';
import Display from './components/Display';
import ClearInput from './components/ClearInput';
import Operators from './components/Operators';
import Numbers from './components/Numbers';
import Decimal from './components/Decimal';
import Calculate from './components/Calculate';
import './App.css';

// regEx for numbers
const numRegEx = /\d/;
// regEx for all other buttons (operators, clear, and decimal)
const operatorRegEx = /x|\+|\/|-|=|.|AC/ig;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: ['0']
    }
  }

  // function for checking for valid inpud
  input = (event) => {
    const input = event.target.innerHTML;
    if (numRegEx.test(parseInt(input))) this.addNum(input);
    else if (input.match(operatorRegEx)) console.log('TODO')
  }

  // function which adds entered numbers into state
  addNum = (num) => {
    // check for first input and replaces default 0 value
    if (this.state.inputArr.length === 1 && this.state.inputArr[0] === '0') this.setState({ inputArr: [num]});
    else {
      const tempArr = this.state.inputArr;
      const currentPosition = this.state.inputArr.length -1;
      const currentNum = tempArr[currentPosition];

      // adds new input to current number in array
      tempArr[currentPosition] = currentNum + num;

      // save new input in state
      this.setState({ inputArr: tempArr})
    }
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
