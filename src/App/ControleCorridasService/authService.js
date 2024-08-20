import LocalStorage from "./LocalStorage";
import jwt from 'jsonwebtoken'
import ApiService from '../ApiService';

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN = 'access_token'

export default class AuthService{

    static isUsuarioAutenticado(){
        const usuario = LocalStorage.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static logar(usuario){
        LocalStorage.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioLogado(){
        return LocalStorage.obterItem(USUARIO_LOGADO);
    }

    static removerUsuarioLogado(){
        LocalStorage.removerItem(USUARIO_LOGADO);
    }

}
