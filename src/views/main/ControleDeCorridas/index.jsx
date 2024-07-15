import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
    SimpleGrid, Table, TableContainer, Tbody,
    Td, Th, Thead,
    Tr,
    useBreakpointValue
} from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import { Modal } from "react-bootstrap";
import InputMask from "react-input-mask";
import ControleDeCorridasService from '../../../App/service/ControleDeCorridasService';
import { format } from "date-fns";

const ControleDeCorridas = () => {
    const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    const service = useRef(new ControleDeCorridasService()).current;
    const [formData, setFormData] = useState(service.state.formData);
    const [corridas, setCorridas] = useState(service.state.corridas);
    const [showSuccessModal, setShowSuccessModal] = useState(service.state.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.state.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.state.mensagemErro);


    useEffect(() => {
        service.fetchCorridas(service.state.today).then(() => {
            setCorridas([...service.state.corridas]);
        });
    }, [service.state.today, service]);

    const handleChange = (e) => {
        service.handleChange(e);
        setFormData({ ...service.state.formData });
    };

    const handleSubmit = async (e) => {
        await service.handleSubmit(e);
        setFormData({ ...service.state.formData });
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
        setMensagemErro(service.state.mensagemErro);
        await service.fetchCorridas(service.state.today);
        setCorridas([...service.state.corridas]);
    };

    const handleClose = () => {
        service.handleClose();
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
    };


    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'corridas-data'}  url_voltar={'/admin/home'} texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'} />
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 5 }} spacing={1} bg={'white'} className={'p-4'} boxShadow={'xs'} rounded={'md'}>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <Input type="date" size={inputSize} name="data" value={formData.data} readOnly={true} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Caçambas</FormLabel>
                        <Input size={inputSize} name="cacambas" value={formData.cacambas} onChange={handleChange} placeholder="número de caçambas" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Hora de Abertura</FormLabel>
                        <Input type="time" size={inputSize} name="horaAbertura" value={formData.horaAbertura} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Hora de Tampa</FormLabel>
                        <Input type="time" size={inputSize} name="horaTampa" value={formData.horaTampa} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Temperatura (°C)</FormLabel>
                        <Input size={inputSize} name="temperatura" value={formData.temperatura} onChange={handleChange} placeholder="Digite a temperatura" />
                    </FormControl>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>Redução</FormLabel>*/}
                    {/*    <Input size={inputSize} name="reducao" value={formData.reducao} onChange={handleChange} placeholder="Digite a redução" />*/}
                    {/*</FormControl>*/}

                    {/*<FormControl>*/}
                    {/*    <FormLabel>Reserva Fundida</FormLabel>*/}
                    {/*    <Input size={inputSize} name="reservaFundida" value={formData.reservaFundida} onChange={handleChange} placeholder="reserva fundida" />*/}
                    {/*</FormControl>*/}

                    <FormControl>
                        <FormLabel>Escória Visual</FormLabel>
                        <Input size={inputSize} name="escoriaVisual" value={formData.escoriaVisual} onChange={handleChange} placeholder="escória visual" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Produção</FormLabel>
                        <Input size={inputSize} name="producao" value={formData.producao} onChange={handleChange} placeholder="Digite a produção" />
                    </FormControl>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>Produção Acumulada</FormLabel>*/}
                    {/*    <Input size={inputSize} name="producaoAcumulada" value={formData.producaoAcumulada} onChange={handleChange} placeholder="produção acumulada" />*/}
                    {/*</FormControl>*/}

                    {/*<FormControl>*/}
                    {/*    <FormLabel>Média</FormLabel>*/}
                    {/*    <Input size={inputSize} name="media" value={formData.media} onChange={handleChange} placeholder="Digite a média" />*/}
                    {/*</FormControl>*/}

                    <FormControl>
                        <FormLabel>C.EC. Dia (m³)</FormLabel>
                        <InputMask
                            mask="999.99"
                            value={formData.cecDiaM3}
                            onChange={handleChange}
                        >
                            {(inputProps) => <Input {...inputProps} size={inputSize} name="cecDiaM3" placeholder="metros cúbicos" />}
                        </InputMask>
                    </FormControl>

                    <FormControl>
                        <FormLabel>C.EC. Dia (kg)</FormLabel>
                        <InputMask
                            mask="999.99"
                            value={formData.cecDiaKg}
                            onChange={handleChange}
                        >
                            {(inputProps) => <Input {...inputProps} size={inputSize} name="cecDiaKg" placeholder="Kilos" />}
                        </InputMask>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" size={'md'} mt={'auto'}>
                        Cadastrar Corrida
                    </Button>
                </SimpleGrid>
            </form>

            {corridas.length > 0 && (
                <Box mt={8}>
                    <Grid templateColumns="repeat(1, 1fr)" bg={'lightsteelblue'} boxShadow={'dark-lg'}>
                        <TableContainer>
                            <Table size={'sm'} variant={'striped'} className={''} >
                                <Thead>
                                    <Tr>
                                        <Th>Data</Th>
                                        <Th>Hora de Abertura</Th>
                                        <Th>Hora de Tampa</Th>
                                        <Th>Caçambas</Th>
                                        <Th>Temperatura</Th>
                                        {/*<Th>Redução</Th>*/}
                                        {/*<Th>Reserva Fundida</Th>*/}
                                        <Th>Escória Visual</Th>
                                        <Th>Produção</Th>
                                        {/*<Th>Produção Acumulada</Th>*/}
                                        {/*<Th>Média</Th>*/}
                                        <Th>C.EC. Dia (m³)</Th>
                                        <Th>C.EC. Dia (kg)</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {corridas.map((corrida) => (
                                        <Tr key={corrida.id}>
                                            <Td>{format(new Date(corrida.data), service.state.today)}</Td>
                                            <Td className={'text-center'}>{corrida.horaAbertura}</Td>
                                            <Td className={'text-center'}>{corrida.horaTampa}</Td>
                                            <Td className={'text-center'}>{corrida.cacambas}</Td>
                                            <Td className={'text-center'}>{corrida.temperatura}</Td>
                                            {/*<Td className={'text-center'}>{corrida.reducao}</Td>*/}
                                            {/*<Td className={'text-center'}>{corrida.reservaFundida}</Td>*/}
                                            <Td className={'text-center'}>{corrida.escoriaVisual}</Td>
                                            <Td className={'text-center'}>{corrida.producao}</Td>
                                            {/*<Td className={'text-center'}>{corrida.producaoAcumulada}</Td>*/}
                                            {/*<Td className={'text-center'}>{corrida.media}</Td>*/}
                                            <Td className={'text-center'}>{corrida.cecDiaM3}</Td>
                                            <Td className={'text-center'}>{corrida.cecDiaKg}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Box>
            )}

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header className={'bg-success text-white'} closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Corrida cadastrada com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'bg-primary text-white'} onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={handleClose}>
                <Modal.Header className={'bg-danger'} closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensagemErro}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'bg-dark text-white'} onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}

export default ControleDeCorridas;
