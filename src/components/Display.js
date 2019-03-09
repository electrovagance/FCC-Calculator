import React from 'react';

function Display(props) {
    return(
        <div id="display">
            {props.input.map((i, index) => (
                <span key={index}>{i}</span> 
                )
            )}
        </div>
                
    )
}

export default Display;