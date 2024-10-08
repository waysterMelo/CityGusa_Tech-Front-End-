import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Input,
    Select,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import { Modal } from "react-bootstrap";
import ControleDeCorridasService from '../../../../App/ControleCorridasService/ControleDeCorridasService';
import InputMask from "react-input-mask";

const ControleDeCorridas = () => {
    const service = useRef(new ControleDeCorridasService()).current;
    const [formData, setFormData] = useState(service.formData);
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
    const [tipoEscoria, setTipoEscoria] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);
    const horaInicioRef = useRef(null);
    const horaFimRef = useRef(null);


    const resetFormData = () => {
        service.resetFormService();
        setFormData(service.formData);
        setHoraInicio('');
        setHoraFim('');
        setMinutos('');
        setDeNumero('');
        setAteNumero('');
        setQt('');
        setGusa('');
        setFerro('');
        setRealTn('');
        setTempoCorrida('');
        setToneladaGusa('');
        setkgt('');
        setM3t('');
        setTipoEscoria('');
    }

    const handleChange = (e) => {
        service.handleChange(e, setFormData);
    };

    const handleTempoCorridaChange = (e) => {
        const value = e.target.value;
        service.handleTempoCorridaChange(value, setTempoCorrida);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await service.salvar();
        setShowSuccessModal(service.showSuccessModal);
        setShowErrorModal(service.showErrorModal);
        setMensagemErro(service.mensagemErro);
        if (result.success) {
            setShowSuccessModal(true);
            resetFormData();
        } else {
            setShowErrorModal(true);
        }
    };

    const handleClose = () => {
        service.handleClose(setShowSuccessModal, setShowErrorModal);
    };

    const handleTipoDeEscoria = (e) => {
        const value = e.target.value;
        setTipoEscoria(value);
        service.handleChange({ target: { name: 'tipoEscoria', value } }, setFormData);
    };

    const handleCargaDeChange = useCallback((e) => {
        const value = e.target.value;
        service.handleCargaDe(value, setDeNumero, setFormData);
    }, [service, setDeNumero, setFormData]);

    const handleCargaAteChange = useCallback((e) => {
        const value = e.target.value;
        service.handleCargaAte(value, setAteNumero, setFormData);
    }, [service, setAteNumero, setFormData]);


    useEffect(() => {
        if (horaInicio && horaFim) {
            const diffInMinutes = service.calcularMinutos(horaInicio, horaFim);
            setMinutos(diffInMinutes);
            service.handleDateTimeChange("minutos", diffInMinutes, setFormData);
        }
    }, [horaInicio, horaFim, service]);

    useEffect(() => {
        const result = service.calcularToneladaGusaMin(realTn, tempoCorrida);
        setToneladaGusa(result);
        service.handleGusaPorMinuto("gusaMinuto", result, setFormData);
    }, [realTn, tempoCorrida, service]);

    useEffect(() => {
        const qtResult = service.calcularQt(deNumero, ateNumero);
        setQt(qtResult);
        service.handleQuantidade("quantidade", qt, setFormData);
    }, [deNumero, ateNumero, service, qt]);

    useEffect(() => {
        if (qt && gusa) {
            const fe2o3Result = (qt * parseFloat(gusa) / 1000).toFixed(2);
            setFerro(fe2o3Result);
            service.handle_fe_gusa_kg("feGusaKg", gusa, setFormData);
            service.handleFerroResultado("ferro", fe2o3Result, setFormData);
        } else {
            setFerro('');
        }
    }, [qt, gusa, service]);



    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'vazamento-cargas-fundidas'} url_voltar={'/admin/home'} texto_primario={'CADASTRAR CORRIDAS DO FORNO'}
                    texto_secundario={'CADASTRAR CORRIDA, VER CORRIDAS DO DIA, CORRIDAS PELA DATA'}
                    primeiro_botao={'Vazamento, Cargas Fundidas'}
                    segundo_botao={'Análise Química Minério, Escória'}
                    url_segundo_botao={'ver-analise-minerio-escoria'}
                        terceiro_botao={'Peso Gusa e Temperatura, Consumo carvão, Sopradores'}
                        url_terceiro_botao={'peso-gusa-consumo-carvao-sopradores'}
                />
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={3} mt={4}>
                    <Stack direction={['column', 'row']}>
                        <Box width={'26%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Vazamento</Text>

                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Início</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    name={'horaInicio'}
                                    value={horaInicio}
                                    onChange={(e) => { setHoraInicio(e.target.value); handleChange(e) }}
                                    ref={horaInicioRef}
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Hora Fim</FormLabel>
                                <Input
                                    type={'datetime-local'}
                                    name={'horaFim'}
                                    value={horaFim}
                                    onChange={(e) => { setHoraFim(e.target.value); handleChange(e) }}
                                    ref={horaFimRef}
                                />
                            </FormControl>
                            <FormControl className={'form-control-lg'}>
                                <FormLabel>Minutos</FormLabel>
                                <Input name="minutos" className={'text-bg-secondary'} placeholder='minutos' value={minutos} readOnly />
                            </FormControl>
                            <HStack>
                                <FormControl className={'form-control-lg'}>
                                    <FormLabel>Conchas</FormLabel>
                                    <Input name="conchas" placeholder='caçambas' value={formData.conchas} onChange={handleChange} />
                                </FormControl>
                            </HStack>

                        </Box>
                        <Box height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark'}>Análise QM</Text>
                            <HStack spacing={3} width={'100%'} className={'p-3'}>
                                <VStack width={'auto'}>
                                    <Text className={'p-2 border-bottom'}>Silício</Text>
                                    <Flex width={'100%'}>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>Visual</FormLabel>
                                            <InputMask
                                                mask={'9.99'}
                                                value={formData.silicioVisual}
                                                onChange={handleChange}
                                                placeholder={'0.00'}
                                                name={'silicioVisual'}
                                            >
                                                {(inputProps) => <Input {...inputProps} type={'text'} />}
                                            </InputMask>
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>Real</FormLabel>
                                            <InputMask
                                                mask={'9.99'}
                                                value={formData.silicioReal}
                                                onChange={handleChange}
                                                placeholder={'0.00'}
                                                name={'silicioReal'}
                                            >
                                                {(inputProps) => <Input {...inputProps} type={'text'} />}
                                            </InputMask>
                                        </FormControl>
                                    </Flex>
                                </VStack>
                                <VStack width={'100%'}>
                                    <Text className={'p-2 border-bottom'}>Outros</Text>
                                    <Flex>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>P</FormLabel>
                                            <InputMask
                                                mask="9.999"
                                                value={formData.fosforo}
                                                onChange={handleChange}
                                                placeholder={'0.000'}
                                                name={'fosforo'}
                                            >
                                                {(inputProps) => <Input {...inputProps} type="text" />}
                                            </InputMask>
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>MM</FormLabel>
                                            <InputMask
                                                mask="9.99"
                                                value={formData.manganes}
                                                onChange={handleChange}
                                                placeholder={'0.00'}
                                                name={'manganes'}
                                            >
                                                {(inputProps) => <Input {...inputProps} type="text" />}
                                            </InputMask>
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>S</FormLabel>
                                            <InputMask
                                                mask="9.999"
                                                value={formData.silica}
                                                onChange={handleChange}
                                                placeholder={'0.000'}
                                                name={'silica'}
                                            >
                                                {(inputProps) => <Input {...inputProps} type="text" />}
                                            </InputMask>
                                        </FormControl>
                                    </Flex>
                                </VStack>
                            </HStack>
                            <Box bg='white' p={4} mt={4} boxShadow={'xs'} rounded={'md'}>
                                <Text className={'p-3 text-bg-dark'}>Escória vazamento</Text>
                                <HStack spacing={3} width={'100%'} className={'p-2'}>
                                    <FormControl className={'w-50'}>
                                        <FormLabel>Início</FormLabel>
                                        <InputMask
                                            mask={'99:99'}
                                            onChange={handleChange}
                                            value={formData.escoriaInicio}
                                            placeholder={'HH:MM'}
                                            name={'escoriaInicio'}
                                        >
                                            {(inputProps) => <Input {...inputProps} type={'text'} />}
                                        </InputMask>
                                    </FormControl>
                                    <FormControl className={'w-50'}>
                                        <FormLabel>Fim</FormLabel>
                                        <InputMask
                                            mask={'99:99'}
                                            onChange={handleChange}
                                            value={formData.escoriaFim}
                                            placeholder={'HH:MM'}
                                            name={'escoriaFim'}
                                        >
                                            {(inputProps) => <Input {...inputProps} type={'text'} />}
                                        </InputMask>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Tipo de escória</FormLabel>
                                        <Select placeholder="Selecione o tipo" value={tipoEscoria} onChange={handleTipoDeEscoria}>
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
                            <HStack className={'p-3'}>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>De N°</FormLabel>
                                    <Input name="cargaFundidaDe" value={deNumero} onChange={handleCargaDeChange} placeholder={'digite aqui'} />
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Até N°</FormLabel>
                                    <Input name="cargaFundidaAte" value={ateNumero} onChange={handleCargaAteChange} placeholder={'digite aqui'} />
                                </FormControl>
                            </HStack>

                            <FormControl className={'form-control-sm'}>
                                <FormLabel>Quantidade</FormLabel>
                                <Input value={qt} name="quantidade" className={'text-bg-secondary text-center'} readOnly />
                            </FormControl>
                            <HStack>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe/Gusa/(KG)</FormLabel>
                                    <Input value={gusa} name="feGusaKg"
                                        onChange={(e) => setGusa(e.target.value)} placeholder={'digite aqui'} />
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe₂O₃</FormLabel>
                                    <Input name="ferro" value={ferro} className={'text-bg-secondary'} readOnly />
                                </FormControl>
                            </HStack>
                        </Box>

                        <Box width={'36%'} height='auto' bg={'white'} p={4} boxShadow={'xs'} rounded={'md'}>
                            <Text className={'p-3 text-bg-dark text-center'}>Peso do Gusa</Text>

                            <HStack width={'auto'} className={'p-3'} justify="center">
                                <Flex className={''}>
                                    <FormControl>
                                        <FormLabel>Real (TN)</FormLabel>
                                        <Input placeholder={'digite aqui'}
                                            name="realTn"
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
                                            <Input name={'tempoCorridaMinutos'}
                                                placeholder={'digite aqui'}
                                                value={tempoCorrida}
                                                onChange={handleTempoCorridaChange}
                                            />
                                        </FormControl>
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Tonelada de gusa por min</FormLabel>
                                            <Input name={'gusaMinuto'} className={'text-bg-secondary'} readOnly={true} value={toneladaGusa} />
                                        </FormControl>
                                    </Flex>
                                    <Flex>
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Temperatura do Gusa</FormLabel>
                                            <Input name="temperatura" placeholder='temperatura gusa' value={formData.temperatura} onChange={handleChange} />
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
                                            <Input name="carvaoKg" value={kgt} placeholder={'digite aqui'} onChange={(e) => { setkgt(e.target.value); handleChange(e); }} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>M³/T</FormLabel>
                                            <Input name="carvaoMetros" value={m3t} placeholder={'digite aqui'} onChange={(e) => { service.handleM3tNumber(e, setM3t); }} />
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
                                            <Input name={'sopradores1'} value={formData.sopradores1} onChange={handleChange} />
                                        </FormControl>

                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>2</FormLabel>
                                            <Input name={'sopradores2'} value={formData.sopradores2} onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>3</FormLabel>
                                            <Input name={'sopradores3'} value={formData.sopradores3} onChange={handleChange} />
                                        </FormControl>
                                    </Flex>

                                    <Box width={'100%'}>
                                        <Flex>
                                            <FormControl className={'form-control-sm'}>
                                                <FormLabel>4</FormLabel>
                                                <Input name={'sopradores4'} value={formData.sopradores4} onChange={handleChange} />
                                            </FormControl>
                                            <FormControl className={'form-control-sm'}>
                                                <FormLabel>5</FormLabel>
                                                <Input name={'sopradores5'} value={formData.sopradores5} onChange={handleChange} />
                                            </FormControl>
                                        </Flex>
                                    </Box>
                                </VStack>
                            </HStack>
                        </Box>
                    </Stack>
                </SimpleGrid>
                <SimpleGrid>
                        <Flex className={'mt-3'} justifyContent={'flex-end'}>
                            <Button colorScheme="whatsapp" size="lg" type="submit">
                                Registrar
                            </Button>
                        </Flex>
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
