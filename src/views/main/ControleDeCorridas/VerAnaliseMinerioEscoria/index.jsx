import React, {useEffect, useRef, useState} from "react";
import {Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import ControleDeCorridasService from "../../../../App/ControleCorridasService/ControleDeCorridasService";
import { Stat, StatNumber, StatGroup } from '@chakra-ui/react'
import {Button, CardBody, CardTitle, Modal} from "react-bootstrap";

const VerAnaliseMinerioEscoria = () => {

    const service = useRef(new ControleDeCorridasService()).current;
    const [corridas, setCorridas] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [showNullModal, setShowNullModal]  = useState(service.showNullModal);


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options)
    }

    const fetchCorridasPorData = async (selectedDate) => {
        try {
            if (!selectedDate) {
                setShowNullModal(true);
                return;
            }

            const response = await service.getCorridasPorData(selectedDate);

            if (!response.success) {
                setShowErrorModal(true);
            } else {
                setCorridas(response.data);
            }
        } catch (error) {
            // Log the error for debugging purposes if necessary
            console.error('Erro ao buscar corridas:', error);
            setShowErrorModal(true); // Mostra o modal de erro
        } finally {
            // Reseta o seletor de data após a tentativa
            setDataSelect('');
        }
    };


    useEffect(() => {
        const fetchCorridas = async () => {
            try {
                const data = await service.getCorridasDoDia();
                setCorridas(data);
            } catch (error) {
                console.error("Erro ao buscar corridas:", error);
            }
        };
        fetchCorridas();
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
                <Banner url_voltar={'/admin/controle-corrida'}
                        texto_secundario={'Veja análise do silício, Fósforo, Manganês, Sílica, Escória '}>
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
                                    <Button colorScheme='blue' mt={4} onClick={() => fetchCorridasPorData(dataSelect)}>
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
                                <Th className="text-center">Data</Th>
                                <Th className="text-center">Silica Real</Th>
                                <Th className="text-center">Silica Visual</Th>
                                <Th className={'text-center'}>Fósforo</Th>
                                <Th className="text-center">Manganês</Th>
                                <Th className="text-center">Sílica</Th>
                                <Th className="text-center">Tipo Escória</Th>
                                <Th className="text-center">Início de Vazamento escória</Th>
                                <Th className={'text-center'}>Fim de vazamento escória</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {corridas.map((corrida, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{corrida.id}</Td>
                                    <Td className="text-center">{formatDate(corrida.createdAt)}</Td>
                                    <Td className="text-center">{corrida.silicioReal}</Td>
                                    <Td className="text-center">{corrida.silicioVisual}</Td>
                                    <Td className={'text-center'}>{corrida.fosforo}</Td>
                                    <Td className="text-center">{corrida.manganes}</Td>
                                    <Td className="text-center">{corrida.silica}</Td>
                                    <Td className="text-center">{corrida.tipoEscoria}</Td>
                                    <Td className="text-center">{corrida.escoriaInicio}</Td>
                                    <Td className={'text-center'}>{corrida.escoriaFim}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Flex>
                <Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5'}>
                    <StatGroup>
                        {corridas.length > 0 && corridas[0] && (
                            <Stat>
                                <CardTitle>Média Fósforo</CardTitle>
                               <StatNumber>
                                   {corridas[0].mediaFosforo ? corridas[0].mediaFosforo.toFixed(2) : "N/A"}
                               </StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
                <Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5 mx-3'}>
                    <StatGroup>
                        {corridas.length > 0 && corridas[0] && (
                            <Stat>
                                <CardTitle>Média Sílica</CardTitle>
                                <StatNumber>{corridas[0].mediaSilica ? corridas[0].mediaSilica.toFixed(2) : "N/A"}</StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
                <Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5 mx-3'}>
                    <StatGroup>
                        {corridas.length > 0 && corridas[0] && (
                            <Stat>
                                <CardTitle>Média Manganês</CardTitle>
                                <StatNumber>{corridas[0].mediaManganes ? corridas[0].mediaManganes.toFixed(2) : "N/A"}</StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
            </Flex>
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

export default VerAnaliseMinerioEscoria;