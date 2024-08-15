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
                <Banner url_voltar={'/admin/controle-corrida'} texto_primario={''} texto_secundario={'Peso Gusa Temperatura, Consumo Carvão, Sopradores'}>

                </Banner>
            </Grid>
            <Box w={'100%'} h={'100%'} className={'font-monospace'}>
                <TableContainer>
                    <Table className={'table table-responsive-sm'} size={'sm'}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th className="text-center">Data</Th>
                                <Th className="text-center">Real TN</Th>
                                <Th className="text-center bg-dark-subtle">Ritmo</Th>
                                <Th className="text-center">Tempo corrida <br/> (minutos)</Th>
                                <Th className={'text-center bg-dark-subtle'}>Gusa por minuto</Th>
                                <Th className={'text-center'}>Temperatura Gusa</Th>
                                <Th className="text-center">Carvão KG/T</Th>
                                <Th className="text-center">Carvão m<sup>3</sup>/t</Th>
                                <Th className="text-center">Soprador 1</Th>
                                <Th className="text-center">Soprador 2</Th>
                                <Th className="text-center">Soprador 3</Th>
                                <Th className="text-center">Soprador 4</Th>
                                <Th className="text-center">Soprador 5</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {corridas.map((corrida, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">{corrida.id}</Td>
                                    <Td className="text-center">{formatDate(corrida.createdAt)}</Td>
                                    <Td className="text-center">{corrida.realTn}</Td>
                                    <Td className="text-center bg-dark-subtle">{corrida.ritmo}</Td>
                                    <Td className="text-center">{corrida.tempoCorridaMinutos}</Td>
                                    <Td className={'text-center bg-dark-subtle'}>{corrida.gusaMinuto}</Td>
                                    <Td className={'text-center'}>{corrida.temperatura}</Td>
                                    <Td className="text-center">{corrida.carvaoKg}</Td>
                                    <Td className="text-center">{corrida.carvaoMetros}</Td>
                                    <Td className="text-center">{corrida.sopradores1}</Td>
                                    <Td className="text-center">{corrida.sopradores2}</Td>
                                    <Td className={'text-center'}>{corrida.sopradores3}</Td>
                                    <Td className={'text-center'}>{corrida.sopradores4}</Td>
                                    <Td className={'text-center'}>{corrida.sopradores5}</Td>
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
                                <CardTitle className={'card-title'}>Real TN Acumulado</CardTitle>
                               <StatNumber>
                                   {corridas[0].realTnAcumulado ? corridas[0].realTnAcumulado.toFixed(2) : "N/A"}
                               </StatNumber>
                            </Stat>
                        )}
                    </StatGroup>
                </Box>
                {/*<Box w={'30%'} h={'100%'} className={'font-monospace bg-primary-subtle p-5 mx-3'}>*/}
                {/*    <StatGroup>*/}
                {/*        {corridas.length > 0 && corridas[0] && (*/}
                {/*            <Stat>*/}
                {/*                <CardTitle>Ritmo</CardTitle>*/}
                {/*                <StatNumber>{corridas[0].ritmo ? corridas[0].ritmo.toFixed(2) : "N/A"}</StatNumber>*/}
                {/*            </Stat>*/}
                {/*        )}*/}
                {/*    </StatGroup>*/}
                {/*</Box>*/}
            </Flex>
        </Box>
    )

}

export default VerAnaliseMinerioEscoria;