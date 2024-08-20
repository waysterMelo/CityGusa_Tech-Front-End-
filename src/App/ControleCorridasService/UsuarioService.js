import ApiService from "../ApiService";


class UsuarioService extends ApiService {

    constructor() {
        super('/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    salvar(usuario) {
        return this.post('/salvar', usuario)
    }
}

export default UsuarioService;
