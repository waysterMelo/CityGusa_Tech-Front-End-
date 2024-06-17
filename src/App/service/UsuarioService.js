import ApiService from "../ApiService";


class UsuarioService extends ApiService {

    constructor() {
        super('/users');
    }

    autenticar(credenciais){
        return this.post('/authenticate', credenciais)
    }

    salvar(usuario){
        return this.post('/salvar', usuario)
    }
}

export default UsuarioService;
