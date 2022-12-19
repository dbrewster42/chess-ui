import React, { useState, useEffect } from 'react';
import "./Board.css"
import Square from './Square';

function importAll(r) {
    let images = {};
    r.keys().forEach((item) => {        
        images[item.replace("./", "")] = r(item);
    });
    return images;
  }

const Board = (props) => {  
    let [squares, setSquares] = useState(Column());
    const images = importAll(require.context("../../../public/pics", false, /\.(pn?g)$/));

    console.log("iamges", images)

    
    useEffect(() => {
        console.log("highlighting moves")
        let board = squares;
        for (let square of props.possibleMoves){
            let selectedSquare = board[square / 10][square % 10]
            console.log(selectedSquare.key, " ::: ", square)
            board[square / 10][square % 10] =  
                <Square 
                    key={square}
                    squareStyle={"squares s"}
                    image={selectedSquare.image}
                    isMove={props.isMove} 
                    selectPiece={props.selectPiece}
                    selectMove={props.selectMove} 
                />
        }
        setSquares(board)
      }, props.possibleMoves);

    function Column(){        
        const Board = []        
        for (let i = 1; i < 9; i++){
            Board.push(Row(i));            
        }
        console.log("board", Board)
        setSquares(Board);
        // return squares;
        return Board;
    }

    function Row(i){
        let images2 = importAll(require.context("../../../public/pics", false, /\.(pn?g)$/));
        console.log("iamges", images2)
        const newRow = [];
        let count = i * 10 + 1;  
        console.log("getting data for pieces", props.pieces)
        let thesePieces = new Map(Object.entries(props.pieces));
        for (let j = 1; j < 9; j++){ 
            let squareStyle = "squares y"
            if ((i + j) % 2 === 1){
                squareStyle = "squares g"
            } 

            let image = null;
            if (thesePieces.has(count + "")){
                // image = props.data.pieces.get(count);
                image = images2[thesePieces.get(count + "")];
            }

            newRow.push(
                <Square 
                    key={count}
                    squareStyle={squareStyle}
                    image={image}
                    isMove={props.isMove} 
                    selectPiece={props.selectPiece}
                    selectMove={props.selectMove} 
                />
            )            
            count++;            
        }
        return <div className="rows" key={i}>{newRow}</div>;
    }

    
    return ( 

        {squares}

    //    {Column()}
        
     );
}
 
export default Board;