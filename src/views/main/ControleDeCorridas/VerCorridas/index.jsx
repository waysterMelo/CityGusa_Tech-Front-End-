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
                        <Banner url_voltar={'/admin/controle-corrida'} texto_primario={'Pesquise pela data para retornar todas as informações cadastradas'} />
                    </Grid>
                    <Box w={'100%'} h={'100%'}>
                        <TableContainer>
                            <Table className={'table-striped table-hover'} id={'tabela_retorno'}>
                                <Thead className={'thead-dark'}>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>DATA</Th>
                                        <Th>VAZAMENTO <br/> Hora Inicio</Th>
                                        <Th>VAZAMENTO <br/> Hora Fim</Th>
                                        <Th>MINUTOS DIA <br/> (ACUMULADO)</Th>
                                        <Th>CONCHAS <br/> CAÇAMBAS</Th>
                                        <Th>SILICIO <br/> Visual</Th>
                                        <Th>SILICIO <br/> Real</Th>
                                        <Th>FÓSFORO</Th>
                                        <Th>MANGANÊS</Th>
                                        <Th>SÍLICA</Th>
                                        <Th>TEMPERATURA <br/> Gusa</Th>
                                        <Th>Escória <br/> tipo</Th>
                                        <Th>Escória <br/>inicio vazamento</Th>
                                        <Th>Escória <br/>fim vazamento</Th>
                                        <Th>Cargas Fundidas <br/>DE No</Th>
                                        <Th>Cargas Fundidas <br/>até No</Th>
                                        <Th>QT</Th>
                                        <Th>Fe/Gusa/(KG)</Th>
                                        <Th>Fe₂O₃</Th>
                                        <Th className={'bg-dark-subtle'}>ACUMulado <br/> DIA</Th>
                                        <Th className={'bg-dark-subtle'}>RITMO REAL</Th>
                                        <Th>CONSUMO <br/> CARVÃO KG</Th>
                                        <Th>CONSUMO <br/> CARVÃO M³/T</Th>
                                        <Th>tempo de <br/> corridas min</Th>
                                        <Th>tonelada gusa <br/> minutos</Th>
                                        <Th>Fe/CARGA <br/>GUSA/C(KG)</Th>
                                        <Th>Sopradores <br/>1</Th>
                                        <Th>Sopradores <br/>2</Th>
                                        <Th>Sopradores <br/>3</Th>
                                        <Th>Sopradores <br/>4</Th>
                                        <Th>Sopradores <br/>5</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {corridas.map((corrida, index) => (
                                        <Tr key={index}>
                                            <Td>{corrida.id}</Td>
                                            <Td>{corrida.createdAt}</Td>
                                            <Td>{corrida.horaInicio}</Td>
                                            <Td>{corrida.horaFim}</Td>
                                            <Td>{corrida.minutos}</Td>
                                            <Td>{corrida.conchas}</Td>
                                            <Td>{corrida.silicio_visual}</Td>
                                            <Td>{corrida.silicio_real}</Td>
                                            <Td>{corrida.fosforo}</Td>
                                            <Td>{corrida.manganes}</Td>
                                            <Td>{corrida.silica}</Td>
                                            <Td>132</Td>
                                            <Td>{corrida.tipo_escoria}</Td>
                                            <Td>{corrida.escoria_inicio}</Td>
                                            <Td>{corrida.escoria_fim}</Td>
                                            <Td>{corrida.carga_fundida_de}</Td>
                                            <Td>{corrida.carga_fundida_ate}</Td>
                                            <Td>{corrida.fe_gusa_kg}</Td>
                                            <Td>{corrida.quantidade}</Td>
                                            <Td>{corrida.ferro}</Td>
                                            <Td className={'bg-dark-subtle'}>{corrida.acumDia}</Td>
                                            <Td className={'bg-dark-subtle'}>{corrida.ritmoReal}</Td>
                                            <Td>{corrida.carvao_kg}</Td>
                                            <Td>{corrida.carvao_metros}</Td>
                                            <Td>{corrida.tempo_corrida_minutos}</Td>
                                            <Td>{corrida.gusa_minuto}</Td>
                                            <Td>gusa_kg</Td>
                                            <Td>{corrida.sopradores_1}</Td>
                                            <Td>{corrida.sopradores_2}</Td>
                                            <Td>{corrida.sopradores_3}</Td>
                                            <Td>{corrida.sopradores_4}</Td>
                                            <Td>{corrida.sopradores_5}</Td>
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