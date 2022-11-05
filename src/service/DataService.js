import axios from 'axios'

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'http://localhost:8080/game';

class DataService {    

    createUser(body) {
        return axios.post(`${url}/user`, body)
    }
    login(body) {
        return axios.get(`${url}/user`, body)
    }
    startLocalGame(body) {
        return axios.post(`${url}`, body)
    }
    selectPiece(body, id) {
        return axios.get(`${url}/${id}`, body);
    }
    movePiece(body, id) {
        return axios.post(`${url}/${id}`, body);
    }
    selectPromotion(body, id) {
        return axios.post(`${url}/${id}/promotion`, body);
    }



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