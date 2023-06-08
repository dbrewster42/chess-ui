import React, { useState } from 'react';
import "./Board.css"
import DataService from '../../service/DataService';
import Details from './Details';
import MovesList from './MovesList';
import Board from './Board';
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import defaultPieces from "../../data/default-pieces.json";
import initialMoves from "../../data/initial-moves.json";



const Game = (props) => { 
    // const params = useParams();    
    const gameId = useParams().gameId;    
    let [pieces, setPieces] = useState(new Map(Object.entries(defaultPieces).map(([k, v]) => [+k, v])));
    let [status, setStatus] = useState({ active : true, check : false, isWhite : true });
    let [allMoves, setAllMoves] = useState(new Map(Object.entries(initialMoves)));
    let [possibleMoves, setPossibleMoves] = useState([]) 
    let [isMove, setIsMove] = useState(false);
    let [start, setStart] = useState(88);
    let [errorMessage, setErrorMessage] = useState('');
    const [moveMessages] = useState([]);
    // let [moves, setMoves] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [showCheck, setShowCheck] = useState(true);    
    let [showMoves, setShowMoves] = useState(false);   
    let [autoToggle, setAutoToggle] = useState(true);
    let [selectPromotion, setSelectPromotion] = useState(false);
    let [promotion, setPromotion] = useState()


    // if (!status.active && showCheck){
    //     setShowCheck(false);
    //     toggleModal(status.message); //todo
    // } else 
    if (status.check && showCheck){
        setShowCheck(false);
        toggleModal("CHECK!");
    }
   
    if (autoToggle && moveMessages.length > 3){
        setShowMoves(true);
        setAutoToggle(false);
    } 

    const toggleMove = () => {
        setShowMoves((prev) => !prev);
    }

    const unselect = () => {
        console.log("unselecting")
        setIsMove(false);        
    }

    function toggleModal(message){
        setErrorMessage(message);
        setShowModal(true);
        setTimeout(function(){
            setShowModal(false)
        }, (2500))
    }

    const updateTheBoard = data => {
        console.log("app", data);
        setStatus(data.status)
        if (status.active) {
            moveMessages.push(data.move)
            setPieces(new Map(Object.entries(data.pieces).map(([k, v]) => [+k, v])))
            setAllMoves(new Map(Object.entries(data.allMoves)));
        } else {
            toggleModal(data.move);
        }
    }

    const selectPiece = e => {    
        let square = e.currentTarget.id; 
        console.log("square", square)          
        // if ((props.pieces.get(count).startsWith("w") && isWhite) || (props.pieces.get(count).startsWith("b") && !isWhite)){
        console.log("allMoves", allMoves)          

        if (allMoves.has(square)){
            setStart(square);
            setIsMove(true);
            console.log("selected", square, "which can move to", allMoves.get(square), isMove)
            setPossibleMoves(allMoves.get(square).validMoves)
        } else {
            console.log("That is not your piece!");
            toggleModal("That piece cannot be moved");                       
        }       

    }

    const selectMove = e => {       
        console.log("Moving", start, "to", e.currentTarget.id);        
        let end = e.currentTarget.id; 
        if (end === start){
            setIsMove(false);            
            return;
        }
        let specialMove = null;

        console.log("allPossibleMoves", allMoves.get(start))
        if (allMoves.get(start).specialMoves != null) {
            let specialMoves = new Map(Object.entries(allMoves.get(start).specialMoves));
            console.log("special moves", specialMoves)
            if (specialMoves.has(end)) {
                specialMove = specialMoves.get(end)
                console.log(specialMove)
                if (specialMove == "Promotion") {
                    setSelectPromotion(true)
                }
            }
        }

        const move = {
            start,
            end,
            specialMove,
            promotion
        }
        setIsMove(false);
        setPromotion(null)     
        console.log("move", move);
        DataService.movePiece(move, gameId)
            .then(res => {
                console.log(res.data);
                updateTheBoard(res.data)         
                setShowCheck(true);
            })
            .catch(err => {                
                console.log(err.response.data)
                toggleModal(err.response.data.message)              
            })
    }

    const choosePromotion = e => {   
        console.log("changing to", e)
        setPromotion(e.target.value)
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
                toggleModal(err.response.data.message) 
            })
    }

    const generateHeaders = vertical => {
        let newHeader = [];
        const columns = "HGFEDCBA";       
        for (let i = 8; i > 1; i--){
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
            <Details status={status} isMove={isMove} unselect={unselect} endTheGame={forfeit} gameId={gameId} />                                
            <div id="flexHolder">                
                <div id="totalBoard">
                    <div id="vtag">{generateHeaders(true)}</div>
                    <div id="board">
                        <Modal isOpen={showModal} id="model" ariaHideApp={false}>
                            <h1 id="error">{errorMessage}</h1> 
                            <button className="button" onClick={() => setShowModal(false)}>Okay</button>
                        </Modal>
                        <Modal isOpen={selectPromotion} >
                            {props.promotionOptions.map(choice => {
                                return (
                                    <input type="radio" value={choice} name="promotion" onChange={choosePromotion}  />
                                )
                            })}
                            <submit className="button" onClick={() => setSelectPromotion(false)}>Okay</submit>
                        </Modal>
                        <Board pieces={pieces} possibleMoves={possibleMoves} isMove={isMove} selectPiece={selectPiece} selectMove={selectMove}  /> 
                        {/* // {squares} */}
                    </div>                                                                       
                </div>
                <MovesList moves={moveMessages} toggleMove={toggleMove} showMoves={showMoves} />             
            </div>
            <div id="htag">{generateHeaders(false)}</div>  
        </div>
        
     );
}
 
export default Game;