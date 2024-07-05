import axios from 'axios'

const url = 'http://localhost:8080';

class DataService {

    createUser(body) {
        return axios.post(`${url}/user`, body)
    }
    login(body) {
        return axios.get(`${url}/user`, body)
    }


    startLocalGame(body) {
        return axios.post(`${url}/game`, body)
    }
    startQuickGame() {
        return axios.post(`${url}/game/quick-game`)
    }
    restartGame(body) {
        return axios.post(`${url}/game/restart`, body)
    }
    rejoinGame(body) {
        return axios.post(`${url}/game/rejoin`, body)
    }
    rejoinGameById(id) {
        return axios.get(`${url}/game/rejoin/${id}`)
    }

    movePiece(body, id) {
        return axios.post(`${url}/game/${id}`, body);
    }
    getAllMoves(body, id) {
        return axios.get(`${url}/game/${id}`, body);
    }
    requestDraw(id) {
        return axios.post(`${url}/game/${id}/draw`);
    }
    forfeit(id) {
        return axios.post(`${url}/game/${id}/forfeit`);
    }
    undo(id) {
        return axios.post(`${url}/game/${id}/undo`);
    }

}

export default new DataService();