import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Input,
    SimpleGrid,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import {Modal} from "react-bootstrap";
import ControleDeCorridasService from '../../../App/service/ControleDeCorridasService';
import {format, parseISO} from "date-fns";
<<<<<<< HEAD
=======
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
>>>>>>> 99f3f26 (new corridas template starting)

const ControleDeCorridas = () => {
    const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    const service = useRef(new ControleDeCorridasService()).current;
    const [formData, setFormData] = useState(service.state.formData);
    const [corridas, setCorridas] = useState(service.state.corridas);
    const [showSuccessModal, setShowSuccessModal] = useState(service.state.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.state.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.state.mensagemErro);
<<<<<<< HEAD
=======
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [minutos, setMinutos] = useState('');
>>>>>>> 99f3f26 (new corridas template starting)

    useEffect(() => {
        const fetchData = async () => {
            await service.fetchCorridas(service.state.today);
            setCorridas([...service.state.corridas]);
        };
        fetchData();
    }, [service]);

    const formatDateForInput = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'dd-MM-yyyy');
    };

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

<<<<<<< HEAD
=======
    const calcularMinutos = (inicio, fim) => {
        const horaInicio = dayjs(inicio);
        const horaFim = dayjs(fim);
        if (horaInicio.isValid() && horaFim.isValid()) {
            const diff = horaFim.diff(horaInicio);
            return dayjs.duration(diff).asMinutes();
        }
        return '';
    };

    useEffect(() => {
        if (horaInicio && horaFim) {
            const diffInMinutes = calcularMinutos(horaInicio, horaFim);
            setMinutos(diffInMinutes);
        }
    }, [horaInicio, horaFim]);

>>>>>>> 99f3f26 (new corridas template starting)
    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
<<<<<<< HEAD
                <Banner url={'corridas-data'} url_voltar={'/admin/home'} texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'} />
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 5 }} spacing={1} bg={'white'} className={'p-4'} boxShadow={'xs'} rounded={'md'}>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <Input  size={inputSize} name="data" value={formatDateForInput(formData.data)} readOnly={true} />
                    </FormControl>
=======
                <Banner url={'corridas-data'} url_voltar={'/admin/home'} texto_primario={'CONTROLE DE CORRIDAS DO FORNO'}
                        texto_secundario={'VAZAMENTO, ANALISE QUIMICA, TEMPERATURA GUSA, ESCÓRIA, CARGAS FUNDIDAS, PESO DO GUSA, ' +
                            'CONSUMO ESP CARVÃO, CORRENTE DOS ELETROS SOPRADORES (A)'} primeiro_botao={'ver corridas'} />
            </Grid>

            <Grid templateColumns="repeat(1, 1fr)" gap={1}>
                <SimpleGrid columns={2}>
                    <Box height='auto' bg={'white'}>
                        <Text className={'p-3 text-bg-dark'}>Vazamento</Text>
                        <HStack spacing={3} width={'100%'} className={'p-3'}>
                            <FormControl width={'30%'}>
                                <FormLabel>Hora Início</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaInicio}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                />
                            </FormControl>
                            <FormControl width={'30%'}>
                                <FormLabel>Hora Fim</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaFim}
                                    onChange={(e) => setHoraFim(e.target.value)}
                                />
                            </FormControl>
                            <FormControl width={'20%'}>
                                <FormLabel>Minutos</FormLabel>
                                <Input placeholder='minutos' value={minutos} readOnly />
                            </FormControl>
                            <FormControl width={'20%'}>
                                <FormLabel>Conchas</FormLabel>
                                <Input placeholder='caçambas' />
                            </FormControl>
                        </HStack>
