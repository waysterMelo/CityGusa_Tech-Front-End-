import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import {Button} from "@chakra-ui/react";

export default function NFT(props) {
    const { image, name, titulo, responsavel, responsavelImage, chamar_rota, ...rest } = props;

    return (
        <Card className={'p-2 rounded-5'} style={{ width: '100%', marginBottom: '20px' }} {...rest}>
            <Card.Img className={'img-thumbnail'} variant="top" src={image} style={{ height: '200px', borderRadius: '20px' }} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-secondary my-3">Responsável</span>
                    <div className="d-flex align-items-center">
                        <Image
                            src={responsavelImage}
                            roundedCircle
                            style={{width: '30px', height: '30px', marginRight: '10px'}}
                        /><span className="fw-bold text-primary">{responsavel}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Button colorScheme={'blue'} as={Link} to={chamar_rota} className="w-50 mt-2">
                        Acessar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}