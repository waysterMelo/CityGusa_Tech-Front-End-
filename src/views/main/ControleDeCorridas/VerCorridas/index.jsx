import React, {useEffect, useRef, useState} from "react";
import {Box, Grid, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import ControleDeCorridasService from "../../../../App/service/ControleDeCorridasService";




const VerCorridas = () => {

    const service = useRef(new ControleDeCorridasService()).current;
    const [corridas, setCorridas] = useState([]);


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
                        <Banner url_voltar={'/admin/controle-corrida'} texto_primario={''} >

                        </Banner>
                    </Grid>
                    <Box w={'100%'} h={'100%'} className={'font-monospace'}>
                        <TableContainer>
                            <Table colorScheme={'twitter'} className={'table table-responsive'} size={'sm'}>
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>DATA</Th>
                                        <Th>VAZAMENTO <br/> Hora Inicio</Th>
                                        <Th>VAZAMENTO <br/> Hora Fim</Th>
                                        <Th className={'bg-dark-subtle'}>MINUTOS DIA <br/> (ACUMULADO)</Th>
                                        <Th>CONCHAS <br/> CAÇAMBAS</Th>
                                        <Th>Cargas Fundidas <br/>DE No</Th>
                                        <Th>Cargas Fundidas <br/>até No</Th>
                                        <Th className={'bg-dark-subtle'}>QT</Th>
                                        <Th>Fe/Gusa/(KG)</Th>
                                        <Th className={'bg-dark-subtle'}>Fe₂O₃</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {corridas.map((corrida, index) => (
                                        <Tr key={index}>
                                            <Td>{corrida.id}</Td>
                                            <Td>{corrida.createdAt}</Td>
                                            <Td>{corrida.horaInicio}</Td>
                                            <Td>{corrida.horaFim}</Td>
                                            <Td className={'bg-dark-subtle'}>{corrida.minutos}</Td>
                                            <Td>{corrida.conchas}</Td>
                                            <Td>{corrida.carga_fundida_de}</Td>
                                            <Td>{corrida.carga_fundida_ate}</Td>
                                            <Td className={'bg-dark-subtle'}>{corrida.quantidade}</Td>
                                            <Td>{corrida.fe_gusa_kg}</Td>
                                            <Td className={'bg-dark-subtle'}>{corrida.ferro}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
        )

}

export default VerCorridas;