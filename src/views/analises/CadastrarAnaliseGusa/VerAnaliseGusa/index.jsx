import React, { useEffect, useRef, useState } from "react";
import {Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import { Stat, StatNumber, StatHelpText, StatGroup } from '@chakra-ui/react'
import {Button, CardBody, CardTitle, Modal} from "react-bootstrap";
import AnaliseGusaService from "../../../../App/AnalisesService/AnaliseGusaService";



const VerAnaliseGusa = () => {

    const service = useRef(new AnaliseGusaService()).current;
    const [corridas, setCorridas] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [showNullModal, setShowNullModal]  = useState(service.showNullModal);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options)
    }
    

    const fetchAnaliseToday = async (date) => {
        try {
            if (!date){
                setShowNullModal(true)
                return;
            }
            let data;
            if (date) {
                data = await service.getAnalisePorData(date);
            }
            if (data.success === false) {
                setShowErrorModal(service.showErrorModal)
            } else {
                setCorridas(data.data);
            }
        } catch (error) {
            return ''
        } finally {
            setDataSelect('')
        }
    }

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
                                    <Button colorScheme='blue' mt={4} onClick={() => fetchAnaliseToday(dataSelect)}>
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
                            {corridas.map((corrida, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{corrida.id}</Td>
                                    <Td className="text-center">{corrida.id}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5'}>
                <StatGroup>
                    {corridas.length > 0 && corridas[0] && (
                        <Stat>
                            <CardTitle>Minutos do Dia Acumulados</CardTitle>
                            <StatNumber>{corridas[0].minutosAcumulados || "N/A"}</StatNumber>
                            <StatHelpText>
                                {corridas[0].createdAt ? formatDate(corridas[0].createdAt) : "Data não disponível"}
                            </StatHelpText>
                        </Stat>
                    )}
                </StatGroup>
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