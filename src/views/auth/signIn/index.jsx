import React, { useState } from 'react';
import { Card, Col, Container, Form, Button } from 'react-bootstrap';
import logo from "assets/img/logo.png";
import "assets/css/LoginCss.css";


const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // const entrar =()=>{
  //   this.service.autenticar({nome:this.state.email,senha:this.state.senha}).then(
  //        response=>{
  //     this.context.iniciarSessao(response.data).this.props.history.push('/sign-in')
  //        }).catch(erro=>(erro.response.data))
  // }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Implement login logic here (e.g., call an API or perform validation)
    console.log('Email:', email);
    console.log('Senha:', senha);
  };

  return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 backgroundImg">
        <Col xs={12} md={6} lg={4} xl={4}>
          <Card className="rounded-4 text-black">
            <Card.Body className="px-4 mx-md-5">
              <img className="logo-tamanho mx-auto img-thumbnail my-3" src={logo} alt="logo" />
              <Form onSubmit={handleSubmit}>
                <p className="text-center mt-3">Faça login com sua conta</p>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nome">Usuário</Form.Label>
                  <Form.Control
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Usuário corporativo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="senha">Senha</Form.Label>
                  <Form.Control
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="***********"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center"> {/* Centralizando o botão */}
                  <Button variant="warning" type="submit">Entrar</Button>
                </div>
              </Form>
              <div className="text-center pt-1 my-5 pb-1">
                <h2 className="">CITYGUSA <b className="tech">TECH</b></h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Container>
  );
};

export default Login;