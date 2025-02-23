import React, {useEffect, useRef, useState} from "react";
import {Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../components/banner/Banner";
import { Stat, StatNumber, StatGroup } from '@chakra-ui/react'
import {Button, CardBody, CardTitle, Modal} from "react-bootstrap";
import ControleOperacionalService from "../../../App/OperacionalService/ControleOperacionalService";

const VerCargaPressaoTemperaturaSonda = () => {

    const service = useRef(new ControleOperacionalService()).current;
    const [operacional, setOperacional] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [showNullModal, setShowNullModal]  = useState(service.showNullModal);


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options)
    }

    const fetchOperacionalPorData = async (selectedDate) => {
        try {
            if (!selectedDate) {
                setShowNullModal(true);
                return;
            }

            const response = await service.getOperacionalPorData(selectedDate);

            if (!response.success) {
                setShowErrorModal(true);
            } else {
                setOperacional(Array.isArray(response.data.dados) ? response.data.dados : [])
            }
        } catch (error) {
            // Log the error for debugging purposes if necessary
            console.error('Erro ao buscar info...', error);
            setShowErrorModal(true); // Mostra o modal de erro
        } finally {
            // Reseta o seletor de data após a tentativa
            setDataSelect('');
        }
    };


    useEffect(() => {
        const fetchOperacional = async () => {
            try {
                const data = await service.getOperacionalDoDia();
                setOperacional(Array.isArray(data.dados) ? data.dados : []);
            } catch (error) {
                console.error("Erro ao buscar corridas:", error);
            }
        };
        fetchOperacional();
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
                <Banner url_voltar={'/admin/operacional'}
                        texto_secundario={''}>
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
                                    <Button colorScheme='blue' mt={4}  onClick={() => fetchOperacionalPorData(dataSelect)}>
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
                    <Table colorScheme={'twitter'} className={'table table-responsive-sm table-bordered'} size={'sm'}>
                        <Thead>
                            <Tr>
                                <Th className="text-center">ID</Th>
                                <Th className="text-center">Data</Th>
                                <Th className="text-center">Hora</Th>
                                <Th className="text-center">Gaiola</Th>
                                <Th className={'text-center'}>A</Th>
                                <Th className="text-center">Carga <br/> Seca</Th>
                                <Th className="text-center bg-black text-white">Carga/Seca <br/> Acum</Th>
                                <Th className="text-center">Carga <br/> Hora</Th>
                                <Th className="text-center text-center bg-black text-white">Carga Acumulada <br/> Hora</Th>
                                <Th className="text-center bg-black text-white">Média <br/> Hora</Th>
                                <Th className="text-center bg-black text-white">Ritmo</Th>
                                <Th className="text-center">Vazão</Th>
                                <Th className="text-center">Densidade KG/M³</Th>
                                <Th className="text-center bg-black text-white">Densidade <br/> média</Th>
                                <Th className={'text-center'}>Umidade</Th>
                                <Th className={'text-center bg-black text-white'}>Umidade <br/> Média </Th>
                                <Th className={'text-center'}>Pressão <br/> Coroa</Th>
                                <Th className={'text-center'}>Pressão <br/> Topo</Th>
                                <Th className={'text-center'}>Temperatura <br/> Coroa</Th>
                                <Th className={'text-center'}>Temperatura <br/> Topo</Th>
                                <Th className={'text-center'}>Sonda</Th>

                            </Tr>
                        </Thead>
                        <Tbody >
                            {operacional.map((operacional, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{operacional.id}</Td>
                                    <Td className="text-center">{formatDate(operacional.createdAt)}</Td>
                                    <Td className="text-center">{operacional.horas}</Td>
                                    <Td className="text-center">{operacional.gaiola}</Td>
                                    <Td className={'text-center'}>{operacional.a}</Td>
                                    <Td className="text-center">{operacional.cargaSeca}</Td>
                                    <Td className="text-center bg-black text-white">{operacional.acumuladoCargaSeca}</Td>
                                    <Td className="text-center">{operacional.cargaHora}</Td>
                                    <Td className="text-center bg-black text-white">{operacional.acumuladoCarga}</Td>
                                    <Td className="text-center bg-black text-white">{operacional.mediaHoraCarga}</Td>
                                    <Td className="text-center bg-black text-white">{operacional.rt}</Td>
                                    <Td className="text-center">{operacional.vazao}</Td>
                                    <Td className="text-center">{operacional.densidadeKg}</Td>
                                    <Td className="text-center bg-black text-white">{operacional.densidadeMedia}</Td>
                                    <Td className={'text-center'}>{operacional.umidade}</Td>
                                    <Td className={'text-center bg-black text-white'}>{operacional.umidadeMedia}</Td>
                                    <Td className="text-center">{operacional.pressaoCoroa}</Td>
                                    <Td className={'text-center'}>{operacional.pressaoTopo}</Td>
                                    <Td className={'text-center'}>{operacional.temperaturaCoroa}</Td>
                                    <Td className={'text-center'}>{operacional.temperaturaTopo}</Td>
                                    <Td className={'text-center'}>{operacional.sonda}</Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Flex>
                <Box w={'30%'} h={'100%'} className={'font-monospace bg-dark-subtle p-5 mt-4'}>
                    <StatGroup>
                        {operacional.length > 0 && operacional[0] && (
                            <Stat>
                                <CardTitle>UMIDADE MÉDIA DO DIA</CardTitle>
                               <StatNumber>
                                   {operacional[0].umidadeMedia ? operacional[0].umidadeMedia.toFixed(2) : "N/A"}
                               </StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
                <Box w={'30%'} h={'100%'} className={'font-monospace bg-dark-subtle p-5 mx-3 mt-4'}>
                    <StatGroup>
                        {operacional.length > 0 && operacional[0] && (
                            <Stat>
                                <CardTitle>DENSIDADE MÉDIA DO DIA</CardTitle>
                                <StatNumber>{operacional[0].densidadeMedia ? operacional[0].densidadeMedia.toFixed(2) : "N/A"}</StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
                <Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5 mx-3 mt-4'}>
                    <StatGroup>
                        {operacional.length > 0 && operacional[0] && (
                            <Stat>
                                <CardTitle>RITMO ATUAL</CardTitle>
                                <StatNumber>{operacional[0].mediaManganes ? operacional[0].mediaManganes.toFixed(2) : "N/A"}</StatNumber>
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

export default VerCargaPressaoTemperaturaSonda;