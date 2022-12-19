import React from 'react';
import "../App.css"

const MovesList = props => {

    return (         
            <div id="mainMoves">                
                {props.showMoves ?            
                    <div className="movesList">
                        <h3 className="mHeader click" onClick={props.toggleMove}>Moves<span className="tooltiptext">Click Here to Show the Instructions</span></h3>                        
                        <ol>
                            {props.moves.moves.map((move, i) => {
                                return <li key={i}>{move}</li>
                            })}
                        </ol>
                    </div>
                    :
                    <div className="movesList">
                        <h3 className="mHeader click" onClick={props.toggleMove}>Instructions<span className="tooltiptext">Click here to show made moves</span></h3>  
                        <p>Confused about the gameplay? Confused about the rules? Check it here at any time by clicking on the above title</p>
                        <br></br>
                        <h4 className="mHeader">Gameplay</h4> 
                        <p>Remember to hit the <strong>Special Move</strong> button after selecting a <strong>Rook</strong> to perform a <em>Castle</em> or with a Pawn to use <em>en Passant</em>!  </p>
                        <p>Click on a piece to select it. The tile will turn blue to confirm that you have selected the piece. Also, the two buttons in the header will change to give you two new options- Unselect and Special Move. If you wish to select a different piece, 
                        click on unselect (or you can also click the piece again). If you are not making a special move, you simply click your desired destination. If you wish to perform a Castle, click on your <strong>Rook</strong> and then click Special Move; if the conditions for Castling are valid, then 
                        the program will Castle for you. If you wish to perform en Passant, click on the Pawn you wish to use and then click on Special Move. The program will
                        perform the special move for you if the conditions are valid. See below for proper Castling and en Passant conditions. <br></br>
                        </p>
                        <p>This game does not yet include stalemate. If you find yourself in stalemate, please click the 'Draw' button!</p>
                        <br></br>
                        <h4 className="mHeader">General Chess Rules</h4>

                        <p>White is always first to move and players take turns alternately moving one piece at a time. A movement is required each turn. 
                            Each type of piece has its own method of movement. A piece may be moved to another position or may capture an opponent´s piece, 
                            replacing on its square (en passant being the only exception). With the exception of the knight, a piece may not move over or through any of the other pieces.
                            <br /> When a king is threatened
                            with capture (but can protect himself or escape), it´s called check. If a king is in check, then the player must
                            make a move that eliminates the threat of capture and cannot leave the king in check. Checkmate happens when a king
                            is placed in check and there is no legal move to escape. Checkmate ends the game and the side whose king was
                            checkmated looses.  If a player´s turn is to move, he is not in check but has no legal moves, this situation is called “Stalemate” and it
                            ends the game in a draw.</p>

                        <br></br>
                        <h4 className="mHeader">Rules for each Piece's Movement</h4>                    
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
                        <h4 className="mHeader">Special Moves</h4>
                        <ul>
                            <li><strong>En Passant</strong> may only be used if the capturing pawn must be on its fifth rank. The threatened pawn must have moved two squares from its starting square, and be on an adjacent file.</li>                
                            <li><strong>Castle</strong> may only be used if the king has never moved, the rook involved has never moved, the squares between the king and the rook involved are unoccupied, the king is not in check, and the king does not cross over or end on a square attacked by an enemy piece.</li>
                            <li><strong>Pawn Promotion</strong> is when a pawn makes it to the other side of the board. Upon reaching the back row, the pawn becomes a queen</li>
                            <li><strong>Undo</strong> (Optional)- Both players must accept to use. You must select undo <em>before</em> your opponent takes a turn</li>
                        </ul>   
                    </div>                       
                }                
            </div>         
       
     );
}
 
export default MovesList;