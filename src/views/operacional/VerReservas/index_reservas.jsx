import React, {useEffect, useRef, useState} from "react";
import {Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../components/banner/Banner";
import { Stat, StatNumber, StatGroup } from '@chakra-ui/react'
import {Button, CardBody, CardTitle, Modal} from "react-bootstrap";
import ControleOperacionalService from "../../../App/OperacionalService/ControleOperacionalService";

const VerReservas = () => {

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
                                <Th className="text-center bg-black text-white">+ | -</Th>
                                <Th className="text-center bg-black text-white">Enf</Th>
                                <Th className="text-center bg-black text-white">Fund</Th>
                                <Th className="text-center bg-black text-white">Coluna</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {operacional.map((operacional, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{operacional.id}</Td>
                                    <Td className="text-center">{formatDate(operacional.createdAt)}</Td>
                                    <Td className="text-center">{operacional.horas}</Td>
                                    <Td className="text-center bg-black text-white">{operacional.positivoNegativo}</Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            {/*{<Flex>*/}
            {/*    <Box w={'30%'} h={'100%'} className={'font-monospace bg-dark-subtle p-5 mt-4'}>*/}
            {/*        <StatGroup>*/}
            {/*            {operacional.length > 0 && operacional[0] && (*/}
            {/*                <Stat>*/}
            {/*                    <CardTitle>UMIDADE MÉDIA DO DIA</CardTitle>*/}
            {/*                   <StatNumber>*/}
            {/*                       {operacional[0].umidadeMedia ? operacional[0].umidadeMedia.toFixed(2) : "N/A"}*/}
            {/*                   </StatNumber>*/}
            {/*                </Stat>*/}
            {/*            )}*/}
            {/*        </StatGroup>*/}
            {/*    </Box>*/}
            {/*    <Box w={'30%'} h={'100%'} className={'font-monospace bg-dark-subtle p-5 mx-3 mt-4'}>*/}
            {/*        <StatGroup>*/}
            {/*            {operacional.length > 0 && operacional[0] && (*/}
            {/*                <Stat>*/}
            {/*                    <CardTitle>DENSIDADE MÉDIA DO DIA</CardTitle>*/}
            {/*                    <StatNumber>{operacional[0].densidadeMedia ? operacional[0].densidadeMedia.toFixed(2) : "N/A"}</StatNumber>*/}
            {/*                </Stat>*/}
            {/*            )}*/}
            {/*        </StatGroup>*/}
            {/*    </Box>*/}
            {/*    <Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5 mx-3 mt-4'}>*/}
            {/*        <StatGroup>*/}
            {/*            {operacional.length > 0 && operacional[0] && (*/}
            {/*                <Stat>*/}
            {/*                    <CardTitle>RITMO ATUAL</CardTitle>*/}
            {/*                    <StatNumber>{operacional[0].mediaManganes ? operacional[0].mediaManganes.toFixed(2) : "N/A"}</StatNumber>*/}
            {/*                </Stat>*/}
            {/*            )}*/}
            {/*        </StatGroup>*/}
            {/*    </Box>*/}
            {/*</Flex>}*/}
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

export default VerReservas;