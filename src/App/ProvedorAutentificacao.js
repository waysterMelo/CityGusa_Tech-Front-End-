import React from 'react';
import AuthService from "./service/authService";
import usuarioService from "./service/UsuarioService";
import ApiService from "./ApiService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthConsumer.Provider;

class ProvedorAutentificacao extends React.Component{

    state = {
        usuarioAutenticado : null,
        isAutenticado : false
    }

    iniciarSessao = (tokenDto) => {
        const token = tokenDto.token;
        ApiService.registrarToken(token);
        AuthService.logar(usuario);
        this.setState({isAutenticado: false, usuarioAutenticado: tokenDto})
    }

}