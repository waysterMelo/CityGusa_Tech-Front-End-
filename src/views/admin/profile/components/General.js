// Chakra imports
import {SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";
import {Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
            <Container fluid={'lg'}>
                <Row className={'justify-content-end'}>
                    <Col lg={'2'} className={'text-center'}>
                        <Button variant={'secondary'}>12-01-2024</Button>
                    </Col>
                </Row>
            </Container>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Observações do turno
      </Text>

      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
       Este documento servirá como um registro abrangente e detalhado
        das atividades, eventos e ocorrências relevantes que se desenrolam em cada turno.
      </Text>
      <SimpleGrid columns='1' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='TURNO 22:00H, AS 06:00H'
          value='Sebastião/Matheus
-Favor Providenciar uma cobertura para caçamba de finos de minério visando chuva.
-Colocar raspador de retorno na correia de finos, está caindo muito finos no chão.
-AF tamponado as 04:30 horas com Rabicho Fino para confecção do Furo de corrida.'
        />
        <Information
          boxShadow={cardShadow}
          title='TURNO 06:00H, AS 14:00H'
          value='Lâmina de 1670 Kg (+20Kg) na carga 82 às 10:48 horas. Visando melhorar produção.
          Abrimos AF às 12'
        />
        <Information
          boxShadow={cardShadow}
          title='TURNO 14:00H, AS 22:00H'
            value='Favor Providenciar uma cobertura para caçamba de finos de minério visando chuva.
                  -Colocar raspador de retorno na correia de finos, está caindo muito finos no chão.
                    -AF tamponado as 04:30 horas com Rabicho Fino para confecção do Furo de corrida.'
        />

      </SimpleGrid>
    </Card>
  );
}
