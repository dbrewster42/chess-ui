import React from 'react';
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
    // let [squares, setSquares] = useState(Column());
    // const images = importAll(require.context("../../../public/pics", false, /\.(pn?g)$/));

    
    // useEffect(() => {
    //     console.log("highlighting moves")
    //     let board = squares;
    //     for (let square of props.possibleMoves){
    //         let selectedSquare = board[square / 10][square % 10]
    //         console.log(selectedSquare.key, " ::: ", square)
    //         board[square / 10][square % 10] =  
    //             <Square 
    //                 key={square}
    //                 squareStyle={"squares s"}
    //                 image={selectedSquare.image}
    //                 isMove={props.isMove} 
    //                 selectPiece={props.selectPiece}
    //                 selectMove={props.selectMove} 
    //             />
    //     }
    //     setSquares(board)
    //   }, [props.possibleMoves]);

    function Column(){   
        const images = importAll(require.context("../../../public/pics", false, /\.(pn?g)$/));     
        const board = []        
        for (let i = 8; i > 0; i--){
            board.push(Row(i, images));            
        }
        // setSquares(board);
        // return squares;
        return board;
    }

    function Row(i, images){
        const newRow = [];
        // let count = i * 10 + 1;  
        // console.log("getting data for pieces", props.pieces)
        for (let j = 1; j < 9; j++){ 
            let squareStyle;
            let count = j * 10 + i;
            if (props.possibleMoves.includes(count)){
                // console.log(count, "is a possible move")
                squareStyle = "squares s"
            } else {
                if ((i + j) % 2 === 1){
                    squareStyle = "squares g"
                } else {
                    squareStyle = "squares y"
                }
            }

            let image = null;
            if (props.pieces.has(count)){
                // image = props.data.pieces.get(count);
                image = images[props.pieces.get(count)];
            }

            newRow.push(
                <Square 
                    key={count}
                    id={count}
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
        <div>
            {/* {squares} */}
            {Column()}
        </div>
       
        
     );
}
 
export default Board;