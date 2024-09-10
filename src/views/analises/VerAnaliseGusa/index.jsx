import React, { useEffect, useRef, useState } from "react";
import {Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../components/banner/Banner";
import {Button, CardBody,  Modal} from "react-bootstrap";
import AnaliseGusaService from "../../../App/AnalisesService/AnaliseGusaService";



const VerAnaliseGusa = () => {

    const service = useRef(new AnaliseGusaService()).current;
    const [analises, setAnalises] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [showNullModal, setShowNullModal]  = useState(service.showNullModal);


    const formatDate =(dateString) => {
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }




    useEffect(() => {
        const fetchAnaliseGusa = async () => {
            try {
                const data = await service.getAnaliseDoDia();
                setAnalises(data);
            } catch (error) {
                console.error("Erro ao buscar analises:", error);
            }
        };
        fetchAnaliseGusa();
    }, [service]);

    const handleClose = () => {
        service.handleClose(null, setShowErrorModal, setShowNullModal);
    };

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url_voltar={'analise-gusa'}>
                    <Grid width={'50%'}>
                        <Box bg={'white'} className={'p-5'}>
                            <Heading size='md' className={'pb-3'}>Pesquisar Informação por data</Heading>
                            <CardBody>
                                <Flex>
                                    <Input
                                        placeholder='Selecione a data'
                                        type='date'
                                        value={dataSelect}
                                        onChange={(e) => {setDataSelect(e.target.value)}}/>
                                    <Button colorScheme='blue' mt={4}>
                                        Pesquisar
                                    </Button>
                                </Flex>
                            </CardBody>
                        </Box>
                    </Grid>
                </Banner>
            </Grid>
            <Box w={'100%'} h={'100%'} className={'font-monospace'}>
                <TableContainer>
                    <Table colorScheme={'twitter'} className={'table table-responsive-sm'} size={'sm'}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th className="text-center">DATA</Th>
                                <Th className="text-center">FERRO</Th>
                                <Th className="text-center">ENXOFRE</Th>
                                <Th className="text-center">FOSFORO</Th>
                                <Th className="text-center">MANGANES</Th>
                                <Th className="text-center">SILICIO</Th>
                                <Th className="text-center">CROMO</Th>
                                <Th className="text-center">TITANIUM</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {analises.map((rs, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{rs.id}</Td>
                                    <Td className="text-center">{formatDate(rs.createdAt)}</Td>
                                    <Td className="text-center">{rs.fosforo}</Td>
                                    <Td className="text-center">{rs.manganes}</Td>
                                    <Td className="text-center">{rs.silicio}</Td>
                                    <Td className="text-center">{rs.cromo}</Td>
                                    <Td className="text-center">{rs.enxofre}</Td>
                                    <Td className="text-center">{rs.titanium}</Td>
                                    <Td className="text-center">{rs.cromo}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal show={showErrorModal} onHide={handleClose}>
                <Modal.Header className={'bg-danger'} closeButton>
                    <Modal.Title>Erro ao consultar informações</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text>
                        Não existem informações na data selecionada.
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'bg-dark text-white'} onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showNullModal} onHide={handleClose}>
                <Modal.Header className={'bg-warning'} closeButton>
                    <Modal.Title>Data não preenchida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text>
                        Nenhuma data foi selecionada !
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'bg-dark text-white'} onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>

    )

}

export default VerAnaliseGusa;