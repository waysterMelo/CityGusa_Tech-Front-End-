import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import ControleDeCorridasService from "../../../../App/service/ControleDeCorridasService";
import { Stat, StatNumber, StatHelpText, StatGroup } from '@chakra-ui/react'
import { CardTitle } from "react-bootstrap";



const VerCorridas = () => {

    const service = useRef(new ControleDeCorridasService()).current;
    const [corridas, setCorridas] = useState([]);
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options)
    }
    const formatDateTime = (dateTimeString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTimeString).toLocaleDateString('pt-BR', options).replace(',', '');
    };

    useEffect(() => {
        const fetchCorridas = async () => {
            try {
                const data = await service.getCorridasDoDia();
                setCorridas(data);
            } catch (error) {
                console.error("Erro ao buscar corridas:", error);
            } finally {
                console.error("Falha ao buscar corrida");
            }
        };

        fetchCorridas();
    }, [service]);


    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url_voltar={'/admin/controle-corrida'} texto_primario={''} texto_secundario={'veja hora de vazamento, minutos acumulados, temperatura gusa, cargas fundidas, '} >

                </Banner>
            </Grid>
            <Box w={'100%'} h={'100%'} className={'font-monospace'}>
                <TableContainer>
                    <Table colorScheme={'twitter'} className={'table table-responsive-sm'} size={'sm'}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th className="text-center">DATA</Th>
                                <Th className="text-center">VAZAMENTO <br /> Hora Inicio</Th>
                                <Th className="text-center">VAZAMENTO <br /> Hora Fim</Th>
                                <Th className={'bg-dark-subtle text-center'}>MINUTOS DIA</Th>
                                <Th className="text-center">CONCHAS <br /> CAÇAMBAS</Th>
                                <Th className="text-center">Temperatura</Th>
                                <Th className="text-center">Cargas Fundidas <br />DE No</Th>
                                <Th className="text-center">Cargas Fundidas <br />até No</Th>
                                <Th className={'bg-dark-subtle text-center'}>QT</Th>
                                <Th className="text-center">Fe/Gusa/(KG)</Th>
                                <Th className={'bg-dark-subtle text-center'}>Fe₂O₃</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {corridas.map((corrida, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{corrida.id}</Td>
                                    <Td className="text-center">{formatDate(corrida.createdAt)}</Td>
                                    <Td className="text-center">{formatDateTime(corrida.horaInicio)}</Td>
                                    <Td className="text-center">{formatDateTime(corrida.horaFim)}</Td>
                                    <Td className={'bg-dark-subtle text-center'}>{corrida.minutos}</Td>
                                    <Td className="text-center">{corrida.conchas}</Td>
                                    <Td className="text-center">{corrida.temperatura}</Td>
                                    <Td className="text-center">{corrida.cargaFundidaDe}</Td>
                                    <Td className="text-center">{corrida.cargaFundidaAte}</Td>
                                    <Td className={'bg-dark-subtle text-center'}>{corrida.quantidade}</Td>
                                    <Td className="text-center">{corrida.feGusaKg}</Td>
                                    <Td className={'bg-dark-subtle text-center'}>{corrida.ferro}</Td>
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
        </Box>
    )

}

export default VerCorridas;