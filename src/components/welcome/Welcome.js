import React, { useState } from 'react';
import GameForm from "./GameForm"
import PlayerForm from "./PlayerForm"
import "./Welcome.css"
import pic from "../header/4.jpg"
import pic2 from "../header/2.jpg"

const Welcome = props => {
    //console.log("Welcome to the ", props)
    const [showsForm, setShowsForm] = useState(true);

    const toggleForm = e => {
        setShowsForm((prevShows) => !prevShows);
    }

    return ( 
        <div id="welcome">            
            {/* <Link to="/game"><h1 className="start">Click Here to Begin</h1></Link> */}
            <h1 className="start" onClick={toggleForm}>{">>>>>>>>>"} Start A Game {"<<<<<<<<<<"} </h1>
            {showsForm ? 
                <PlayerForm setTheBoard={props.setTheBoard} />
            : 
                <GameForm setTheBoard={props.setTheBoard}  />
            }


            <h1>Rules</h1> 
            <div id="body">         
                <div id="left">
                    <h2 className="blues">Gameplay Control</h2>

                    <p>Click on a piece to select it. The tile will turn blue to confirm that you have selected the piece. Two new options will pop up in the header- Unselect and Special Move. If you wish to select a different piece, 
                        click on unselect or click the piece again. Then, if not making a Special Move, you simply click on the tile you wish to move your piece to. 
                    </p>
                    <p>
                        If you wish to perform a <em>Castle</em>, click on your <strong>Rook</strong> and then click Special Move; if the conditions for Castling are valid, then 
                        the program will Castle for you. If you wish to perform <em>en Passant</em>, click on the <strong>Pawn</strong> you wish to use and then click on Special Move. The program will
                        perform the special move for you if the conditions are valid. See below for proper Castling and en Passant conditions.                       
                    </p> 
                    <p>If you attempt to make a move that is not legal, the move will not be processed and then you will be notified to try again</p>
                    {/* <p>Click on the piece you wish to move, an "Unselect" button will pop up and you can click on that to choose a different piece or, if you are not
                    making a special move, select the location you wish to move your piece to. If your move is not a valid chess move, you will be prompted to try again.
                    The only exceptions are with Castles and en Passant. If you wish to castle, select the Rook you wish to use and then click on the Special Move button.
                    If you wish to use en Passant, select the pawn you wish to use and then click on the Special Move button.
                        See below for the valid conditions to make these special moves.
                    </p> */}

                    <br></br>
                    <h2 className="blues">Special Functionalities</h2>
                    <ul><span>  During Piece Selection</span>
                        <li>Forfeit- Forfeits the game</li>
                        <li>Draw - Checks for stalemate, if not stalemate, then it requires the other team to agree </li>
                        <li>Piece Count- Will Display a Count of All Piece Types from Both Team</li>
                        <li>Toggle between Moves and Instructions</li>
                        <ul>
                            <li>Display Moves- Prints a List of All Moves</li>  
                            <li>Display Rules - Prints the basic instructions of how to play Chess including specific gameplay</li>
                        </ul>
                        <li>Undo (Optional)- Undoes your last move</li>                                              
                    </ul>
                    <ul> <span>  During Move Selection</span>
                        <li>Unselect - unselects the current piece</li>
                        <li>Special Move - executes a Special Move if conditions are valid</li>     
                        <ul> 
                            <li>Castle - the proper <em>Rook</em>  must be selected</li>
                            <li>En Passant - the proper Pawn must be selected</li>
                        </ul>                   
                        
                    </ul>
                    

                    <br></br>
                    <h2 className="blues">Game Status(es)</h2>
                    <ul>
                        <li>Active</li>
                        <li>Check</li>
                        <li>Checkmate</li>
                        <li>Draw</li>
                        <li>Stalemate (not included)</li>
                    </ul>
                    <br></br>
                    <img className="image" src={pic} alt="pic" /> 
                    
                   
                    
                    <div id="lean">
                        <h2 className="blue" onClick={toggleForm}>Play a Game Now</h2>
                        {showsForm ? 
                            <PlayerForm setTheBoard={props.setTheBoard} toggleUndo={props.toggleUndo} />
                            : 
                            <i></i>
                        }                        
                        <img className="im2" src={pic2} alt="pic" /> 
                    </div>
                    
                </div>
                
                <div id="right">
                    <br></br>
                    <h2 className="blues">Chess Rules</h2>

                    <p>White is always first to move and players take turns alternately moving one piece at a time. A movement is required each turn. 
                        Each type of piece has its own method of movement. A piece may be moved to another position or may capture an opponent´s piece, 
                        replacing on its square (en passant being the only exception). With the exception of the knight, a piece may not move over or through any of the other pieces.
                        <br /><br /> When a king is threatened
                        with capture (but can protect himself or escape), it´s called check. If a king is in check, then the player must
                        make a move that eliminates the threat of capture and cannot leave the king in check. Checkmate happens when a king
                        is placed in check and there is no legal move to escape. Checkmate ends the game in victory for the attacker.  If it a player´s turn is to move and he is not in check but has no legal moves, this situation is called “Stalemate” and it
                        ends the game in a tie.</p>

                    <br></br>
                    <h2 className="blues">Piece's Movement</h2>                    
                    <ul>
                        <li><strong>King</strong> can move exactly one square horizontally, vertically, or diagonally. Once in every game, each king is allowed to make a special move, known as castling.</li>
                        <li><strong>Queen</strong> can move any number of vacant squares diagonally, horizontally, or vertically.</li>
                        <li><strong>Rook</strong> can move any number of vacant squares vertically or horizontally. It also is moved while castling.</li>
                        <li><strong>Bishop</strong> can move any number of vacant squares in any diagonal direction.</li>
                        <li><strong>Knight</strong> can move one square along any rank or file and then two more in a 90 degree angle. The knight´s movement can also be viewed
                            as an “L” or “7″ laid out at any horizontal or vertical angle. It is the only piece that can jump other pieces</li>
                        <li><strong>Pawn</strong> can move forward one square, if that square is unoccupied. If it has not yet moved, the pawn has the
                            option of moving two squares forward provided both squares in front of the pawn are unoccupied. A pawn cannot
                            move backward. Pawns are the only pieces that capture differently from how they move. They can capture an enemy
                            piece on either of the two spaces adjacent to the space in front of them (i.e., the two squares diagonally in
                            front of them) but cannot move to these spaces if they are vacant. The pawn is also involved in the two special
                            moves en passant and promotion.</li>
                    </ul>  
                    
                    <br></br>
                    <h2 className="blues">Special Moves</h2>
                    <ul>
                        <li><strong>En Passant</strong> may only be used if the capturing pawn must be on its fifth rank. The threatened pawn must have moved two squares from its starting square, and be on an adjacent file.</li>                
                        <li><strong>Castle</strong> may only be used if the king has never moved, the rook involved has never moved, the squares between the king and the rook involved are unoccupied, the king is not in check, and the king does not cross over or end on a square attacked by an enemy piece.</li>
                        <li><strong>Pawn Promotion</strong> is when a pawn makes it to the other side of the board. Upon reaching the back row, the pawn becomes a queen</li>
                        <li><strong>Undo</strong> (Optional)- Both players must accept to use. You must select undo <em>before</em> your opponent takes a turn</li>
                    </ul>             
                  
                </div>

            
            </div> 
            
         
        </div>
     );
}
 
export default Welcome;