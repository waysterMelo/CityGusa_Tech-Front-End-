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

const ControleDeCorridas = () => {
    const service = useRef(new ControleDeCorridasService()).current;
    const [formData, setFormData] = useState(service.state.formData);
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
    const [showSuccessModal, setShowSuccessModal] = useState(service.state.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.state.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.state.mensagemErro);
    const horaInicioRef = useRef(null);
    const horaFimRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await service.salvar();
        setFormData({ ...service.state.formData });
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
        setMensagemErro(service.state.mensagemErro);
        if (result.success) {
            setShowSuccessModal(true);
        } else {
            setShowErrorModal(true);
        }
    };

    const handleClose = () => {
        service.handleClose();
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
    };

    useEffect(() => {
        if (horaInicio && horaFim) {
            const diffInMinutes = service.calcularMinutos(horaInicio, horaFim);
            setMinutos(diffInMinutes);
        }
    }, [horaInicio, horaFim, service]);

    useEffect(() => {
        const result = service.calcularToneladaGusaMin(realTn, tempoCorrida);
        setToneladaGusa(result);
    }, [realTn, tempoCorrida, service]);

    useEffect(() => {
        const qtResult = service.calcularQt(deNumero, ateNumero);
        setQt(qtResult);
    }, [deNumero, ateNumero, service]);

    useEffect(() => {
        if (qt && gusa) {
            const fe2o3Result = (qt * parseFloat(gusa) / 1000).toFixed(2);
            setFerro(fe2o3Result);
        } else {
            setFerro('');
        }
    }, [qt, gusa]);

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'corridas-data'} url_voltar={'/admin/home'} texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'} />
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={3} mt={4}>
                    <Stack direction={['column', 'row']}>
                        <Box width={'26%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Corrida</Text>

                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Início</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaInicio}
                                    onChange={service.handleDateTimeChange(setHoraInicio, horaInicioRef)}
                                    ref={horaInicioRef}
                                    name="horaInicio"
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Fim</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    value={horaFim}
                                    onChange={service.handleDateTimeChange(setHoraFim, horaFimRef)}
                                    ref={horaFimRef}
                                    name="horaFim"
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Minutos</FormLabel>
                                <Input name="minutos" className={'text-bg-secondary'} placeholder='minutos' value={minutos} readOnly />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Conchas</FormLabel>
                                <Input name="conchas" placeholder='caçambas' value={formData.conchas} onChange={handleChange} />
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
                                            <Input name="silicioVisual" placeholder={'visual'} value={formData.silicioVisual} onChange={handleChange} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>Real</FormLabel>
                                            <Input name="silicioReal" placeholder={'real'} value={formData.silicioReal} onChange={handleChange} />
                                        </FormControl>
                                    </Flex>
                                </VStack>
                                <VStack width={'100%'}>
                                    <Text className={'p-2 border-bottom'}>Outros</Text>
                                    <Flex>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>P</FormLabel>
                                            <Input name="fosforo" placeholder={'fósforo'} value={formData.fosforo} onChange={handleChange} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>MM</FormLabel>
                                            <Input name="manganes" placeholder={'manganês'} value={formData.manganes} onChange={handleChange} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>S</FormLabel>
                                            <Input name="silica" placeholder={'sílica'} value={formData.silica} onChange={handleChange} />
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>
                            <Box bg='white' p={4} mt={4} boxShadow={'xs'} rounded={'md'}>
                                <Text className={'p-3 text-bg-dark'}>Escória</Text>
                                <HStack spacing={3} width={'100%'} className={'p-2'}>
                                    <FormControl className={'w-50'}>
                                        <FormLabel>Início</FormLabel>
                                        <Input type={'time'} placeholder={'hora início'} name="escoria_inicio" value={formData.escoria_inicio} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl className={'w-50'}>
                                        <FormLabel>Fim</FormLabel>
                                        <Input type={'time'} placeholder={'hora fim'} name="escoria_fim" value={formData.escoria_fim} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Tipo de escória</FormLabel>
                                        <Select name="tipo_escoria" placeholder="Selecione o tipo" value={formData.tipo_escoria} onChange={handleChange}>
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
                                    <Input name="carga_fundida_de" value={formData.carga_fundida_de} onChange={(e) => { handleChange(e); setDeNumero(e.target.value) }} placeholder={'digite aqui'} />
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Até N°</FormLabel>
                                    <Input name="carga_fundida_ate" value={formData.carga_fundida_ate} onChange={(e) => { handleChange(e); setAteNumero(e.target.value) }} placeholder={'digite aqui'} />
                                </FormControl>
                            </HStack>

                            <FormControl className={'form-control-sm'}>
                                <FormLabel>Quantidade</FormLabel>
                                <Input name="quantidade" value={qt} className={'text-bg-secondary text-center'} readOnly />
                            </FormControl>
                            <HStack>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe/Gusa/(KG)</FormLabel>
                                    <Input name="fe_gusa_kg" value={formData.fe_gusa_kg}
                                        onChange={(e) => { handleChange(e); setGusa(e.target.value) }} placeholder={'digite aqui'} />
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe₂O₃</FormLabel>
                                    <Input name="ferro" value={ferro} className={'text-bg-secondary'} readOnly />
                                </FormControl>
                            </HStack>
                        </Box>

                        <Box width={'36%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Peso do Gusa</Text>

                            <HStack width={'auto'} className={'p-1'} justify="center">
                                <Flex className={'pt-5'}>
                                    <FormControl>
                                        <FormLabel>Real (TN)</FormLabel>
                                        <Input name="realTn" placeholder={'digite aqui'}
                                            value={realTn}
                                            onChange={(e) => service.handleRealTnChange(e, setRealTn)} />
                                    </FormControl>
                                </Flex>
                            </HStack>
                            <HStack spacing={3} width={'auto'} className={'p-1'}>
                                <VStack>
                                    <Flex>
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Tempo de corrida em min</FormLabel>
                                            <Input name="tempo_corrida" placeholder={'digite aqui'}
                                                value={formData.tempo_corrida}
                                                onChange={(e) => { handleChange(e); setTempoCorrida(e.target.value) }}
                                            />
                                        </FormControl>

                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Tonelada de gusa por min</FormLabel>
                                            <Input name="gusa_minuto" className={'text-bg-secondary'} readOnly={true} value={toneladaGusa} />
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
                                            <Input name="carvao_kg" value={kgt} placeholder={'digite aqui'} onChange={(e) => setkgt(e.target.value)} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>M³/T</FormLabel>
                                            <Input name="carvao_metros" value={m3t} placeholder={'digite aqui'} onChange={(e) => service.handleM3tNumber(e, setM3t)} />
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>

                            <Text className={'p-3 text-bg-dark text-center'}>Corrente dos eletros sopradores</Text>
                            <HStack spacing={3} width={'auto'} className={'p-1'}>
                                <VStack>
                                    <Flex>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>1</FormLabel>
                                            <Input name="sopradores1" value={formData.sopradores1} onChange={handleChange} />
                                        </FormControl>

                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>2</FormLabel>
                                            <Input name="sopradores2" value={formData.sopradores2} onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>3</FormLabel>
                                            <Input name="sopradores3" value={formData.sopradores3} onChange={handleChange} />
                                        </FormControl>
                                    </Flex>

                                    <Box width={'100%'}>
                                        <Flex>
                                            <FormControl className={'form-control-sm'}>
                                                <FormLabel>4</FormLabel>
                                                <Input name="sopradores4" value={formData.sopradores4} onChange={handleChange} />
                                            </FormControl>
                                            <FormControl className={'form-control-sm'}>
                                                <FormLabel>5</FormLabel>
                                                <Input name="sopradores5" value={formData.sopradores5} onChange={handleChange} />
                                            </FormControl>
                                        </Flex>

                                        <Flex justifyContent={'flex-end'}>
                                            <Button colorScheme="whatsapp" size="lg" type="submit">
                                                Registrar
                                            </Button>
                                        </Flex>
                                    </Box>
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