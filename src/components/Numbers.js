import React from 'react';

const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function Numbers() {
    return(
        <div id="numbers">
            <React.Fragment>
                {numbers.map((number, index) => (
                    <button key={index}>{number}</button>
                ))}
            </React.Fragment>
        </div> 

    )
}

export default Numbers;