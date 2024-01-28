import React, { useState } from 'react';
import "../../App.css"
import DataService from '../../service/DataService';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Details = props => {
    let [backGround, setBackGround] = useState("w details")
    
    if (props.status.white && backGround === "bl details"){
        setBackGround("w details")
    } else if (!props.status.white && backGround === "w details"){
        setBackGround("bl details")
    }

    const undo = () => {
        DataService.undo(props.gameId)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            window.alert(err.response.data.errMessage)
        })
    }

    return ( 
        <div className={backGround} >  

{/* maybe {props.status.active && props.status.currentPlayer && <h2>It is {props.status.currentPlayer}'s turn</h2> }
            {!props.status.active && 
            <div>           
                <h1 className="check">Game Over!</h1>
                <button className="tooltip" onClick={props.restart}>RESTART<span className="tooltiptext">Play another game vs the same opponent</span></button>
                <button className="tooltip" onClick={props.newGame}>NEW GAME<span className="tooltiptext">Play a game vs a different opponent</span></button>
            </div>}       */}
            <Link to="/">Home</Link>
            {/* {<button className="detailButtons" onClick={() => props.toggleMove}>Home</button> }                 */}

            {props.status.active && props.status.currentPlayer ? <h2>It is {props.status.currentPlayer}'s turn</h2> :
            <div>           
                <h1 className="check">Game Over!</h1>
                <button className="tooltip" onClick={props.restart}>PLAY SAME OPPONENT<span className="tooltiptext">Play another game vs the same opponent</span></button>
                <button className="tooltip" onClick={props.newGame}>PLAY NEW OPPONENT<span className="tooltiptext">Play a game vs a different opponent</span></button>
            </div>}                          
          
            {/* <p>{props.status.team.length} Pieces</p> */}
            {/* <button className="detailButtons" onClick={props.unselect}>Display Moves</button>            
            <button className="detailButtons" onClick={props.unselect}>Count Pieces</button>         */}                       
            {props.status.active &&
            <div>                
                {/* {props.isMove ? <button className="detailButtons" onClick={props.specialMove}>Special Move</button> : <button className="detailButtons" onClick={() => props.endTheGame(true)}>Forfeit</button> } */}
                {props.isMove ? <button className="detailButtons" onClick={props.unselect}>Unselect Piece</button> : <button className="detailButtons" onClick={() => props.endTheGame(false)}>Request Draw</button> } 
                {/* {props.isMove ? <button className="detailButtons" onClick={props.toggleMove}>Toggle Sidebar</button> : props.undo && <button className="detailButtons" onClick={() => undo()}>Undo</button> }                 */}
                {props.isMove ? <button className="detailButtons" onClick={props.toggleMove}>Toggle Sidebar</button> :  <button className="detailButtons" onClick={() => props.endTheGame(true)}>Forfeit Game</button> }                

                {/* {props.status.check && <h1 className="check">You must move out of check!</h1>}                 */}
            </div> }
            
        </div>
     );
}
 
export default Details;