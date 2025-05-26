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
import {
    FaClipboardList, FaClock, FaCube,
    FaExclamationTriangle,
    FaFireAlt,
    FaFlask,
    FaRecycle,
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
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }} mr={{ base: "2%" }}> {/* Adicionado mr para margem direita */}
            <Grid
                templateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}
            >
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
                <div className="d-flex flex-column gap-4"> {/* Container principal para linhas de cards */}

                    {/* Linha 1 de Cards */}
                    <div className="row row-cols-1 row-cols-lg-2 g-4">
                        {/* Card Vazamento */}
                        <div className="col">
                            <div className="card w-100 border border-black border-2 shadow-sm">
                                <div className="card-header bg-light d-flex align-items-center">
                                    <FaClock className="text-black me-2" size={20} />
                                    <span className="fw-bold text-black">Vazamento</span>
                                </div>
                                <div className="card-body">
                                    <VStack spacing={4} align="stretch">
                                        <FormControl>
                                            <FormLabel>Hora Início</FormLabel>
                                            <Input
                                                type={'datetime-local'}
                                                name={'horaInicio'}
                                                value={horaInicio}
                                                onChange={(e) => { setHoraInicio(e.target.value); handleChange(e); }}
                                                ref={horaInicioRef}
                                                borderColor="gray.300"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Hora Fim</FormLabel>
                                            <Input
                                                type={'datetime-local'}
                                                name={'horaFim'}
                                                value={horaFim}
                                                onChange={(e) => { setHoraFim(e.target.value); handleChange(e); }}
                                                ref={horaFimRef}
                                                borderColor="gray.300"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Minutos</FormLabel>
                                            <Input name="minutos" placeholder='minutos' value={minutos} readOnly className={'text-bg-secondary'} borderColor="gray.300" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Conchas</FormLabel>
                                            <Input name="conchas" placeholder='caçambas' value={formData.conchas} onChange={handleChange} borderColor="gray.300" />
                                        </FormControl>
                                    </VStack>
                                </div>
                            </div>
                        </div>

                        {/* Card Análise QM e Escória */}
                        <div className="col">
                            <div className="card w-100 border border-black border-2 shadow-sm">
                                <div className="card-header bg-light d-flex align-items-center">
                                    <FaFlask className="text-black me-2" size={20} />
                                    <span className="fw-bold text-black">Análise Química e Escória</span>
                                </div>
                                <div className="card-body">
                                    <VStack spacing={6} align="stretch">
                                        {/* Seção Análise QM */}
                                        <Box>
                                            <Text fontWeight="semibold" mb={2} borderBottomWidth="1px" pb={1}>Análise QM (Gusa)</Text>
                                            <div className="row g-3">
                                                <div className="col-md-12">
                                                    <Text className={'p-2 border-bottom text-center fw-bold'}>Silício</Text>
                                                </div>
                                                <div className="col-md-6">
                                                    <FormControl>
                                                        <FormLabel className={'text-center'}>Visual</FormLabel>
                                                        <InputMask
                                                            mask={'9.99'}
                                                            value={formData.silicioVisual}
                                                            onChange={handleChange}
                                                            name={'silicioVisual'}
                                                        >
                                                            {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'0.00'} borderColor="gray.300" textAlign="center"/>}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-6">
                                                    <FormControl>
                                                        <FormLabel className={'text-center'}>Real</FormLabel>
                                                        <InputMask
                                                            mask={'9.99'}
                                                            value={formData.silicioReal}
                                                            onChange={handleChange}
                                                            name={'silicioReal'}
                                                        >
                                                            {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'0.00'} borderColor="gray.300" textAlign="center"/>}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="row g-3 mt-2">
                                                <div className="col-md-12">
                                                    <Text className={'p-2 border-bottom text-center fw-bold'}>Outros Elementos</Text>
                                                </div>
                                                <div className="col-md-4">
                                                    <FormControl>
                                                        <FormLabel className={'text-center'}>P (Fósforo)</FormLabel>
                                                        <InputMask mask="9.999" value={formData.fosforo} onChange={handleChange} name={'fosforo'}>
                                                            {(inputProps) => <Input {...inputProps} type="text" placeholder={'0.000'} borderColor="gray.300" textAlign="center"/>}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-4">
                                                    <FormControl>
                                                        <FormLabel className={'text-center'}>Mn (Manganês)</FormLabel>
                                                        <InputMask mask="9.99" value={formData.manganes} onChange={handleChange} name={'manganes'}>
                                                            {(inputProps) => <Input {...inputProps} type="text" placeholder={'0.00'} borderColor="gray.300" textAlign="center"/>}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-4">
                                                    <FormControl>
                                                        <FormLabel className={'text-center'}>S (Enxofre)</FormLabel>
                                                        <InputMask mask="9.999" value={formData.silica} onChange={handleChange} name={'silica'}>
                                                            {(inputProps) => <Input {...inputProps} type="text" placeholder={'0.000'} borderColor="gray.300" textAlign="center"/>}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </Box>

                                        {/* Seção Escória Vazamento */}
                                        <Box>
                                            <Text fontWeight="semibold" mb={2} borderBottomWidth="1px" pb={1} mt={4}>Escória Vazamento</Text>
                                            <div className="row g-3">
                                                <div className="col-md-6 col-lg-4">
                                                    <FormControl>
                                                        <FormLabel>Início</FormLabel>
                                                        <InputMask mask={'99:99'} onChange={handleChange} value={formData.escoriaInicio} name={'escoriaInicio'}>
                                                            {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'HH:MM'} borderColor="gray.300" />}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <FormControl>
                                                        <FormLabel>Fim</FormLabel>
                                                        <InputMask mask={'99:99'} onChange={handleChange} value={formData.escoriaFim} name={'escoriaFim'}>
                                                            {(inputProps) => <Input {...inputProps} type={'text'} placeholder={'HH:MM'} borderColor="gray.300" />}
                                                        </InputMask>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-12 col-lg-4">
                                                    <FormControl>
                                                        <FormLabel>Tipo de escória</FormLabel>
                                                        <Select placeholder="Selecione o tipo" value={tipoEscoria} onChange={handleTipoDeEscoria} name="tipoEscoria" borderColor="gray.300">
                                                            <option value="verde">Verde</option>
                                                            <option value="verde-clara">Verde Clara</option>
                                                            <option value="cinza">Cinza</option>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </Box>
                                    </VStack>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Linha 2 de Cards */}
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                        {/* Card Cargas Fundidas */}
                        <div className="col">
                            <div className="card w-100 border border-black border-2 shadow-sm">
                                <div className="card-header bg-light d-flex align-items-center">
                                    <FaCube className="text-black me-2" size={20} />
                                    <span className="fw-bold text-black">Cargas Fundidas</span>
                                </div>
                                <div className="card-body">
                                    <VStack spacing={4} align="stretch">
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <FormControl>
                                                    <FormLabel>De N°</FormLabel>
                                                    <Input name="cargaFundidaDe" value={deNumero} onChange={handleCargaDeChange} placeholder={'digite aqui'} borderColor="gray.300" />
                                                </FormControl>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl>
                                                    <FormLabel>Até N°</FormLabel>
                                                    <Input name="cargaFundidaAte" value={ateNumero} onChange={handleCargaAteChange} placeholder={'digite aqui'} borderColor="gray.300" />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <FormLabel>Quantidade</FormLabel>
                                            <Input value={qt} name="quantidadeCargas" className={'text-bg-secondary text-center'} readOnly borderColor="gray.300" />
                                        </FormControl>
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <FormControl>
                                                    <FormLabel>Fe/Gusa/(KG)</FormLabel>
                                                    <Input value={gusa} name="feGusaKg" onChange={(e) => {setGusa(e.target.value); handleChange(e);}} placeholder={'digite aqui'} borderColor="gray.300" />
                                                </FormControl>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl>
                                                    <FormLabel>Fe₂O₃</FormLabel>
                                                    <Input name="ferroFe2O3" value={ferro} className={'text-bg-secondary text-center'} readOnly borderColor="gray.300" />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </VStack>
                                </div>
                            </div>
                        </div>

                        {/* Card Peso do Gusa e Temperatura */}
                        <div className="col">
                            <div className="card w-100 border border-black border-2 shadow-sm">
                                <div className="card-header bg-light d-flex align-items-center">
                                    <FaWeightHanging className="text-black me-2" size={20} />
                                    <span className="fw-bold text-black">Peso do Gusa e Temperatura</span>
                                </div>
                                <div className="card-body">
                                    <VStack spacing={4} align="stretch">
                                        <FormControl>
                                            <FormLabel>Real (TN)</FormLabel>
                                            <Input placeholder={'digite aqui'} name="realTn" value={realTn} onChange={(e) => {service.handleRealTnChange(e, setRealTn); handleChange(e);}} borderColor="gray.300" />
                                        </FormControl>
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <FormControl>
                                                    <FormLabel>Tempo de corrida (min)</FormLabel>
                                                    <Input name={'tempoCorridaMinutos'} placeholder={'digite aqui'} value={tempoCorrida} onChange={(e) => {handleTempoCorridaChange(e); handleChange(e);}} borderColor="gray.300" />
                                                </FormControl>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl>
                                                    <FormLabel>Gusa (ton/min)</FormLabel>
                                                    <Input name={'toneladaGusaPorMinuto'} className={'text-bg-secondary text-center'} readOnly={true} value={toneladaGusa} borderColor="gray.300" />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <FormLabel>Temperatura do Gusa (°C)</FormLabel>
                                            <Input name="temperatura" placeholder='temperatura gusa' value={formData.temperatura} onChange={handleChange} borderColor="gray.300" />
                                        </FormControl>
                                    </VStack>
                                </div>
                            </div>
                        </div>

                        {/* Card Consumo Carvão e Sopradores */}
                        <div className="col">
                            <div className="card w-100 border border-black border-2 shadow-sm">
                                <div className="card-header bg-light d-flex align-items-center">
                                    <FaFireAlt className="text-black me-2" size={20} />
                                    <span className="fw-bold text-black">Consumo Carvão e Sopradores</span>
                                </div>
                                <div className="card-body">
                                    <VStack spacing={6} align="stretch">
                                        <Box>
                                            <Text fontWeight="semibold" mb={2} borderBottomWidth="1px" pb={1}>Consumo Esperado de Carvão</Text>
                                            <div className="row g-3">
                                                <div className="col-sm-6">
                                                    <FormControl>
                                                        <FormLabel>KG/T</FormLabel>
                                                        <Input name="carvaoKg" value={kgt} placeholder={'digite aqui'} onChange={(e) => { setkgt(e.target.value); handleChange(e); }} borderColor="gray.300" />
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormControl>
                                                        <FormLabel>M³/T</FormLabel>
                                                        <Input name="carvaoMetros" value={m3t} placeholder={'digite aqui'} onChange={(e) => { service.handleM3tNumber(e, setM3t); handleChange(e);}} borderColor="gray.300" />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="semibold" mb={2} borderBottomWidth="1px" pb={1} mt={2}>Corrente dos Eletros Sopradores (A)</Text>
                                            <div className="row g-2">
                                                <div className="col">
                                                    <FormControl> <FormLabel textAlign="center">1</FormLabel> <Input name={'sopradores1'} value={formData.sopradores1} onChange={handleChange} borderColor="gray.300" textAlign="center"/> </FormControl>
                                                </div>
                                                <div className="col">
                                                    <FormControl> <FormLabel textAlign="center">2</FormLabel> <Input name={'sopradores2'} value={formData.sopradores2} onChange={handleChange} borderColor="gray.300" textAlign="center"/> </FormControl>
                                                </div>
                                                <div className="col">
                                                    <FormControl> <FormLabel textAlign="center">3</FormLabel> <Input name={'sopradores3'} value={formData.sopradores3} onChange={handleChange} borderColor="gray.300" textAlign="center"/> </FormControl>
                                                </div>
                                                <div className="col">
                                                    <FormControl> <FormLabel textAlign="center">4</FormLabel> <Input name={'sopradores4'} value={formData.sopradores4} onChange={handleChange} borderColor="gray.300" textAlign="center"/> </FormControl>
                                                </div>
                                                <div className="col">
                                                    <FormControl> <FormLabel textAlign="center">5</FormLabel> <Input name={'sopradores5'} value={formData.sopradores5} onChange={handleChange} borderColor="gray.300" textAlign="center"/> </FormControl>
                                                </div>
                                            </div>
                                        </Box>
                                    </VStack>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botão de Registro */}
                    <Flex justifyContent="flex-end" mt={4} mb={4}> {/* Adicionado mb={4} para espaço antes do fim da página */}
                        <Button
                            leftIcon={<FaSave />}
                            colorScheme="whatsapp"
                            size="lg"
                            type="submit"
                            width={{ base: "full", md: "auto" }}
                        >
                            Registrar Corrida
                        </Button>
                    </Flex>
                </div>
            </form>

            {/* Modais (mantidos como no seu código original - react-bootstrap) */}
            <Modal show={showSuccessModal} onHide={handleClose} centered>
                <Modal.Header className={'bg-success text-white'} closeButton>
                    <Modal.Title>
                        <FaClipboardList style={{ marginRight: '10px' }} /> Sucesso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Corrida cadastrada com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className={'bg-primary text-white'} onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={handleClose} centered>
                <Modal.Header className={'bg-danger text-white'} closeButton>
                    <Modal.Title >
                        <FaExclamationTriangle style={{ marginRight: '10px' }} /> Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensagemErro}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className={'bg-dark text-white'} onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}

export default ControleDeCorridas;
