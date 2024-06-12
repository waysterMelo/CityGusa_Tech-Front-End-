import React from 'react';
import { Card, Col, Container, Form, Button } from 'react-bootstrap';
import logo from "assets/img/logo.webp";
import "assets/css/LoginCss.css";
import UsuarioService from "../../../App/service/UsuarioService";
import LocalStorage from "../../../App/service/LocalStorage";
import { mensagemErro } from "../../../components/toarst/toarst"

class Login extends React.Component{

   constructor() {
     super();
     this.service = new UsuarioService();
   }

   state = {
     email:'', senha:'', messagemErro:null
   }

   entrar=()=> {
       this.service.autenticar({email: this.state.email, senha: this.state.senha})
           .then(response => {
               LocalStorage.adicionarItem('_usuario_logado', response.data)
               this.props.history.push('/home')
           }).catch(erro => {
           if (erro.response && erro.response.data) {
               this.setState({mensagemErro: erro.response.data});
           } else {
               this.setState({mensagemErro: "Erro ao tentar autenticar. Por favor, tente novamente."});
           }
       });
   }



  render() {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 backgroundImg">
          <Col xs={12} md={6} lg={4} xl={4}>
            <Card className="rounded-4 text-black">

              {this.state.messagemErro && (
                  <div className="alert alert-dismissible alert-danger my-5">
                    <span>{this.state.messagemErro}</span>
                  </div>
              )}


              <Card.Body className="px-4 mx-md-5">
                <img className="logo-tamanho mx-auto img-thumbnail my-3" src={logo} alt="logo" />

                  <p className="text-center mt-3">Faça login com sua conta</p>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="nome">Usuário</Form.Label>
                    <Form.Control
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Usuário corporativo"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="senha">Senha</Form.Label>
                    <Form.Control
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="***************"
                        value={this.state.senha}
                        onChange={e => this.setState({senha: e.target.value})}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center"> {/* Centralizando o botão */}
                    <Button variant="warning" type="submit" onClick={this.entrar}>Entrar</Button>
                  </div>

                <div className="text-center pt-1 my-5 pb-1">
                  <h2 className="">CITYGUSA <b className="tech">TECH</b></h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Container>
    )
  }


}


export default React.memo(Login);
