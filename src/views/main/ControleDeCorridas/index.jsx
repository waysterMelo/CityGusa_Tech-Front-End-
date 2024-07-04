import React, {useEffect, useState} from "react";
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
import axios from "axios";
import { Modal } from "react-bootstrap";
import {format} from "date-fns";
import InputMask from "react-input-mask";



const ControleDeCorridas = () => {
    const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    const today = format(new Date(), 'dd-MM-yyy');
    const todayInput = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        data: todayInput,
        cacambas: "",
        horaAbertura: "",
        horaTampa: "",
        temperatura: "",
        reducao: "",
        reservaFundida: "",
        escoriaVisual: "",
        producao: "",
        producaoAcumulada: "",
        media: "",
        cecDiaM3: "",
        cecDiaKg: ""
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [corridas, setCorridas] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/runs/add", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Corrida cadastrada com sucesso:", response.data);
            setShowSuccessModal(true);
            setFormData({
                data: todayInput,
                cacambas: "",
                horaAbertura: "",
                horaTampa: "",
                temperatura: "",
                reducao: "",
                reservaFundida: "",
                escoriaVisual: "",
                producao: "",
                producaoAcumulada: "",
                media: "",
                cecDiaM3: "",
                cecDiaKg: ""
            });
            fetchCorridas(today);
        } catch (error) {
            console.error("Erro ao cadastrar corrida:", error);
            let mensagemErro = "";
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data.message.includes('Cannot deserialize value of type')) {
                    mensagemErro = `Erro ${status}: Há um problema nos dados enviados. Verifique se todos os campos estão preenchidos corretamente e se os valores numéricos estão no formato adequado.`;
                } else {
                    mensagemErro = `Erro ${status}: ${data.message || error.message}`;
                }
            } else {
                mensagemErro = `Erro: ${error.message}`;
            }
            setMensagemErro(mensagemErro);
            setShowErrorModal(true);
        }
    };



    const fetchCorridas = async (data) =>{
        try {
            const response = await  axios.get(`http://localhost:8080/runs/date-today?data=${data}`);
            setCorridas(response.data)
        }catch (error){
            console.error("Erro ao buscar corridas:", error);
        }
    }


    useEffect(() => {
        fetchCorridas(today);
    }, [today]);



    const handleClose = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };



    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'}/>
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={1} bg={'white'} className={'p-4'} boxShadow={'xs'} rounded={'md'}>
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

                    <FormControl>
                        <FormLabel>Redução</FormLabel>
                        <Input size={inputSize} name="reducao" value={formData.reducao} onChange={handleChange} placeholder="Digite a redução" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Reserva Fundida</FormLabel>
                        <Input size={inputSize} name="reservaFundida" value={formData.reservaFundida} onChange={handleChange} placeholder="reserva fundida" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Escória Visual</FormLabel>
                        <Input size={inputSize} name="escoriaVisual" value={formData.escoriaVisual} onChange={handleChange} placeholder="escória visual" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Produção</FormLabel>
                        <Input size={inputSize} name="producao" value={formData.producao} onChange={handleChange} placeholder="Digite a produção" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Produção Acumulada</FormLabel>
                        <Input size={inputSize} name="producaoAcumulada" value={formData.producaoAcumulada} onChange={handleChange} placeholder="produção acumulada" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Média</FormLabel>
                        <Input size={inputSize} name="media" value={formData.media} onChange={handleChange} placeholder="Digite a média" />
                    </FormControl>

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



                    <Button type="submit"  colorScheme="blue" size={'md'} mt={'auto'}>
                        Cadastrar Corrida
                    </Button>
                </SimpleGrid>
            </form>

            {corridas.length > 0 && (
                <Box mt={8}>
                    <Grid templateColumns="repeat(1, 1fr)">
                        <TableContainer>
                            <Table size={'sm'} className={'table table-dark'}>
                                <Thead>
                                    <Tr>
                                        <Th>Data</Th>
                                        <Th>Hora de Abertura</Th>
                                        <Th>Hora de Tampa</Th>
                                        <Th>Caçambas</Th>
                                        <Th>Temperatura</Th>
                                        <Th>Redução</Th>
                                        <Th>Reserva Fundida</Th>
                                        <Th>Escória Visual</Th>
                                        <Th>Produção</Th>
                                        <Th>Produção Acumulada</Th>
                                        <Th>Média</Th>
                                        <Th>C.EC. Dia (m³)</Th>
                                        <Th>C.EC. Dia (kg)</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {corridas.map((corrida) => (
                                        <Tr key={corrida.id}>
                                            <Td>{format(new Date(corrida.data), 'dd-MM-yyyy')}</Td>
                                            <Td>{corrida.horaAbertura}</Td>
                                            <Td>{corrida.horaTampa}</Td>
                                             <Td>{corrida.cacambas}</Td>
                                            <Td>{corrida.temperatura}</Td>
                                            <Td>{corrida.reducao}</Td>
                                            <Td>{corrida.reservaFundida}</Td>
                                            <Td>{corrida.escoriaVisual}</Td>
                                            <Td>{corrida.producao}</Td>
                                            <Td>{corrida.producaoAcumulada}</Td>
                                            <Td>{corrida.media}</Td>
                                            <Td>{corrida.cecDiaM3}</Td>
                                            <Td>{corrida.cecDiaKg}</Td>
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
                <Modal.Header  className={'bg-danger'} closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensagemErro}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'bg-dark text-white'}  onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}

export default ControleDeCorridas;