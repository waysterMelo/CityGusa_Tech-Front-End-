import React, { useEffect, useRef, useState } from "react";
import {Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {Button, CardBody,  Modal} from "react-bootstrap";
import Banner from "../../../../components/banner/Banner";
import CadastroMineriosService from "../../../../App/AnalisesService/Minerios/CadastroMineriosService";


const PesquisarCadastroMinerios = () => {

    const service = useRef(new CadastroMineriosService()).current;
    const [cadastros, setCadastros] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [showNullModal, setShowNullModal]  = useState(service.showNullModal);


    const formatDate =(dateString) => {
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

   const fetchCadastrosPorData = async (date) => {
       if (!date) {
           handleNullDateError();
           return;
       }
       try {
           const rs = await service.getCadastrosPorData(date);
           handleServiceRewsponse(rs);
       } catch (error) {
           handleError(error);
       } finally {
           resetDataSelect();
       }
   }

    // Função para lidar com erros de data nula
    const handleNullDateError = () => {
        setShowNullModal(true);
    }

    // Função para lidar com a resposta do serviço
    const handleServiceRewsponse = (rs) =>{
        if (!rs.success){
            setShowErrorModal(true);
        }else{
            setCadastros(rs.data);
        }
    }

    // Função para lidar com erros de requisição
    const handleError = (error) => {
        console.error('Erro ao buscar informações:', error);
        setShowErrorModal(true);
    }

    // Função para resetar o seletor de data
    const resetDataSelect = () => {
        setDataSelect('');
    }


    useEffect(() => {
        const fetchCadastrosPorData = async () => {
            try {
                const data = await service.getCadastrosDoDia();
                setCadastros(data);
            } catch (error) {
                console.error("Erro ao buscar cadastros:", error);
            }
        };
        fetchCadastrosPorData();
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
                <Banner url_voltar={'analise-minerio'}>
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
                                    <Button colorScheme='blue' mt={4} onClick={() => fetchCadastrosPorData(dataSelect)}>
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
                                <Th className="text-center">MINÉRIO</Th>
                                <Th className="text-center">VALOR TONELADA</Th>
                                <Th className="text-center">LOTE</Th>
                                <Th className="text-center">PÁTIO</Th>
                                <Th className="text-center">TRANSPORTADOR</Th>
                                <Th className="text-center">VALOR FRETE</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {cadastros.map((rs, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{rs.id}</Td>
                                    <Td className="text-center">{formatDate(rs.createdAt)}</Td>
                                    <Td className="text-center text-uppercase">{rs.minerio}</Td>
                                    <Td className="text-center text-uppercase">{rs.valorTonelada}</Td>
                                    <Td className="text-center text-uppercase">{rs.lote}</Td>
                                    <Td className="text-center text-uppercase">{rs.patio}</Td>
                                    <Td className="text-center text-uppercase">{rs.transportador}</Td>
                                    <Td className="text-center text-uppercase">{rs.frete}</Td>
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

export default PesquisarCadastroMinerios;