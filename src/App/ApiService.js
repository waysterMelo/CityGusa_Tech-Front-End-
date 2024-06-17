import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl
    }

    post(url, objeto){
        const requestURI = `${this.apiurl}${url}`
        return httpClient.post(requestURI, objeto)
    }

    put(url, objeto){
        const requestURI = `${this.apiurl}${url}`
        return httpClient.put(requestURI, objeto)
    }

    get(url){
        const requestURI = `${this.apiurl}${url}`
        return httpClient.get(requestURI)
    }

    delete(url){
        const requestURI = `${this.apiurl}${url}`
        return httpClient.delete(requestURI)
    }

}

export default ApiService;