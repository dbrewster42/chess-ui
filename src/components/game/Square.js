import React, { useState } from 'react';
import "./Board.css"


const Square = props => {
    let [squareB, setSquareB] = useState(props.squareStyle);
    if (!props.isMove && squareB === "squares b"){
        console.log(props)
        setSquareB(props.squareStyle);
    }

    const selectPiece = e => {        
        setSquareB('squares b'); 
        props.selectPiece(e);
    }

    return ( 
        <div id={props.id} className={squareB}  onClick={props.isMove ? props.selectMove : props.image !== null ? selectPiece : undefined  }>
            { (props.image != null) &&
                <img src={props.image}
                    className="icons"
                    alt="chess piece" />    
            }
        </div>
     );
}
 
export default Square;