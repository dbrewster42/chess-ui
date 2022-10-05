import React, { useState } from 'react';
import "./Board.css"

const Square = props => {
    let [ squareB, setSquareB ] = useState(props.squareStyle);
    if (!props.isMove && squareB === "squares b"){
        setSquareB(props.squareStyle);
        //console.log("goodbye", props.i, props.j, props.isMove)
    }

    const changeBackground = e => {        
        setSquareB('squares b'); 
        //console.log("hi", props.i, props.j, props.isMove)
        props.selectPiece(e);
    }

    // const returnBackground = e => {
    //     setClicked(true);
    //     setSquareB(props.squareStyle)
    //     props.selectMove(e);
    // }

    return ( 
        <div id={props.i * 10 + props.j} className={squareB}  onClick={props.isMove ? props.selectMove : props.thisPiece !== null ? changeBackground : undefined  }>
            { (props.thisPiece != null) &&
                <img src={props.image}
                    className="icons"
                    alt="chess piece" />    
            }
        </div>
     );
}
 
export default Square;