import React, { useEffect, useRef, useState } from "react";
import {Box, Flex, Grid, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import ControleDeCorridasService from "../../../../App/service/ControleDeCorridasService";
import { Stat, StatNumber, StatGroup } from '@chakra-ui/react'
import { CardTitle } from "react-bootstrap";

const VerAnaliseMinerioEscoria = () => {

    const service = useRef(new ControleDeCorridasService()).current;
    const [corridas, setCorridas] = useState([]);


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options)
    }

    const fecthCorridas = async () => {
        const data = await service.getCorridasDoDia();
        setCorridas(data);
    }

    useEffect(() => {
        fecthCorridas();
    }, []);

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url_voltar={'/admin/controle-corrida'} texto_primario={''} texto_secundario={'veja análise do silício, fósforo, manganês, sílica'}>

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
                                <Th className="text-center">Início de Vazamento</Th>
                                <Th className={'text-center'}>Fim de vazamento</Th>
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
                                <CardTitle>Média de Fósforo</CardTitle>
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
                                <CardTitle>Média de Sílica</CardTitle>
                                <StatNumber>{corridas[0].mediaSilica || "N/A"}</StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
            </Flex>
        </Box>
    )

}

export default VerAnaliseMinerioEscoria;