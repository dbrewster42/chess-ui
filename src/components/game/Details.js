import React, { useState } from 'react';
import "../../App.css"
import DataService from '../../service/DataService';
import { useHistory } from 'react-router-dom';

const Details = props => {
    //console.log(props.status);
    let [backGround, setBackGround] = useState("w details")
    const history = useHistory();
    
    if (props.status.white && backGround === "bl details"){
        setBackGround("w details")
    } else if (!props.status.white && backGround === "w details"){
        setBackGround("bl details")
    }

    const undo = () => {
        DataService.undo(props.gameId)
        .then(res => {
            console.log(res);
            //props.setTheBoard(res.data); //todo
            // props.changeTurn();
        })
        .catch(err => {
            console.log(err);
            window.alert(err.response.data.errMessage)
        })
    }

    const restart = () => {
        DataService.restartGame(props.gameId)
        .then(res => {
            console.log(res);
            // let gameId = res.data.id;
            // props.setTheBoard(res.data);
            // // props.changeTurn(true);
            history.push(`/game/${res.data.id}`);
        })
        .catch(err => {
            console.log(err);
            window.alert(err.response.data.message)
            // toggleModal(err.response.data.message) 
        })
    }

    const newGame = () => {
        history.push('/');
    }

    return ( 
        <div className={backGround} >  
            {props.status.active ? <h2>It is {props.status.currentPlayer}'s turn</h2> :
            <div>           
                <h1 className="check">Game Over!</h1>
                <button className="tooltip" onClick={restart}>RESTART<span className="tooltiptext">Play another game vs the same opponent</span></button>
                <button className="tooltip" onClick={newGame}>NEW GAME<span className="tooltiptext">Play a game vs a different opponent</span></button>
            </div>}                          
                       
            {/* <p>{props.status.team.length} Pieces</p> */}
            {/* <button className="detailButtons" onClick={props.unselect}>Display Moves</button>            
            <button className="detailButtons" onClick={props.unselect}>Count Pieces</button>         */}                       
            {props.status.active &&
            <div>                
                {/* {props.isMove ? <button className="detailButtons" onClick={props.specialMove}>Special Move</button> : <button className="detailButtons" onClick={() => props.endTheGame(true)}>Forfeit</button> } */}
                {props.isMove ? <button className="detailButtons" onClick={props.unselect}>Unselect Piece</button> : <button className="detailButtons" onClick={() => props.endTheGame(false)}>Request Draw</button> } 
                {props.isMove ? <button className="detailButtons" onClick={props.toggleMove}>Toggle Sidebar</button> : props.undo && <button className="detailButtons" onClick={() => undo()}>Undo</button> }                
                {/* {props.status.check && <h1 className="check">You must move out of check!</h1>}                 */}
            </div> }
            
        </div>
     );
}
 
export default Details;