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
    VStack,
    Flex,
    Spacer,
    Stack,
    Select
} from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import { Modal } from "react-bootstrap";
import ControleDeCorridasService from '../../../App/service/ControleDeCorridasService';
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const ControleDeCorridas = () => {
    // const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    const service = useRef(new ControleDeCorridasService()).current;
    //const [formData, setFormData] = useState(service.state.formData);
    //const [corridas, setCorridas] = useState(service.state.corridas);
    const [showSuccessModal, setShowSuccessModal] = useState(service.state.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.state.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.state.mensagemErro);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [minutos, setMinutos] = useState('');
    const [deNumero, setDeNumero] = useState('');
    const [ateNumero, setAteNumero] = useState('');
    const [qt, setQt] = useState('');
    const [gusa, setGusa] = useState('');
    const [ferro, setFerro] = useState('');
    const [realTn, setRealTn] = useState('');
    const [tempoCorrida, setTempoCorrida] = useState('');
    const [toneladaGusa, setToneladaGusa] = useState('');
    const [kgt, setkgt] = useState('');
    const [m3t, setM3t] = useState('');



    const horaInicioRef = useRef(null);
    const horaFimRef = useRef(null);

    const formatDateForInput = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    const handleChange = (e) => {
        service.handleChange(e);
        //setFormData({ ...service.state.formData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await service.handleSubmit(e);
        //setFormData({ ...service.state.formData });
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
        setMensagemErro(service.state.mensagemErro);
        await service.fetchCorridas(service.state.today);
        //setCorridas([...service.state.corridas]);
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

    const calcularQt = (de, ate) => {
        if (de && ate) {
            const qt = (parseInt(ate) - parseInt(de)) + 1;
            setQt(qt)
        }else {
            setQt('');
        }
    }

    const calcularToneladaGusaMin = (real, minutos) =>{
        if (real && minutos){
            const result = (parseFloat(real) / parseFloat(minutos));
            setToneladaGusa(result.toFixed(3));
        }else{
            setToneladaGusa('')
        }
    }

    useEffect(() => {
        if (horaInicio && horaFim) {
            const diffInMinutes = calcularMinutos(horaInicio, horaFim);
            setMinutos(diffInMinutes);
        }
    }, [horaInicio, horaFim]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await service.fetchCorridas(service.state.today);
    //         setCorridas([...service.state.corridas]);
    //     };
    //     fetchData();
    // }, [service]);

    useEffect(() => {
        calcularToneladaGusaMin(realTn, tempoCorrida);
    }, [realTn, tempoCorrida]);

    useEffect(() => {
        calcularQt(deNumero, ateNumero);
    }, [deNumero, ateNumero]);


    useEffect(() => {
        if (qt && gusa) {
            const fe2o3Result = (qt * parseFloat(gusa) / 1000).toFixed(2);
            setFerro(fe2o3Result);
        } else {
            setFerro('');
        }
    }, [qt, gusa]);

    const handleDateTimeChange = (setter, ref) => (e) => {
        const value = e.target.value;
        setter(value);

        // Verifica se a string de data/hora tem o formato completo "YYYY-MM-DDTHH:MM"
        if (value.length === 16) {
            setTimeout(() => {
                if (ref.current) {
                    ref.current.blur();
                }
            }, 100);
        }
    };

    const formatReal = (value) => {
        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (value.length > 2) {
            value = value.slice(0, value.length - 2) + '.' + value.slice(value.length - 2);
        }
        return value;
    };

    const handleRealTnChange = (e) => {
        let value = e.target.value;
        value = formatReal(value);
        setRealTn(value);
    };

    const handleM3tNumber=(e)=>{
        let value = e.target.value;
        value = formatReal(value);
        setM3t(value);
    }

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'corridas-data'} url_voltar={'/admin/home'} texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'} />
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1}} spacing={3} mt={4}>
                    <Stack direction={['column', 'row']}>
                        <Box width={'26%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Vazamento</Text>

                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Início</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaInicio}
                                    onChange={handleDateTimeChange(setHoraInicio, horaInicioRef)}
                                    ref={horaInicioRef}
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Fim</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaFim}
                                    onChange={handleDateTimeChange(setHoraFim, horaFimRef)}
                                    ref={horaFimRef}
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Minutos</FormLabel>
                                <Input className={'text-bg-secondary'} placeholder='minutos' value={minutos} readOnly />
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
                                    <Text className={'p-2 border-bottom'}>Silício</Text>
                                    <Flex width={'100%'}>
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
                                    <Text className={'p-2 border-bottom'}>Outros</Text>
                                    <Flex>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>P</FormLabel>
                                            <Input placeholder={'fósforo'} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>MM</FormLabel>
                                            <Input  placeholder={'manganês'} />
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

                    <Stack direction={['column', 'row']}>
                        <Box width={'26%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Cargas Fundidas</Text>
                            <HStack>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>De N°</FormLabel>
                                    <Input value={deNumero} onChange={(e) => setDeNumero(e.target.value)} placeholder={'digite aqui'} />
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Até N°</FormLabel>
                                    <Input value={ateNumero} onChange={(e) => setAteNumero(e.target.value)} placeholder={'digite aqui'} />
                                </FormControl>
                            </HStack>

                            <FormControl className={'form-control-sm'}>
                                <FormLabel>Quantidade</FormLabel>
                                <Input value={qt} className={'text-bg-secondary text-center'} readOnly />
                            </FormControl>
                            <HStack>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe/Gusa/(KG)</FormLabel>
                                    <Input value={gusa}
                                           onChange={(e) => setGusa(e.target.value)} placeholder={'digite aqui'}/>
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe₂O₃</FormLabel>
                                    <Input value={ferro} className={'text-bg-secondary'} readOnly />
                                </FormControl>
                            </HStack>
                        </Box>

                        <Box width={'36%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Peso do Gusa</Text>
                            <HStack spacing={3} width={'auto'} className={'p-1'}>
                                <VStack width={'auto'}>
                                    <Flex>
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Real (TN)</FormLabel>
                                            <Input placeholder={'digite aqui'}
                                                   value={realTn}
                                                   onChange={handleRealTnChange} />
                                        </FormControl>

                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Ritmo Real</FormLabel>
                                            <Input className={'text-bg-secondary'}  readOnly={true}/>
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>
                            <HStack spacing={3} width={'auto'} className={'p-1'}>
                                <VStack>
                                    <Flex>
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Tempo de corrida em min</FormLabel>
                                            <Input placeholder={'digite aqui'}
                                                   value={tempoCorrida}
                                                   onChange={(e) => setTempoCorrida(e.target.value)}
                                            />
                                        </FormControl>

                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Tonelada de gusa por min</FormLabel>
                                            <Input className={'text-bg-secondary'}  readOnly={true} value={toneladaGusa}/>
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>
                        </Box>


                        <Box width={'36%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Consumo Esperado de Carvão</Text>
                            <HStack spacing={3} width={'auto'} className={'p-1'}>
                                <VStack width={'auto'}>
                                    <Flex width={'100%'}>
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>KG/T</FormLabel>
                                            <Input value={kgt} placeholder={'digite aqui'} onChange={(e) => setkgt(e.target.value)} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>M³/T</FormLabel>
                                            <Input value={m3t} placeholder={'digite aqui'} onChange={handleM3tNumber}/>
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>
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