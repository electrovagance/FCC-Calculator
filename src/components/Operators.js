import React from 'react';

const operators = ['/', 'x', '-', '+'];

function Operators() {
    return(
        <React.Fragment id="numbers">
            {operators.map((number, index) => (
                <button key={index}>{number}</button>
            ))}
        </React.Fragment>
    )
}

export default Operators;