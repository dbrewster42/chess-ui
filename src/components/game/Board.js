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
        const board = []        
        for (let i = 8; i > 0; i--){
            board.push(Row(i));            
        }
        console.log("board", board)
        // setSquares(board);
        // return squares;
        return board;
    }

    function Row(i){
        let images2 = importAll(require.context("../../../public/pics", false, /\.(pn?g)$/));
        console.log("iamges", images2)
        const newRow = [];
        // let count = i * 10 + 1;  
        console.log("getting data for pieces", props.pieces)
        for (let j = 1; j < 9; j++){ 
            let squareStyle = "squares y"
            if ((i + j) % 2 === 1){
                squareStyle = "squares g"
            } 

            let count = j * 10 + i;
            let image = null;
            if (props.pieces.has(count)){
                // image = props.data.pieces.get(count);
                image = images2[props.pieces.get(count)];
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
            // count++;            
        }
        return <div className="rows" key={i}>{newRow}</div>;
    }

    
    return ( 

        // {squares}
        // {for (let j = 1; j < 9; j++){ 
        //     let squareStyle = "squares y"
        //     if ((i + j) % 2 === 1){
        //         squareStyle = "squares g"
        //     } 
        // }
        <div>
            {Column()}
        </div>
       
        
     );
}
 
export default Board;