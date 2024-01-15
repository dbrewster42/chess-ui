import React, { useState } from 'react';
import "./Board.css"
import DataService from '../../service/DataService';
import Details from './Details';
import MovesList from './MovesList';
import Board from './Board';
import Modal from "react-modal";
import { useParams, useHistory } from "react-router-dom";
import defaultPieces from "../../data/default-pieces.json";
import initialMoves from "../../data/initial-moves.json";



const Game = (props) => { 
    // const params = useParams();    
    const history = useHistory();
    const gameId = useParams().gameId;    
    let [pieces, setPieces] = useState(new Map(Object.entries(defaultPieces).map(([k, v]) => [+k, v])));
    let [status, setStatus] = useState({ active : true, check : false, white : true, currentPlayer : "Player1" });
    let [allMoves, setAllMoves] = useState(new Map(Object.entries(initialMoves)));
    let [possibleMoves, setPossibleMoves] = useState([]) 
    let [isMove, setIsMove] = useState(false);
    let [start, setStart] = useState(88);
    let [errorMessage, setErrorMessage] = useState('');
    const [moveMessages] = useState([]);
    // let [moves, setMoves] = useState([]);
    let [showModal, setShowModal] = useState(false);
    // let [showCheck, setShowCheck] = useState(true);    
    let [showMoves, setShowMoves] = useState(false);   
    let [autoToggle, setAutoToggle] = useState(true);
    let [selectPromotion, setSelectPromotion] = useState(false);
    let [promotion, setPromotion] = useState("QUEEN")


    // if (!status.active && showCheck){
    //     setShowCheck(false);
    //     toggleModal(status.message); //todo
    // } else 
    // if (status.check && showCheck){
    //     setShowCheck(false);
    //     toggleModal("CHECK!");
    // }
    if (autoToggle && moveMessages.length > 3){
        setShowMoves(true);
        setAutoToggle(false);
    } 
    // if (moveMessages.length > 3){
    //     setShowMoves(true);
    // } 

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
        moveMessages.push(data.move)
        if (data.pieces) {
            setPieces(new Map(Object.entries(data.pieces).map(([k, v]) => [+k, v])))
        }
        if (data.status.active) {
            if (data.status.check) {
                console.log("Check")
                toggleModal("CHECK!");
            }
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
                if (specialMove === "Promotion") {
                    setSelectPromotion(true)
                    //todo await
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
        // setPromotion(null);     
        console.log("move", move);
        DataService.movePiece(move, gameId)
            .then(res => {
                console.log(res.data);
                updateTheBoard(res.data)         
                // setShowCheck(true);
            })
            .catch(err => {                
                console.log(err.response.data)
                toggleModal(err.response.data.message)              
            })
    }

    const choosePromotion = e => {   
        console.log("target", e.target)
        console.log("current", e.currentTarget)
        setPromotion(e.target.value)
        console.log("promot", promotion)
    }

  
    const endTheGame = isForfeit => {
        console.log("requesting end")
        if (isForfeit) {
            DataService.forfeit(gameId)
            .then(res => {
                console.log(res.data)
                if (res.data != null) {
                    setStatus(res.data)
                }
            })
            .catch(err => {
                console.log(err);
                toggleModal(err.response.data.message) 
            })
        } else {
            DataService.requestDraw(gameId)
            .then(res => {
                console.log(res.data)
                if (res.data != null) {
                    setStatus(res.data)
                }
            })
            .catch(err => {
                console.log(err);
                toggleModal(err.response.data.message) 
            })
        }

    }

    const restart = () => {
        let request = { user1: props.whitePlayer, user2: props.blackPlayer }
        DataService.restartGame(request)
        .then(res => {
            console.log(res);
            history.push(`/game/${res.data.id}`);
            moveMessages = []
            setAllMoves(new Map(Object.entries(initialMoves)))
            setPieces(new Map(Object.entries(defaultPieces).map(([k, v]) => [+k, v])))
        })
        .catch(err => {
            console.log(err);
            toggleModal(err.response.data.message) 
        })
    }

    const newGame = () => {
        history.push('/');
    }

    const generateHeaders = vertical => {
        let newHeader = [];
        const columns = "HGFEDCBA";       
        for (let i = 7; i >= 0; i--){
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
            <Details status={status} isMove={isMove} unselect={unselect} endTheGame={endTheGame} newGame={newGame} restart={restart} />                                
            <div id="flexHolder">                
                <div id="totalBoard">
                    <div id="vtag">{generateHeaders(true)}</div>
                    <div id="board">
                        <Modal isOpen={showModal} id="model" ariaHideApp={false}>
                            <h1 id="error">{errorMessage}</h1> 
                            <button className="button" onClick={() => setShowModal(false)}>Okay</button>
                        </Modal>
                        <Modal isOpen={selectPromotion} id="promotionModel" ariaHideApp={false}>
                            <div>
                                {props.promotionOptions && props.promotionOptions.map(choice => {
                                    return (
                                        <div key={choice}>
                                            <input type="radio" value={choice} name="promotion" onChange={choosePromotion}  />
                                            <label htmlFor={choice}>{choice}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className="button" onClick={() => setSelectPromotion(false)}>Okay</button>
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