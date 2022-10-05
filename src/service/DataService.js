import axios from 'axios'

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'http://localhost:8080/game';

class DataService {
    
    // getBoard(){
    //     return axios.get(`${url}`);
    // }

    // getStatus(){
    //     return axios.get(`${url}/status`)
    // }
    restartGame(){
        return axios.post(`${url}/restart`);
    }

    createPlayers(body){
        return axios.post(`${url}/players`, body);
    }

    makeMove(move){
        return axios.post(`${url}`, move);
    }

    displayMoves(){
        return axios.get(`${url}/moves`);
    }

    endGame(endRequest){
        return axios.post(`${url}/end`, endRequest);
    }
   
}
 
export default new DataService();