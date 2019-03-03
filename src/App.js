import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import ClearInput from './components/ClearInput';
import Operators from './components/Operators';
import Numbers from './components/Numbers';
import Decimal from './components/Decimal';
import Calculate from './components/Calculate';
import './App.css';

function App() {
  // declare state here
  const [inputArr, setInputArr] = useState([5, '+', 6]);

  //function for checking for valid inpud
  const input = () => {
    console.log(test);
  }

  // function for listening to input
  const handleInput = () => {
    useEffect(() => {
      document.getElementById('buttons').document.addEventListener('onclick', input);

      return () => {
        document.removeEventListener(input)
      }
    })
  }
  
    return (
    <div className="App">
      <div id="calculator">
        <Display input={inputArr}/>
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
};

export default App;
