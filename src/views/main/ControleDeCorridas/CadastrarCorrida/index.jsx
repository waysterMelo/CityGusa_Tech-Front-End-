import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid, GridItem, Icon,
    Input,
    Select,
    Text,
    VStack
} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";
import { Modal } from "react-bootstrap";
import ControleDeCorridasService from '../../../../App/ControleCorridasService/ControleDeCorridasService';
import InputMask from "react-input-mask";
import {
    FaClipboardList, FaClock, FaCube,
    FaExclamationTriangle,
    FaFireAlt,
    FaFlask,
    FaSave,
    FaWeightHanging
} from "react-icons/fa";

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
        <Box pt={{ base: "60px", md: "40px", xl: "5%" }} px={{ base: "4", md: "6" }} bg="gray.50"> {/* Adicionado um bg geral para contraste */}
            <Banner
                url={'vazamento-cargas-fundidas'}
                url_voltar={'/admin/home'}
                texto_primario={'CADASTRAR CORRIDAS DO FORNO'}
                texto_secundario={'CADASTRAR CORRIDA, VER CORRIDAS DO DIA, CORRIDAS PELA DATA'}
                primeiro_botao={'Vazamento, Cargas Fundidas'}
                segundo_botao={'Análise Química Minério, Escória'}
                url_segundo_botao={'ver-analise-minerio-escoria'}
                terceiro_botao={'Peso Gusa e Temperatura, Consumo carvão, Sopradores'}
                url_terceiro_botao={'peso-gusa-consumo-carvao-sopradores'}
            />

            <form onSubmit={handleSubmit}>
                <VStack spacing={{ base: 6, md: 8 }} align="stretch" mt={8}>

                    {/* Linha 1 de Cards */}
                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                        {/* Card Vazamento */}
                        <GridItem>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" h="100%" bg="white">
                                <Flex as="header" align="center" p={4} bg="gray.100" borderBottomWidth="1px">
                                    <Icon as={FaClock} mr={3} boxSize={5} />
                                    <Text fontWeight="bold">Vazamento</Text>
                                </Flex>
                                <Box p={4}> {/* Corpo do card com fundo branco já definido pelo Box pai */}
                                    <VStack spacing={4} align="stretch">
                                        <FormControl isRequired>
                                            <FormLabel>Hora Início</FormLabel>
                                            <Input
                                                type={'datetime-local'}
                                                name={'horaInicio'}
                                                value={horaInicio}
                                                onChange={(e) => { setHoraInicio(e.target.value); handleChange(e); }}
                                                ref={horaInicioRef}
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Hora Fim</FormLabel>
                                            <Input
                                                type={'datetime-local'}
                                                name={'horaFim'}
                                                value={horaFim}
                                                onChange={(e) => { setHoraFim(e.target.value); handleChange(e); }}
                                                ref={horaFimRef}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Minutos</FormLabel>
                                            <Input name="minutos" placeholder='minutos' value={minutos} isReadOnly bg="gray.100" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Conchas</FormLabel>
                                            <Input name="conchas" placeholder='N° de caçambas' value={formData.conchas} onChange={handleChange} />
                                        </FormControl>
                                    </VStack>
                                </Box>
                            </Box>
                        </GridItem>

                        {/* Card Análise QM e Escória */}
                        <GridItem>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" h="100%" bg="white">
                                <Flex as="header" align="center" p={4} bg="gray.100" borderBottomWidth="1px">
                                    <Icon as={FaFlask} mr={3} boxSize={5} />
                                    <Text fontWeight="bold">Análise Química e Escória</Text>
                                </Flex>
                                <Box p={4}> {/* Corpo do card com fundo branco já definido pelo Box pai */}
                                    <VStack spacing={6} align="stretch">
                                        <Box>
                                            <Text fontWeight="semibold" mb={3} borderBottomWidth="1px" pb={2}>Análise QM (Gusa)</Text>
                                            <Text textAlign="center" fontWeight="bold" mb={2}>Silício (%)</Text>
                                            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                                                <FormControl>
                                                    <FormLabel textAlign="center">Visual</FormLabel>
                                                    <InputMask
                                                        mask={'9.99'}
                                                        value={formData.silicioVisual}
                                                        onChange={handleChange}
                                                        name={'silicioVisual'}
                                                    >
                                                        {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'0.00'} textAlign="center" />}
                                                    </InputMask>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel textAlign="center">Real</FormLabel>
                                                    <InputMask
                                                        mask={'9.99'}
                                                        value={formData.silicioReal}
                                                        onChange={handleChange}
                                                        name={'silicioReal'}
                                                    >
                                                        {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'0.00'} textAlign="center" />}
                                                    </InputMask>
                                                </FormControl>
                                            </Grid>
                                            <Text textAlign="center" fontWeight="bold" mt={4} mb={2}>Outros Elementos (%)</Text>
                                            <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
                                                <FormControl>
                                                    <FormLabel textAlign="center">P (Fósforo)</FormLabel>
                                                    <InputMask mask="9.999" value={formData.fosforo} onChange={handleChange} name={'fosforo'}>
                                                        {(inputProps) => <Input {...inputProps} type="text" placeholder={'0.000'} textAlign="center" />}
                                                    </InputMask>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel textAlign="center">Mn (Manganês)</FormLabel>
                                                    <InputMask mask="9.99" value={formData.manganes} onChange={handleChange} name={'manganes'}>
                                                        {(inputProps) => <Input {...inputProps} type="text" placeholder={'0.00'} textAlign="center" />}
                                                    </InputMask>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel textAlign="center">S (Enxofre)</FormLabel>
                                                    <InputMask mask="9.999" value={formData.silica} onChange={handleChange} name={'silica'}>
                                                        {(inputProps) => <Input {...inputProps} type="text" placeholder={'0.000'} textAlign="center" />}
                                                    </InputMask>
                                                </FormControl>
                                            </Grid>
                                        </Box>

                                        <Box>
                                            <Text fontWeight="semibold" mb={3} borderBottomWidth="1px" pb={2} mt={4}>Escória Vazamento</Text>
                                            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} alignItems="end">
                                                <FormControl>
                                                    <FormLabel>Início</FormLabel>
                                                    <InputMask mask={'99:99'} onChange={handleChange} value={formData.escoriaInicio} name={'escoriaInicio'}>
                                                        {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'HH:MM'} />}
                                                    </InputMask>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Fim</FormLabel>
                                                    <InputMask mask={'99:99'} onChange={handleChange} value={formData.escoriaFim} name={'escoriaFim'}>
                                                        {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'HH:MM'} />}
                                                    </InputMask>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Tipo de escória</FormLabel>
                                                    <Select placeholder="Selecione o tipo" value={tipoEscoria} onChange={handleTipoDeEscoria} name="tipoEscoria">
                                                        <option value="verde">Verde</option>
                                                        <option value="verde-clara">Verde Clara</option>
                                                        <option value="cinza">Cinza</option>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Box>
                                    </VStack>
                                </Box>
                            </Box>
                        </GridItem>
                    </Grid>

                    {/* Linha 2 de Cards */}
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6}>
                        {/* Card Cargas Fundidas */}
                        <GridItem>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" h="100%" bg="white">
                                <Flex as="header" align="center" p={4} bg="gray.100" borderBottomWidth="1px">
                                    <Icon as={FaCube} mr={3} boxSize={5} />
                                    <Text fontWeight="bold">Cargas Fundidas</Text>
                                </Flex>
                                <Box p={4}> {/* Corpo do card com fundo branco já definido pelo Box pai */}
                                    <VStack spacing={4} align="stretch">
                                        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                                            <FormControl>
                                                <FormLabel>De N°</FormLabel>
                                                <Input name="cargaFundidaDe" value={deNumero} onChange={handleCargaDeChange} placeholder={'Ex: 1'} type="number" />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Até N°</FormLabel>
                                                <Input name="cargaFundidaAte" value={ateNumero} onChange={handleCargaAteChange} placeholder={'Ex: 10'} type="number" />
                                            </FormControl>
                                        </Grid>
                                        <FormControl>
                                            <FormLabel>Quantidade</FormLabel>
                                            <Input value={qt} name="quantidadeCargas" isReadOnly bg="gray.100" textAlign="center" />
                                        </FormControl>
                                        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                                            <FormControl>
                                                <FormLabel>Fe/Gusa (KG)</FormLabel>
                                                <Input value={gusa} name="feGusaKg" onChange={(e) => { setGusa(e.target.value); handleChange(e); }} placeholder={'Ex: 1500'} type="number" />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Fe₂O₃</FormLabel>
                                                <Input name="ferroFe2O3" value={ferro} isReadOnly bg="gray.100" textAlign="center" />
                                            </FormControl>
                                        </Grid>
                                    </VStack>
                                </Box>
                            </Box>
                        </GridItem>

                        {/* Card Peso do Gusa e Temperatura */}
                        <GridItem>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" h="100%" bg="white">
                                <Flex as="header" align="center" p={4} bg="gray.100" borderBottomWidth="1px">
                                    <Icon as={FaWeightHanging} mr={3} boxSize={5} />
                                    <Text fontWeight="bold">Peso do Gusa e Temperatura</Text>
                                </Flex>
                                <Box p={4}> {/* Corpo do card com fundo branco já definido pelo Box pai */}
                                    <VStack spacing={4} align="stretch">
                                        <FormControl>
                                            <FormLabel>Real (TN)</FormLabel>
                                            <Input placeholder={'Ex: 70.5'} name="realTn" value={realTn} onChange={(e) => { service.handleRealTnChange(e, setRealTn); handleChange(e); }} type="number" step="0.01" />
                                        </FormControl>
                                        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                                            <FormControl>
                                                <FormLabel>Tempo de corrida (min)</FormLabel>
                                                <Input name={'tempoCorridaMinutos'} placeholder={'Ex: 45'} value={tempoCorrida} onChange={(e) => { handleTempoCorridaChange(e); handleChange(e); }} type="number" />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Gusa (ton/min)</FormLabel>
                                                <Input name={'toneladaGusaPorMinuto'} isReadOnly bg="gray.100" value={toneladaGusa} textAlign="center" />
                                            </FormControl>
                                        </Grid>
                                        <FormControl>
                                            <FormLabel>Temperatura do Gusa (°C)</FormLabel>
                                            <Input name="temperatura" placeholder='Ex: 1450' value={formData.temperatura} onChange={handleChange} type="number" />
                                        </FormControl>
                                    </VStack>
                                </Box>
                            </Box>
                        </GridItem>

                        {/* Card Consumo Carvão e Sopradores */}
                        <GridItem>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" h="100%" bg="white">
                                <Flex as="header" align="center" p={4} bg="gray.100" borderBottomWidth="1px">
                                    <Icon as={FaFireAlt} mr={3} boxSize={5} />
                                    <Text fontWeight="bold">Consumo Carvão e Sopradores</Text>
                                </Flex>
                                <Box p={4}> {/* Corpo do card com fundo branco já definido pelo Box pai */}
                                    <VStack spacing={6} align="stretch">
                                        <Box>
                                            <Text fontWeight="semibold" mb={3} borderBottomWidth="1px" pb={2}>Consumo Esperado de Carvão</Text>
                                            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                                                <FormControl>
                                                    <FormLabel>KG/T</FormLabel>
                                                    <Input name="carvaoKg" value={kgt} placeholder={'Ex: 750'} onChange={(e) => { setkgt(e.target.value); handleChange(e); }} type="number" />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>M³/T</FormLabel>
                                                    <Input name="carvaoMetros" value={m3t} placeholder={'Ex: 2.5'} onChange={(e) => { service.handleM3tNumber(e, setM3t); handleChange(e); }} type="number" step="0.01" />
                                                </FormControl>
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="semibold" mb={3} borderBottomWidth="1px" pb={2} mt={2}>Corrente dos Eletros Sopradores (A)</Text>
                                            <Grid templateColumns="repeat(5, 1fr)" gap={{ base: 2, sm: 3 }}>
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <FormControl key={num}>
                                                        <FormLabel textAlign="center">{num}</FormLabel>
                                                        <Input name={`sopradores${num}`} value={formData[`sopradores${num}`]} onChange={handleChange} textAlign="center" type="number" />
                                                    </FormControl>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </VStack>
                                </Box>
                            </Box>
                        </GridItem>
                    </Grid>

                    {/* Botão de Registro */}
                    <Flex justifyContent="flex-end" mt={4} mb={8}>
                        <Button
                            leftIcon={<Icon as={FaSave} />}
                            colorScheme="whatsapp"
                            size="lg"
                            type="submit"
                            px={8}
                            w={{ base: "full", md: "auto" }}
                        >
                            Registrar Corrida
                        </Button>
                    </Flex>
                </VStack>
            </form>

            <Modal show={showSuccessModal} onHide={handleClose} centered>
                <Modal.Header className={'bg-success text-white'} closeButton>
                    <Modal.Title>
                        <Icon as={FaClipboardList} style={{ marginRight: '10px' }} /> Sucesso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Corrida cadastrada com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button colorScheme="blue" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={handleClose} centered>
                <Modal.Header className={'bg-danger text-white'} closeButton>
                    <Modal.Title >
                        <Icon as={FaExclamationTriangle} style={{ marginRight: '10px' }} /> Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensagemErro}
                </Modal.Body>
                <Modal.Footer>
                    <Button colorScheme="gray" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}

export default ControleDeCorridas;
