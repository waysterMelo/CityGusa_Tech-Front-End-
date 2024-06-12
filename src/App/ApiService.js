import axios from "axios"

const httpCliente = axios.create({baseURL: 'http://localhost:8080'})

class ApiService {

    constructor(apiturl) {
        this.apiturl = apiturl;
    }
    post(url, objeto){
        const request = `${this.apiturl}${url}`;
        return httpCliente.post(request, objeto);
    }

    put(url, objeto){
        const request = `${this.apiturl}${url}`;
        return httpCliente.put(request, objeto);
    }

    get(url, objeto){
        const request = `${this.apiturl}${url}`;
        return httpCliente.get(request, objeto);
    }

    delete(url){
        const request = `${this.apiturl}${url}`;
        return httpCliente.delete(request);
    }
}

export default  ApiService;