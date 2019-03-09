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
const operatorRegEx = /x|\+|\/|-/ig;
// const operatorRegEx = /x|\+|\/|-|=|.|AC/ig;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: ['0']
    }
  }

  // function for checking for valid input and calling corresponding function
  input = (event) => {
    // save input in input variable
    const input = event.target.innerHTML;

    if (numRegEx.test(parseInt(input))) this.addNum(input);
    else if (input.match(operatorRegEx)) this.addOperator(input);
  }

  // function which adds entered numbers into state
  addNum = (num) => {
    const tempArr = this.state.inputArr;
    let currentPosition = this.state.inputArr.length - 1;
    const lastItem = tempArr.slice(-1)[0];
    const currentNum = tempArr[currentPosition];

    // check for first input and replaces default 0 value
    if (this.state.inputArr.length === 1 && this.state.inputArr[0] === '0') this.setState({ inputArr: [num]});
    // checks if last item of array was an operator
    else if (lastItem.match(operatorRegEx)) {
      tempArr[currentPosition+1] = num;
      this.setState({ inputArr: tempArr })
    }
    else {
      // adds new input to current number in array
      tempArr[currentPosition] = currentNum + num;
      // save new input in state
      this.setState({ inputArr: tempArr })
    }
  }

  addOperator = (operator) => {
    const tempArr = this.state.inputArr;
    const lastItem = tempArr.slice(-1)[0];
    console.log(lastItem)

    if (this.state.inputArr[0] === '0') return;
    else if (lastItem.match(operatorRegEx)) return;
    else {
      tempArr.push(operator);
      console.log(tempArr);
      this.setState({ inputArr: tempArr })
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
