import axios from 'axios'

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'http://localhost:8080/game';

class DataService {    

    restartGame(){
        return axios.post(`${url}/restart`);
    }

    createPlayers(body){
        return axios.post(`${url}/players`, body);
    }

    makeMove(move, id){
        return axios.post(`${url}/${id}`, move);
    }

    displayMoves(id){
        return axios.get(`${url}/${id}/moves`);
    }

    endGame(endRequest, id){
        return axios.post(`${url}/${id}/end`, endRequest);
    }

    undo(id){
        return axios.post(`${url}/${id}/undo`);
    }
   
}
 
export default new DataService();