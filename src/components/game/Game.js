import React, { useState } from 'react';
import "./Board.css"
import DataService from '../../service/DataService';
import Details from './Details';
import MovesList from './MovesList';
import Board from './Board';
import Modal from "react-modal";
import { useParams } from "react-router-dom";


const Game = (props) => { 
    let [allMoves] = useState(props.allMoves);
    let [possibleMoves, setPossibleMoves] = useState([]) 
    let [isMove, setIsMove] = useState(false);
    let [start, setStart] = useState(88);
    let [isWhite, setIsWhite] = useState(true);
    // const [whitePlayer] = useState(props.data.whitePlayerName);
    // const [blackPlayer] = useState(props.data.blackPlayerName);
    // let [pieces, setPieces] = useState(props.data.pieces);
    let [status, setStatus] = useState(props.status);
    let [errorMessage, setErrorMessage] = useState('');
    const [moves, setMoves] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [showCheck, setShowCheck] = useState(true);    
    // const [undo] = useState(props.undo);
    //console.log(status);
    let [showMoves, setShowMoves] = useState(false);   
    let [autoToggle, setAutoToggle] = useState(true);
    const params = useParams();    
    const gameId = params.gameId;    

    if (!status.active && showCheck){
        setShowCheck(false);
        toggleModal(status.message);
    } else if (status.check && showCheck){
        setShowCheck(false);
        toggleModal("CHECK!");
    }
   
    if ((autoToggle) && moves.moves){
        if (moves.moves.length === 4){
            setShowMoves(true);
            setAutoToggle(false)
        } 
    } 

    const toggleMove = () => {
        if (moves.moves){
            setShowMoves((prev) => !prev);
        } else {
            console.log("No Moves Yet!!")
        }   
    }

    const unselect = () => {
        setIsMove(false);        
    }
    const changeTurn = (white = false) => {
        if (white){
            setIsWhite(true)
        } else {
            setIsWhite((prev) => !prev);
        }        
    }

    function toggleModal(message){
        setErrorMessage(message);
        setShowModal(true);
        setTimeout(function(){
            setShowModal(false)
        }, (2500))
        
    }

    const selectPiece = e => {    
        console.log("Selecting piece ", e.currentTarget.id)        
        // let multiplier = parseInt(e.currentTarget.id / 10);
        // let count = e.currentTarget.id - multiplier * 2 ;
        let square = e.currentTarget.id;
        console.log("square", square)          
        // if ((props.pieces.get(count).startsWith("w") && isWhite) || (props.pieces.get(count).startsWith("b") && !isWhite)){
        console.log("allMoves", allMoves)          

        if (allMoves.has(square)){
            setStart(square);
            setIsMove(true);
            setPossibleMoves(allMoves.get(square).validMoves)
            //todo set special moves?
        } else {
            console.log("That is not your piece!");
            toggleModal("That is not your piece!");                       
        }       
    }

    const selectMove = e => {       
        //console.log("Moving to ", e.currentTarget.id);        
        let end = parseInt(e.currentTarget.id); 
        if (end === start){
            setIsMove(false);            
            return;
        }       
        const move = {
            start,
            end
            // isWhite
        }
        setIsMove(false);     
        console.log(move);
        DataService.movePiece(move, gameId)
            .then(res => {
                console.log(res.data);
                setIsWhite((prev) => !prev);                
                // props.setTheBoard(res.data);
                props.updateTheBoard(res.data)
                // setPieces(new Map(Object.entries(res.data.pieces).map(([k, v]) => [+k, v])))
                // setStatus(res.data.status);                
                setShowCheck(true);
                setMoves(res.data.moves);
                // setAllMoves(res.data.allMoves);
                // setAllMoves(new Map(Object.entries(res.data.allMoves)));
            })
            .catch(err => {                
                console.log(err.response.data)
                toggleModal(err.response.data.errMessage)              
            })
    }
  
    const forfeit = forfeit => {
        DataService.forfeit(gameId)
            .then(res => {
                console.log(res.data)
                setStatus(res.data)
            })
            .catch(err => {
                console.log(err);
                //window.alert(err.response.data.errMessage)
                toggleModal(err.response.data.errMessage) 
            })
    }

    const generateHeaders = vertical => {
        let newHeader = [];
        const columns = "ABCDEFGH";       
        for (let i = 0; i < 8; i++){
            if (vertical){
                newHeader.push(<div key={i} className="vsquare">{i + 1}</div>);
            } else {
                newHeader.push(<div key={i} className="hsquare">{columns[i]}</div>);
            }
        }   
        return newHeader;
    }
    
    return ( 
        <div id="main">  
            <Details status={status} isMove={isMove} unselect={unselect} endTheGame={forfeit} setTheBoard={props.setTheBoard} changeTurn={changeTurn} gameId={gameId} />                                
            <div id="flexHolder">                
                <div id="totalBoard">
                    <div id="vtag">{generateHeaders(true)}</div>
                    <div id="board">
                        <Modal isOpen={showModal} id="model" ariaHideApp={false}>
                            <h1 id="error">{errorMessage}</h1> 
                            <button id="button" onClick={() => setShowModal(false)}>Okay</button>
                        </Modal>
                        <Board pieces={props.pieces} possibleMoves={possibleMoves} isMove={isMove} selectPiece={selectPiece} selectMove={selectMove}  /> 
                        {/* // {squares} */}
                    </div>                                                                       
                </div>
                <MovesList moves={moves} toggleMove={toggleMove} showMoves={showMoves} />             
            </div>
            <div id="htag">{generateHeaders(false)}</div>  
        </div>
        
     );
}
 
export default Game;