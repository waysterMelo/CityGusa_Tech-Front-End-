import ApiService from "../ApiService";

class CadastroDeCorridas extends ApiService{


    constructor() {
        super('/corridas')
    }

    salvar(corrida){
        return this.post('/add', corrida)
    }
}

export default CadastroDeCorridas;