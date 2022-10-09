import React, {useState} from 'react';
import "./Welcome.css"
import { withRouter, useHistory } from 'react-router-dom';
import DataService from '../../service/DataService';

const GameForm = props => {
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    const history = useHistory();

    const handleUser1 = e => {               
        setUser1(e.target.value);
    }   
    const handleUser2 = e => {               
        setUser2(e.target.value);
    }   

    const startLocalGame = (e) => {
        e.preventDefault(); 
        console.log(e.target);
        const body = {                
            user1, 
            user2
        }
       
        DataService.startLocalGame(body)
        .then(res => {
            console.log(res)

            let gameId = res.data.id;
            props.setTheBoard(res.data);  
            console.log("the game id is ", gameId);        
            history.push(`/game/${gameId}`);
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    return ( 
        <form onSubmit={startLocalGame}>
            Play a local game with a friend<br></br>
            <input type="text" name="user1" onChange={handleUser1} value={user1} /><br></br>
            <input type="text" name="user2" onChange={handleUser2} value={user2} /><br></br>
            <input type="submit" value="Start Local Game" />
        </form>
     );
}
 
export default withRouter(GameForm);