import React, {useState} from 'react';
import "./PF.css"
import { withRouter, useHistory } from 'react-router-dom';
import DataService from '../../service/DataService';

const PlayerForm = props => {
    //console.log("PF", props)
    const [name, setName] = useState("Your Name");
    const [names] = useState([])
    const [player, setPlayer] = useState(1);
    const history = useHistory();

    const handleChange = e => {               
        setName(e.target.value);
    }   

    const addPlayers = body => {        
        console.log(body)
        DataService.createPlayers(body)
        .then(res => {
            console.log("added player", res);
            props.setTheBoard(res.data);            
            //props.history.push('/game')
            history.push('/game');
        })
        .catch(err => {
            console.log(err)
        })
    }

    const makePlayer = (e) => {
        e.preventDefault(); 
        console.log(e.target.name.value);
        names.push(e.target.name.value);        
        if (player === 2){
            const body = {                
                name1: names[0], 
                name2: names[1]
            }
            addPlayers(body);
            setPlayer(player-2);                   
        }
        setName("");
        setPlayer(player + 1);
    }
    

    return ( 
        <form onSubmit={makePlayer}>
            Player {player}, Please Enter Your Name <br></br>
            <input type="text" name="name" onChange={handleChange} value={name} /><br></br>
            <input type="submit" value="Submit" />
        </form>
     );
}
 
export default withRouter(PlayerForm);