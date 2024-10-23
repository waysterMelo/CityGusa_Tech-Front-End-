import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Grid, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Button, CardBody, Modal } from "react-bootstrap";
import Banner from "../../../../components/banner/Banner";
import CadastrarAnaliseEscoriaService from "../../../../App/AnalisesService/Minerios/CadastrarAnaliseEscoriaService";

const VerAnaliseEscoria = () => {
    const service = useRef(new CadastrarAnaliseEscoriaService()).current;
    const [analises, setAnalises] = useState([]);
    const [dataSelect, setDataSelect] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showNullModal, setShowNullModal] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        if (isNaN(date)) {
            return ""; // Retorna uma string vazia se a data for inválida
        }

        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const formatTime = (timeValue) => {
        if (!timeValue) return "";

        // Verifica o valor e o tipo de timeValue
        console.log('timeValue:', timeValue, 'type:', typeof timeValue);

        const timeStr = String(timeValue);

        const match = timeStr.match(/^(\d{2}):(\d{2})/);
        if (match) {
            const hours = match[1];
            const minutes = match[2];
            return `${hours}:${minutes}`;
        }

        return "";
    };


    const fetchAnalisesPorData = async (date) => {
        if (!date) {
            setShowNullModal(true);
            return;
        }

        try {
            const response = await service.getAnalisesPorData(date);
            if (response.success) {
                setAnalises(response.data);
            } else {
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            setShowErrorModal(true);
        } finally {
            setDataSelect("");
        }
    };

    useEffect(() => {
        const fetchAnalisesEscoria = async () => {
            try {
                const data = await service.getAnaliseDoDia();
                setAnalises(data);
            } catch (error) {
                console.error("Erro ao buscar analises:", error);
            }
        };
        fetchAnalisesEscoria();
    }, [service]);

    const handleCloseModal = () => {
        setShowErrorModal(false);
        setShowNullModal(false);
    };

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid gridTemplateColumns="repeat(1, 1fr)" gap={{ base: "20px", xl: "20px" }} display={{ base: "block", xl: "grid" }}>
                <Banner url_voltar="analise-escoria">
                    <Grid width="50%">
                        <Box bg="white" p={5}>
                            <Heading size="md" pb={3}>Pesquisar Informação por data</Heading>
                            <CardBody>
                                <Flex>
                                    <Input
                                        placeholder="Selecione a data"
                                        type="date"
                                        value={dataSelect}
                                        onChange={(e) => setDataSelect(e.target.value)}
                                    />
                                    <Button colorScheme="blue" mt={4} onClick={() => fetchAnalisesPorData(dataSelect)}>
                                        Pesquisar
                                    </Button>
                                </Flex>
                            </CardBody>
                        </Box>
                    </Grid>
                </Banner>
            </Grid>
            <Box w="100%" h="100%" fontFamily="monospace">
                <TableContainer>
                    <Table className={'table-bordered bg-white'} size="sm" variant="simple">
                        <Thead>
                            <Tr>
                                {['ID', 'DATA', 'HORAS', 'CÁLCIO', 'SILÍCIO', 'ALUMÍNIO', 'MAGNÉSIO', 'MANGANÊS', 'FERRO', 'IB', 'IF'].map((header, index) => (
                                    <Th key={index} className={index > 8 ? "text-center bg-dark text-white" : "text-center"}>{header}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {analises.map((rs, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{rs.id}</Td>
                                    <Td className="text-center">{formatDate(rs.createdAt)}</Td>
                                    <Td className="text-center">{formatTime(rs.horas)}</Td>
                                    <Td className="text-center">{rs.calcio}</Td>
                                    <Td className="text-center">{rs.silicio}</Td>
                                    <Td className="text-center">{rs.aluminio}</Td>
                                    <Td className="text-center">{rs.magnesio}</Td>
                                    <Td className="text-center">{rs.manganes}</Td>
                                    <Td className="text-center">{rs.ferro}</Td>
                                    <Td className="text-center bg-dark text-white">{rs.indexB}</Td>
                                    <Td className="text-center bg-dark text-white">{rs.indexF}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {[{ show: showErrorModal, header: 'Erro ao consultar informações', body: 'Não existem informações na data selecionada.', variant: 'danger' },
                { show: showNullModal, header: 'Data não preenchida', body: 'Nenhuma data foi selecionada!', variant: 'warning' }]
                .map(({ show, header, body, variant }, index) => (
                    <Modal key={index} show={show} onHide={handleCloseModal}>
                        <Modal.Header className={`bg-${variant}`} closeButton>
                            <Modal.Title>{header}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Text>{body}</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="bg-dark text-white" onClick={handleCloseModal}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>
                ))}
        </Box>
    );
};

export default VerAnaliseEscoria;