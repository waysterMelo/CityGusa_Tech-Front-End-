import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    Box,
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Input,
    Select,
    SimpleGrid,
    Spacer,
    Stack, Table, TableContainer, Tbody, Td,
    Text, Th, Thead, Tr, useDisclosure,
    VStack
} from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import {Modal} from "react-bootstrap";
import ControleDeCorridasService from '../../../App/service/ControleDeCorridasService';
import InputMask from "react-input-mask";
import * as sizes from "react-bootstrap/ElementChildren";
import { CgMoreO  } from "react-icons/cg";

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
    const [corridas, setCorridas] = useState([]);
    const horaInicioRef = useRef(null);
    const horaFimRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('')
    const btnRef = React.useRef();


    const handleClick = (newSize) =>{
        setSize(newSize)
        onOpen()
    }

    const sizes = ['md'];

    const handleChange = (e) => {
        service.handleChange(e, setFormData);
    };

    const handleTempoCorridaChange = (e) => {
        const value = e.target.value;
        service.handleTempoCorridaChange(value, setTempoCorrida);
    };

    const fecthCorridas = async () => {
        const data = await service.getCorridasDoDia();
        setCorridas(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await service.salvar();
        setShowSuccessModal(service.showSuccessModal);
        setShowErrorModal(service.showErrorModal);
        setMensagemErro(service.mensagemErro);
        if (result.success) {
            setShowSuccessModal(true);
            fecthCorridas();
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
        service.handleChange({ target: { name: 'tipo_escoria', value } }, setFormData);
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
        service.handleGusaPorMinuto("gusa_minuto", result, setFormData);
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
            service.handle_fe_gusa_kg("fe_gusa_kg", gusa, setFormData);
            service.handleFerroResultado("ferro", fe2o3Result, setFormData);
        } else {
            setFerro('');
        }
    }, [qt, gusa, service]);

    useEffect(() => {
        fecthCorridas()
    }, []);


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
                                          <InputMask
                                            mask={'9.99'}
                                            value={formData.silicio_visual}
                                            onChange={handleChange}
                                            placeholder={'0.00'}
                                            name={'silicio_visual'}
                                            >
                                              {(inputProps) => <Input {...inputProps} type={'text'} />}
                                          </InputMask>
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel className={'text-center'}>Real</FormLabel>
                                            <InputMask
                                                mask={'9.99'}
                                                value={formData.silicio_real}
                                                onChange={handleChange}
                                                placeholder={'0.00'}
                                                name={'silicio_real'}
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
                                <Text className={'p-3 text-bg-dark'}>Escória</Text>
                                <HStack spacing={3} width={'100%'} className={'p-2'}>
                                    <FormControl className={'w-50'}>
                                        <FormLabel>Início</FormLabel>
                                        <InputMask
                                            mask={'99:99'}
                                            onChange={handleChange}
                                            value={formData.escoria_inicio}
                                            placeholder={'HH:MM'}
                                            name={'escoria_inicio'}
                                        >
                                            {(inputProps) => <Input {...inputProps} type={'text'} />}
                                        </InputMask>
                                    </FormControl>
                                    <FormControl className={'w-50'}>
                                        <FormLabel>Fim</FormLabel>
                                        <InputMask
                                            mask={'99:99'}
                                            onChange={handleChange}
                                            value={formData.escoria_fim}
                                            placeholder={'HH:MM'}
                                            name={'escoria_fim'}
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
                            <HStack>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>De N°</FormLabel>
                                    <Input name="carga_fundida_de" value={deNumero} onChange={handleCargaDeChange} placeholder={'digite aqui'} />
                                </FormControl>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Até N°</FormLabel>
                                    <Input name="carga_fundida_ate" value={ateNumero} onChange={handleCargaAteChange} placeholder={'digite aqui'} />
                                </FormControl>
                            </HStack>

                            <FormControl className={'form-control-sm'}>
                                <FormLabel>Quantidade</FormLabel>
                                <Input value={qt} name="quantidade" className={'text-bg-secondary text-center'} readOnly />
                            </FormControl>
                            <HStack>
                                <FormControl className={'form-control-sm'}>
                                    <FormLabel>Fe/Gusa/(KG)</FormLabel>
                                    <Input value={gusa} name="fe_gusa_kg"
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

                            <HStack width={'auto'} className={'p-1'} justify="center">
                                <Flex className={'pt-5'}>
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
                                            <Input name={'tempo_corrida_minutos'}
                                                placeholder={'digite aqui'}
                                                value={tempoCorrida}
                                                onChange={handleTempoCorridaChange}
                                            />
                                        </FormControl>

                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>Tonelada de gusa por min</FormLabel>
                                            <Input name={'gusa_minuto'} className={'text-bg-secondary'} readOnly={true} value={toneladaGusa} />
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
                                            <Input name="carvao_kg" value={kgt} placeholder={'digite aqui'} onChange={(e) => { setkgt(e.target.value); handleChange(e); }} />
                                        </FormControl>
                                        <Spacer />
                                        <FormControl className={'form-control-lg'}>
                                            <FormLabel>M³/T</FormLabel>
                                            <Input name="carvao_metros" value={m3t} placeholder={'digite aqui'} onChange={(e) => { service.handleM3tNumber(e, setM3t); }} />
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
                                            <Input name={'sopradores_1'} value={formData.sopradores_1} onChange={handleChange} />
                                        </FormControl>

                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>2</FormLabel>
                                            <Input name={'sopradores_2'} value={formData.sopradores_2} onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className={'form-control-sm'}>
                                            <FormLabel>3</FormLabel>
                                            <Input name={'sopradores_3'} value={formData.sopradores_3} onChange={handleChange} />
                                        </FormControl>
                                    </Flex>

                                    <Box width={'100%'}>
                                        <Flex>
                                            <FormControl className={'form-control-sm'}>
                                                <FormLabel>4</FormLabel>
                                                <Input name={'sopradores_4'} value={formData.sopradores_4} onChange={handleChange} />
                                            </FormControl>
                                            <FormControl className={'form-control-sm'}>
                                                <FormLabel>5</FormLabel>
                                                <Input name={'sopradores_5'} value={formData.sopradores_5} onChange={handleChange} />
                                            </FormControl>
                                        </Flex>
                                        <Flex justifyContent={'flex-end'} className="pt-5">
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

            <SimpleGrid  mt={5}>
                <Flex justifyContent={'center'}>
                    {
                        sizes.map((size) => (
                            <Button  ref={btnRef} onClick={() => handleClick(size)}
                                    leftIcon={<CgMoreO/>} key={size}
                                    colorScheme='facebook'>VER CORRIDAS DO DIA </Button>
                        ))
                    }

                    <Drawer isOpen={isOpen} onClose={onClose} size={'xl'} placement={'bottom'} finalFocusRef={btnRef}>
                        <DrawerOverlay/>
                        <DrawerContent>
                            <DrawerCloseButton/>
                            <DrawerHeader>
                                <Text bgColor={'facebook.400'} color={'white'} className={'text-center p-4 h3'}>Controle das Corridas</Text>
                            </DrawerHeader>

                            <DrawerBody>
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
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant={'solid'} colorScheme={'twitter'} onClick={onClose}>
                                    Voltar
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </SimpleGrid>

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
