import React, { useEffect, useRef, useState } from "react";
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
    useBreakpointValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    VStack,
    Flex,
    Spacer, Stack, Select
} from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import { Modal } from "react-bootstrap";
import ControleDeCorridasService from '../../../App/service/ControleDeCorridasService';
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import InputMask from 'react-input-mask';

dayjs.extend(duration);

const ControleDeCorridas = () => {
    const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    const service = useRef(new ControleDeCorridasService()).current;
    const [formData, setFormData] = useState(service.state.formData);
    const [corridas, setCorridas] = useState(service.state.corridas);
    const [showSuccessModal, setShowSuccessModal] = useState(service.state.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.state.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.state.mensagemErro);

    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [minutos, setMinutos] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await service.fetchCorridas(service.state.today);
            setCorridas([...service.state.corridas]);
        };
        fetchData();
    }, [service]);

    const formatDateForInput = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    const handleChange = (e) => {
        service.handleChange(e);
        setFormData({ ...service.state.formData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'corridas-data'} url_voltar={'/admin/home'} texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'} />
            </Grid>

            <form onSubmit={handleSubmit}>

                <SimpleGrid columns={{ base: 1, md: 1}} spacing={3} mt={4}>

                    <Stack direction={['column', 'row']}>
                    <Box width={'auto'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                        <Text className={'p-3 text-bg-dark text-center'}>Vazamento</Text>

                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Início</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaInicio}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Fim</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaFim}
                                    onChange={(e) => setHoraFim(e.target.value)}
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Minutos</FormLabel>
                                <Input placeholder='minutos' value={minutos} readOnly />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Conchas</FormLabel>
                                <Input placeholder='caçambas' />
                            </FormControl>
                    </Box>
                    <Box height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark'}>Análise QM</Text>
                            <HStack spacing={3} width={'100%'} className={'p-3'}>
                                <VStack width={'auto'}>

                                    <Flex width={'100%'}>
                                        <Text className={'p-2 text-bg-info'}>Silício</Text>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>Visual</FormLabel>
                                            <Input placeholder={'visual'} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>Real</FormLabel>
                                            <Input placeholder={'real'} />
                                        </FormControl>
                                    </Flex>
                                </VStack>
                                <VStack width={'100%'}>
                                    <Flex>
                                        <Text className={'p-2 text-bg-info'}>Outros</Text>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>P</FormLabel>
                                            <Input placeholder={'fósforo'} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>MM</FormLabel>
                                            <Input placeholder={'manganês'} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>S</FormLabel>
                                            <Input placeholder={'sílica'} />
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>
                        <Box bg='white' p={4} mt={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark'}>Escória</Text>
                            <HStack spacing={3} width={'100%'} className={'p-2'}>
                                <FormControl className={'w-50'}>
                                    <FormLabel>Início</FormLabel>
                                    <Input type={'time'} placeholder={'hora início'} />
                                </FormControl>
                                <FormControl className={'w-50'}>
                                    <FormLabel>Fim</FormLabel>
                                    <Input type={'time'} placeholder={'hora fim'} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Tipo de escória</FormLabel>
                                    <Select placeholder="Selecione o tipo">
                                        <option value="verde">Verde</option>
                                        <option value="verde-clara">Verde Clara</option>
                                        <option value="cinza">Cinza</option>
                                    </Select>
                                </FormControl>

                            </HStack>
                        </Box>
                    </Box>

                    </Stack>
                </SimpleGrid>


            </form>



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
