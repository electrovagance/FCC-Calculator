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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: ['0']
    }
  }

  // function for checking  valid input and calling corresponding function
  input = (event) => {
    // save input in input variable
    const input = event.target.innerHTML;

    if (event.target.nodeName === 'BUTTON') {
      if (input === 'AC') this.clearInput();
      else if (numRegEx.test(parseFloat(input))) this.addNum(input);
      else if (input.match(operatorRegEx)) this.addOperator(input);
      else if (input === '.') this.addDecimal();
      else if (input === '=') this.getResult();
    }
  }

  // according to PEMDAS (elemtary school nostalgia!)
  getResult = () => {
    let tempArr = this.state.inputArr;
    let newArr = [];
    let result = 0;
    let firstNum;
    let secondNum;
    let multidivregex = /x|\//ig;
    let testForMultiplicatonOrDivision;

    // loop through array and do all multiplicatons and divisions first
    do {
      for (let i = 0; i < tempArr.length-1; i++) {
        firstNum = parseFloat(tempArr[i-1]);
        secondNum = parseFloat(tempArr[i+1]);

        if (tempArr[i] === '/' || tempArr[i] === 'x') {
          // get result
          if (tempArr[i] === '/') result = firstNum / secondNum;
          else if (tempArr[i] === 'x') result = firstNum * secondNum;

          // remove calculated numbers in array and save result instead
          tempArr.splice(i - 1, 2);
          tempArr[i - 1] = result.toString();
        }
      }

      //check if any multiplications and/or divisions are left to repeat do while loop
      testForMultiplicatonOrDivision = tempArr.map(currentItem => currentItem).filter(currentItem => currentItem.match(multidivregex));
      // console.log(tempArr + ' ' + testForMultiplicatonOrDivision)
    } while (testForMultiplicatonOrDivision.length > 0);

    result = tempArr[0];
    result = parseFloat(result);

    // time to calculate additions and subtractions!
    for (let i = 0; i < tempArr.length; i++) {
      firstNum = parseFloat(tempArr[i + 1]);

      if (tempArr[i] === '+') {
        result = result + firstNum;
      }
      else if (tempArr[i] === '-') {
        result = result - firstNum;
      }


    // check if result has a decimal number and formats output accordingly
    }
    if (Number.isInteger(result)) {
      result = result.toString();
      newArr[0] = result;
    } 
    else {
      console.log(result)
      result = parseFloat(result.toFixed(3));
      console.log(result)
      newArr[0] = result.toString();
    }
    this.setState({ inputArr: newArr })
  }
  
  clearInput = () => {
    this.setState({ inputArr: ['0'] })
  }

  addDecimal = () => {
    let tempArr = this.state.inputArr;
    let currentPosition = this.state.inputArr.length - 1;
    const lastItem = tempArr.slice(-1)[0];

    if (this.state.inputArr.length === 1 && this.state.inputArr[0] === '0') {
      tempArr = ['0.']
      this.setState({ inputArr: tempArr })
    }
    else if (lastItem.match(operatorRegEx)) {
      tempArr[currentPosition + 1] = '0.';
      this.setState({ inputArr: tempArr })
    }
    else if (lastItem.indexOf('.') !== -1) {
      return
    }
    else {
      tempArr[currentPosition] = lastItem + '.';
      this.setState({ inputArr: tempArr })
    }
    this.scrollToBottom();
  }

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
    
    this.scrollToBottom();
  }

  addOperator = (operator) => {
    const tempArr = this.state.inputArr;
    const lastItem = tempArr.slice(-1)[0];

    if (this.state.inputArr[0] === '0') return;
    else if (lastItem.match(operatorRegEx)) return;
    else {
      if (lastItem === '0.') {
        tempArr.pop();
        tempArr.push('0');
      }
      tempArr.push(operator);
      this.setState({ inputArr: tempArr })
    }

    this.scrollToBottom();
  }

  scrollToBottom = () => {
    let display = document.getElementById('display');
    display.scrollTop = display.scrollHeight;
  }

  componentDidMount = () => {
    document.getElementById('buttons').addEventListener('click', this.input);
  }

  componentWillUnmount = () => {
    document.removeEventListener(this.input);
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
