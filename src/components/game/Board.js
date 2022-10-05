import React, { useState } from 'react';
import "./Board.css"
import DataService from '../../service/DataService';
import Details from '../Details';
import MovesList from '../MovesList';
import Square from './Square';
import Modal from "react-modal";

function importAll(r) {
    let images = {};
    r.keys().forEach((item) => {        
        images[item.replace("./", "")] = r(item);
    });
    // console.log(images);
    return images;
  }

const Board = (props) => {  
    let [isMove, setIsMove] = useState(false);
    let [start, setStart] = useState(88);
    let [isWhite, setIsWhite] = useState(true);
    let [status, setStatus] = useState(props.data[64]);
    let [errorMessage, setErrorMessage] = useState('');
    //console.log(status);
    const [moves, setMoves] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [showCheck, setShowCheck] = useState(true);
    
    const images = importAll(require.context("../../../public/pics", false, /\.(pn?g)$/));
    
    if (!status.active && showCheck){
        setShowCheck(false);
        toggleModal(status.message);
    } else if (status.check && showCheck){
        setShowCheck(false);
        toggleModal("CHECK!");
    }

    const updateMovesList = () => {        
        DataService.displayMoves()
            .then(res => {
                //console.log(res.data)
                setMoves(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function Row(i){
        const newRow = [];
        let count = i * 8;  
        for (let j = 0; j<8; j++){ 
            let image = '';
            let thisPiece =  props.data[count].name;
            let squareStyle = "squares y"
            if (thisPiece != null){
                image = images[thisPiece];
            }
            if ((i + j) % 2 === 1){
                squareStyle = "squares g"
            }        
            newRow.push(
                <Square 
                    key={count}
                    i={i} 
                    j={j} 
                    squareStyle={squareStyle}
                    count={count} 
                    thisPiece={thisPiece}
                    image={image}
                    isMove={isMove} 
                    selectPiece={selectPiece}
                    selectMove={selectMove} 
                />
            )            
            count++;            
        }
        return <div className="rows" key={i}>{newRow}</div>;
    }

    function Column(){        
        const Board = []        
        for (let i = 0; i<8; i++){
            Board.push(Row(i));            
        }
        return Board;
    }

    const unselect = () => {
        setIsMove(false);        
    }

    function toggleModal(message){
        setErrorMessage(message);
        setShowModal(true);
        setTimeout(function(){
            setShowModal(false)
        }, (2500))
        
    }

    const selectPiece = e => {    
        console.log(e.currentTarget) 
        //console.log("Selecting piece ", e.currentTarget.id)        
        let multiplier = parseInt(e.currentTarget.id / 10);
        let count = e.currentTarget.id - multiplier * 2 ;
        //console.log(multiplier, "newCount", count)          
        if ((props.data[count].name.startsWith("w") && isWhite) || (props.data[count].name.startsWith("b") && !isWhite)){
            let numb = parseInt(e.currentTarget.id)               
            setStart(numb);
            setIsMove(true);
        } else {
            console.log("That is not your piece!");
            toggleModal("That is not your piece!");                       
        }       
    }

    const selectMove = e => {       
        console.log("Moving to ", e.currentTarget.id);        
        let end = parseInt(e.currentTarget.id); 
        if (end === start){
            setIsMove(false);            
            return;
        }       
        const move = {
            start,
            end,
            isWhite
        }
        setIsMove(false);     
        console.log(move);
        DataService.makeMove(move)
            .then(res => {
                //console.log(res.data);
                setIsWhite((prev) => !prev);                
                props.setTheBoard(res.data);
                setStatus(res.data[64]);                
                updateMovesList();
                setShowCheck(true);
            })
            .catch(err => {                
                console.log(err.response.data)
                toggleModal(err.response.data.errMessage)
                //window.alert(err.response.data.errMessage)                
            })
    }
    const specialMove = () => {
        let end = 999;
        const move = {
            start,
            end,
            isWhite
        }
        setIsMove(false);
        console.log(move);
        DataService.makeMove(move)
            .then(res => {
                setIsWhite((prev) => !prev);
                props.setTheBoard(res.data);
                setStatus(res.data[64]);                
                updateMovesList();
                setShowCheck(true);
            })
            .catch(err => {                
                console.log(err.response.data);
                //window.alert(err.response.data.errMessage) 
                toggleModal(err.response.data.errMessage);      
            })

    }
    const endTheGame = forfeit => {
        let playerName = status.playerName;
        let endRequest = {
            forfeit,
            playerName 
        }
        console.log(endRequest)
        DataService.endGame(endRequest)
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
        const rows = "abcdefgh"       
        if (vertical){
            for (let i =0; i< 8; i++){
                newHeader.push(<div key={i} className="vsquare">{i + 1}</div>);
            }            
        } else {
            for (let i =0; i< 8; i++){
                newHeader.push(<div key={i} className="hsquare">{rows[i]}</div>);
            } 
        }   
        return newHeader;
    }
    
    return ( 
        <div id="main">  
            <Details status={status} isMove={isMove} unselect={unselect} specialMove={specialMove} endTheGame={endTheGame} setTheBoard={props.setTheBoard} />                                
            <div id="flexHolder">                
                <div id="totalBoard">
                    <div id="vtag">{generateHeaders(true)}</div>
                    <div id="board">
                        <Modal isOpen={showModal} id="model">
                            <h1 id="error">{errorMessage}</h1> 
                            <button id="button" onClick={() => setShowModal(false)}>Okay</button>
                        </Modal>
                        {Column()}
                    </div>                                                                       
                </div>
                <MovesList moves={moves} updateMovesList={updateMovesList} />             
            </div>
            <div id="htag">{generateHeaders(false)}</div>  
        </div>
        
     );
}
 
export default Board;