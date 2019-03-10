import React from 'react';

function Display(props) {
    return(
        <div id="display">
            {props.input.map((i, index) => (
                <p key={index}>{i}</p> 
                )
            )}
        </div>
                
    )
}

export default Display;