import ApiService from "../ApiService";

class UsuarioService  extends  ApiService{

    constructor() {
        super('/users');
    }

    autenticar(crendencials){
        return this.post('/autenticar', crendencials)
    }

    obterNomeDeUser(id){
        return this.get(`/${id}`)
    }


}

export default UsuarioService;