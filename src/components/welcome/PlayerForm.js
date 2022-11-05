import React, {useState} from 'react';
import "./Welcome.css"
import { withRouter, useHistory } from 'react-router-dom';
import DataService from '../../service/DataService';

const PlayerForm = props => {
    const [name, setName] = useState("Mr. Magoo");
    const [name2, setName2] = useState("Mrs. Chu");
    const [email, setEmail] = useState("Magoo@gmail.com");
    const history = useHistory();

    const handleName = e => {               
        setName(e.target.value);
    }   
    const handleName2 = e => {               
        setName2(e.target.value);
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
       
        DataService.createUser(body)
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
    const login = (e) => {
        e.preventDefault(); 
        console.log(e.target.name.value);
        const body = {                
            name, 
            email
        }
       
        DataService.createUser(body)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const startLocalGame = (e) => {
        e.preventDefault(); 
        console.log(e.target);
        const body = {                
            user : name, 
            user2 : name2
        }
       
        DataService.startLocalGame(body)
        .then(res => {
            console.log(res)
            let gameId = res.data.id;
            props.setTheBoard(res.data);  
        //     console.log("the game id is ", gameId);        
            history.push(`/game/${gameId}`);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return ( 
        <div>
            <form onSubmit={makePlayer}>
                Please Enter Your Name and a Valid Email To Create a New Account<br /><br />
                name  <input type="text" name="name" onChange={handleName} value={name} /><br />
                email <input type="text" name="email" onChange={handleEmail} value={email} /><br />
                <input type="submit" value="Submit" />
            </form>
            {/* <form onSubmit={login}>
                Please Log In<br /><br />
                name  <input type="text" name="name" onChange={handleName} value={name} /><br />
                <input type="submit" value="Submit" />
            </form> */}
            <form onSubmit={startLocalGame}>
                Start a Local Game<br /><br />
                white name  <input type="text" name="name" onChange={handleName} value={name} /><br />
                black name  <input type="text" name="name2" onChange={handleName2} value={name2} /><br />
                <input type="submit" value="Submit" />
            </form>
            <Submit>Find a Game</Submit>
        </div>

        
     );
}
 
export default withRouter(PlayerForm);