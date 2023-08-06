import axios from 'axios'

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'http://localhost:8080';

class DataService {    

    createUser(body) {
        return axios.post(`${url}/user`, body)
    }
    login(body) {
        return axios.get(`${url}/user`, body)
    }


    startLocalGame(body) {
        return axios.post(`${url}/chess`, body)
    }
    restartGame(body) {
        return axios.post(`${url}/chess/restart`, body)
    }
    rejoinGame(body) {
        return axios.get(`${url}/chess/rejoin`, body)
    }
    rejoinGameById(id) {
        return axios.get(`${url}/chess/rejoin/${id}`)
    }

    movePiece(body, id) {
        return axios.post(`${url}/chess/${id}`, body);
    }
    getAllMoves(body, id) {
        return axios.get(`${url}/chess/${id}`, body);
    }
    requestDraw(id) {
        return axios.post(`${url}/chess/${id}/draw`);
    }
    forfeit(id) {
        return axios.post(`${url}/chess/${id}/forfeit`);
    }
    undo(id){
        return axios.post(`${url}/chess/${id}/undo`);
    }
   
}
 
export default new DataService();