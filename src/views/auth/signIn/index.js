import React from 'react';
import { Card, Col, Container, Form, Button, Modal } from 'react-bootstrap';
import logo from "assets/img/logo.webp";
import "assets/css/LoginCss.css";
import UsuarioService from "../../../App/service/UsuarioService";
import LocalStorage from "../../../App/service/LocalStorage";

class Login extends React.Component {
    constructor() {
        super();
        this.service = new UsuarioService();
    }

    state = {
        nome: '', senha: '', mensagemErro: null, showErrorModal: false
    };

    entrar = (event) => {
        event.preventDefault();
        this.service.autenticar({ nome: this.state.nome, senha: this.state.senha })
            .then(response => {
                // Redirecionar para a página principal após login bem-sucedido
                LocalStorage.adicionarItem('_usuario_logado', response.data);
                this.props.history.push('/admin/home')
            })
            .catch(erro => {
                this.setState({ mensagemErro: erro.response.data, showErrorModal: true });
            })
    }

    handleClose = () => {
        this.setState({ showErrorModal: false });
    }

    render() {
        return (
            <Container fluid className="d-flex justify-content-center align-items-center vh-100 backgroundImg">
                <Col xs={12} md={6} lg={4} xl={4}>
                    <Card className="rounded-4 text-black">
                        <Card.Body className="px-4 mx-md-5">
                            <img className="logo-tamanho mx-auto img-thumbnail my-3" src={logo} alt="logo" />
                            <p className="text-center mt-3">Faça login com sua conta</p>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nome">Usuário</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="inputName"
                                        placeholder="Usuário corporativo"
                                        value={this.state.nome}
                                        onChange={e => this.setState({ nome: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="senha">Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="inputSenha"
                                        placeholder="***************"
                                        value={this.state.senha}
                                        onChange={e => this.setState({ senha: e.target.value })}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button onClick={this.entrar} variant="warning" type="submit">Entrar</Button>
                                </div>

                            <div className="text-center pt-1 my-5 pb-1">
                                <h2 className="">CITYGUSA <b className="tech">TECH</b></h2>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Modal show={this.state.showErrorModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Erro de Autentificação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.mensagemErro}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default React.memo(Login);
