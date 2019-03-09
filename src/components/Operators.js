import React from 'react';

const operators = ['/', 'x', '-', '+'];

function Operators() {
    return(
        <div id="operators">
            <React.Fragment>
                {operators.map((number, index) => (
                    <button key={index}>{number}</button>
                ))}
            </React.Fragment>
        </div>
        
    )
}

export default Operators;