>>>>>>> 99f3f26 (new corridas template starting)

                        <Box>
                            <Text className={'p-3 text-bg-dark'}>Analise QM</Text>
                            <HStack className={'p-2'}>
                               <Box>
                                   <Text className={'p-2 text-bg-info'}>Silicio</Text>
                                  <HStack className={'p-2'}>
                                      <FormControl width={'50%'} >
                                          <FormLabel className={'text-center'}>Visual</FormLabel>
                                          <Input placeholder={'visual'}></Input>
                                      </FormControl>
                                      <FormControl width={'50%'} >
                                          <FormLabel className={'text-center'}>Real</FormLabel>
                                          <Input placeholder={'real'}></Input>
                                      </FormControl>
                                  </HStack>
                               </Box>

                                <Box>
                                    <Text className={'p-2 text-center'}>outros</Text>
                                    <HStack>
                                        <FormControl width={'auto'} >
                                            <FormLabel className={'text-center'}>P</FormLabel>
                                            <Input placeholder={'fosforo'}></Input>
                                        </FormControl>
                                        <FormControl width={'auto'} >
                                            <FormLabel className={'text-center'}>MM</FormLabel>
                                            <Input placeholder={'manganes'}></Input>
                                        </FormControl>
                                        <FormControl width={'auto'} >
                                            <FormLabel className={'text-center'}>S</FormLabel>
                                            <Input placeholder={'silica'}></Input>
                                        </FormControl>
                                    </HStack>
                                </Box>

                            </HStack>
                        </Box>

                        <Box>
                            <Text className={'p-3 text-bg-dark'}>Escória</Text>
                            <HStack className={'p-2'}>
                                <Box>
                                    <Text className={'p-2 text-bg-info'}>Vazamento</Text>
                                    <HStack className={'p-2'}>
                                        <FormControl width={'auto'} >
                                            <FormLabel className={'text-center'}>Inicio</FormLabel>
                                            <Input type={'time'} placeholder={'hora inicio'}></Input>
                                        </FormControl>
                                        <FormControl width={'auto'} >
                                            <FormLabel className={'text-center'}>Fim</FormLabel>
                                            <Input type={'time'} placeholder={'hora fim'}></Input>
                                        </FormControl>
                                        <FormControl width={'auto'} >
                                            <FormLabel className={'text-center'}>Tipo de escória</FormLabel>
                                            <Input placeholder={'tipo'}></Input>
                                        </FormControl>
                                    </HStack>
                                </Box>

<<<<<<< HEAD
                    <FormControl>
                        <FormLabel>Escória Visual</FormLabel>
                        <Input size={inputSize} name="escoriaVisual" value={formData.escoriaVisual} onChange={handleChange} placeholder="escória visual" />
                    </FormControl>
=======
                            </HStack>
                        </Box>

                        <HStack justifyContent={'center'} mb={3}>
                            <Button colorScheme={'telegram'} onClick={handleSubmit}>Registrar</Button>
                        </HStack>
                    </Box>

>>>>>>> 99f3f26 (new corridas template starting)

                    <Box bg='white' height='auto'>

<<<<<<< HEAD
                    <FormControl>
                        <FormLabel>C.EC. Dia (m³)</FormLabel>
                        <InputMask
                            mask="9.99"
                            value={formData.cecDiaM3}
                            onChange={handleChange}
                        >
                            {(inputProps) => <Input {...inputProps} size={inputSize} name="cecDiaM3" placeholder="metros cúbicos" />}
                        </InputMask>
                    </FormControl>

                    <FormControl>
                        <FormLabel>C.EC. Dia (kg)</FormLabel>
                        <Input size={inputSize} name="cecDiaKg" value={formData.cecDiaKg} onChange={handleChange} placeholder="Digite os kilos" />
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
                            <Table size={'sm'} variant={'striped'}>
                                <Thead>
                                    <Tr>
                                        <Th>Data</Th>
                                        <Th>Hora de Abertura</Th>
                                        <Th>Hora de Tampa</Th>
                                        <Th>Caçambas</Th>
                                        <Th>Temperatura</Th>
                                        <Th>Escória Visual</Th>
                                        <Th>Produção</Th>
                                        <Th>C.EC. Dia (m³)</Th>
                                        <Th>C.EC. Dia (kg)</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {corridas.map((corrida) => (
                                        <Tr key={corrida.id}>
                                            <Td>{corrida.data}</Td>
                                            <Td className={'text-center'}>{corrida.horaAbertura}</Td>
                                            <Td className={'text-center'}>{corrida.horaTampa}</Td>
                                            <Td className={'text-center'}>{corrida.cacambas}</Td>
                                            <Td className={'text-center'}>{corrida.temperatura}</Td>
                                            <Td className={'text-center'}>{corrida.escoriaVisual}</Td>
                                            <Td className={'text-center'}>{corrida.producao}</Td>
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
=======
                    </Box>

                </SimpleGrid>
            </Grid>
>>>>>>> 99f3f26 (new corridas template starting)

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
