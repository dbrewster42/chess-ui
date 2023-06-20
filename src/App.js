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
  const [undo, setUndo] = useState(false);
  let [promotionOptions, setPromotionOptions] = useState();


  const toggleUndo = (allowUndo) => {
    setUndo(allowUndo);
  }

  const setTheBoard = data => {
    setWhitePlayer(data.whitePlayer)
    setBlackPlayer(data.blackPlayer)
    setPromotionOptions(data.promotionOptions)
    // setAllMoves(new Map(Object.entries(data.allMoves)));
  }

  return (
    <Router>
      <Header />      
      <Switch>   
         
        <Route exact path="/">
          <Welcome setTheBoard={setTheBoard} toggleUndo={toggleUndo} />
        </Route>

        <Route exact path={`/game/:gameId`} render={() => <Game whitePlayer={whitePlayer} blackPlayer={blackPlayer} promotionOptions={promotionOptions} undo={undo} /> } />

      </Switch>
    </Router>
    
  );
}

export default App;
