import React, {useState} from 'react';
import "./Welcome.css"
import { withRouter, useHistory } from 'react-router-dom';
import DataService from '../../service/DataService';

const PlayerForm = props => {
    const [name, setName] = useState("Mr. Magoo");
    const [email, setEmail] = useState("Magoo@gmail.com");
    const history = useHistory();

    const handleName = e => {               
        setName(e.target.value);
    }   
    const handleEmail = e => {               
        setEmail(e.target.value);
    }   

    const makePlayer = (e) => {
        e.preventDefault(); 
        console.log(e.target.name.value);
        const body = {                
            name, 
            email
        }
        // const body = {                
        //     name : e.target.name.value, 
        //     email : e.target.email.value
        // }
       
        DataService.createPlayers(body)
        .then(res => {
            console.log(res)
        //     if (bothChecked){
        //         console.log(bothChecked, "both")
        //         props.toggleUndo(false);
        //     } else {
        //         props.toggleUndo(true);
        //     }
        //     console.log("added player", res);
        //     let gameId = res.data[64].id;
        //     props.setTheBoard(res.data);  
        //     console.log("the game id is ", gameId);        
        //     history.push(`/game/${gameId}`);
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    return ( 
        <form onSubmit={makePlayer}>
            Please Enter Your Name and a Valid Email <br></br>
            <input type="text" name="name" onChange={handleName} value={name} /><br></br>
            <input type="text" name="email" onChange={handleEmail} value={email} /><br></br>
            <input type="submit" value="Submit" />
        </form>
     );
}
 
export default withRouter(PlayerForm);