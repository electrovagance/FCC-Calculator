import React from 'react';

const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function Numbers() {
    return(
        <React.Fragment id="numbers">
            {numbers.map((number, index) => (
                <button key={index}>{number}</button>
            ))}
        </React.Fragment>
    )
}

export default Numbers;