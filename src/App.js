import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Header from "./components/header/Header"
import Welcome from "./components/welcome/Welcome"
import Game from "./components/game/Game"

function App() {
  // const [data, setData] = useState([]);
  const [whitePlayer, setWhitePlayer] = useState();
  const [blackPlayer, setBlackPlayer] = useState();
  let [pieces, setPieces] = useState([]);
  let [status, setStatus] = useState();
  const [undo, setUndo] = useState(false);

  // const showBoard = () => {
  //   DataService.getBoard()
  //       .then(res => {
  //           console.log(res.data);
  //           let newData = res.data;
  //           setData([...newData]);
  //       })
  //       .catch(error => console.log(error))
  //   }
  const toggleUndo = (allowUndo) => {
    setUndo(allowUndo);
  }

  const setTheBoard = data => {
    //console.log("app", data);
    // setData(data);    
    setPieces(new Map(Object.entries(data.pieces).map(([k, v]) => [+k, v])))
    setStatus(data.status)
    setWhitePlayer(data.whitePlayer)
    setBlackPlayer(data.blackPlayer)
  }

  return (
    <Router>
      <Header />      
      <Switch>   
         
        <Route exact path="/">
          <Welcome setTheBoard={setTheBoard} toggleUndo={toggleUndo} />
        </Route>

        <Route exact path={`/game/:gameId`} render={() => <Game pieces={pieces} status={status} whitePlayer={whitePlayer} blackPlayer={blackPlayer} setTheBoard={setTheBoard} undo={undo} /> } />

      </Switch>
    </Router>
    
  );
}

export default App;

// return (
//   <Router>
//     <Header />      
//     <Switch>   
       
//       <Route exact path="/">
//         <Welcome />
//       </Route>

//       <Route exact path={`/game/:gameId`} render={() => <Game /> } />

//     </Switch>
//   </Router>
  
// );