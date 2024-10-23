import React, {useState} from "react";
import {
    Box,
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,
    DrawerFooter, DrawerHeader, DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
    useDisclosure,
    WrapItem
} from "@chakra-ui/react";
import {format} from "date-fns";
import {CalendarIcon, ChevronRightIcon, DragHandleIcon} from "@chakra-ui/icons";
import Banner from "../../../components/banner/Banner";
import InputMask from "react-input-mask";
import {Modal} from "react-bootstrap";
import CadastrarAnaliseMinerioService from "../../../App/AnalisesService/Minerios/CadastrarAnaliseMinerioService";

export default function AnaliseQuimicaDeMinerio() {
    const current_date = new Date();
    const [service] = useState(new CadastrarAnaliseMinerioService());
    const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);
    const formatted_date = format(current_date, "dd/MM/yyyy");
    const [formData, setFormData] = useState(service.formData);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [lotePesquisa, setLotePesquisa] = useState("");
    const [resultadosLote, setResultadosLote] = useState([]);
    const [loteSelecionado, setLoteSelecionado] = useState(null);

    const formatDate =(dateString) => {
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    // Atualizar o estado ao selecionar um lote da tabela
    const handleLoteSelecionado = (minerioSelecionado) => {
            setLoteSelecionado(minerioSelecionado);
    }

    // Função para pesquisar lotes
    const handleLoteChange = async (e) => {
        const { value } =  e.target;
        setLotePesquisa(value);
        if (value.length > 0) {
            const rs  = await service.getMineriosPorLote(value);
            if (rs.success) {
                setResultadosLote(rs.data);
            }
        }else{
            setResultadosLote([]);
        }
    }

    // Função para pesquisar lotes
    const handleLoteConfirm = () => {
        if (loteSelecionado) {
            const updatedDataForm ={
                ...formData,
                minerioNome: loteSelecionado.minerioNome,
                lote: loteSelecionado.lote,
                patio: loteSelecionado.patio
            };
            setFormData(updatedDataForm);
            onClose();
        }
    };




    const handleCadastrar = async (e) => {
        e.preventDefault();
        try {
            const rs = await service.salvar(formData);
            if (rs.success) {
                setShowSuccessModal(true);
                setShowErrorModal(false);
                setMensagemErro('');
                service.resetFormData(setFormData); // Mantenha o reset para limpar o formulário.
            } else {
                setShowSuccessModal(false);
                setShowErrorModal(true);
                setMensagemErro(rs.errorMessage || 'Ocorreu um erro ao salvar.');
            }
        } catch (err) {
            setShowSuccessModal(false);
            setShowErrorModal(true);
            setMensagemErro('Erro ao realizar a operação. Tente novamente mais tarde.');
        }
    };

    const handleChange = (e) => {
        service.handleChange(e, setFormData);
    };


    const handleClose = () => {
        service.handleClose(setShowSuccessModal, setShowErrorModal);
    }

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} mx={{ base: "2%" }}>
            {/* Main Fields */}
            <Grid
                mb='-1%'
                gridTemplateColumns={{ xl: "repeat(1, 1fr)", "2xl": "1fr 1" }}
                gap={{ base: "20px", xl: "10px" }}
                display={{ base: "block", xl: "grid" }}>
                <Flex
                    flexDirection='column'
                    width={'100%'}
                    gridArea={{md: "2x1"}}>
                    <Flex direction='column'>
                        <Banner url_voltar={'/admin/analises'} texto_primario={'CADASTRAR ANÁLISES DE MINÉRIO'}
                                primeiro_botao={'consultar análises'} url={'ver-analises-minerio'}
                        />
                    </Flex>
                </Flex>
            </Grid>
            <form onSubmit={handleCadastrar}>
            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'} pt={'7'} w={'96%'}>
                <GridItem gap={'5'}>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <CalendarIcon color='blue'/>
                            </InputLeftElement>
                            <Input className={'bg-dark-subtle fw-bold border-black'} fontSize={'15px'} value={formatted_date} pointerEvents={'none'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(7, 1fr)'  mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'}>
                <GridItem colSpan={2} className={'me-2'}>
                    <FormControl>
                        <FormLabel marginTop={3}>Tipo Minério</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <DragHandleIcon color='blue'/>
                        </InputLeftElement>
                        <Input className={'text-uppercase bg-dark-subtle text-black border-black fw-bold'}
                               name={'minerioNome'} value={formData.minerioNome} readOnly={true} onChange={handleChange}></Input>
                    </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel marginTop={3} className={'invisible'}>Pesquisar por Lote</FormLabel>
                        <InputGroup>
                          <Button onClick={onOpen} colorScheme={'facebook'}>Pesquisar por Lote</Button>
                        </InputGroup>
                    </FormControl>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        initialFocusRef={firstField}
                        onClose={onClose}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth='1px'>
                              Pesquisar Lote
                            </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing='24px'>
                                    <Box>
                                        <FormLabel htmlFor='lote'>Nome do lote</FormLabel>
                                        <Input
                                            ref={firstField}
                                            id='lote'
                                            placeholder='Digite o lote'
                                            value={lotePesquisa}
                                            onChange={handleLoteChange}
                                        />
                                    </Box>
                                    <TableContainer>
                                        <Table className={'table table-dark'}>
                                            <Thead>
                                                <Tr>
                                                    <Th>LOTE</Th>
                                                    <Th>DATA</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {resultadosLote.map((minerio) => (
                                                    <Tr key={minerio.id}
                                                    onClick={() => handleLoteSelecionado(minerio)}
                                                        style={{cursor: "pointer", background: loteSelecionado?.id === minerio.id ? "BEE3F8" : "transparent"}}>
                                                        <Td>{minerio.lote}</Td>
                                                        <Td>{formatDate(minerio.createdAt)}</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth='1px'>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button colorScheme='blue' onClick={handleLoteConfirm} isDisabled={!loteSelecionado}>Selecionar</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'} pb={'1'}>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>Lote</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} name={'lote'} value={formData.lote} readOnly={true} onChange={handleChange}
                                   className={'text-center bg-dark-subtle text-black border-black fw-bold'} />
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>Pátio</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'}  className={'text-center bg-dark-subtle text-black border-black fw-bold'}
                                  name={'patio'} onChange={handleChange}
                                   textTransform={'uppercase'} value={formData.patio} readOnly={true}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Tonelada</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <InputMask
                                mask={'999.999'}
                                placeholder={'000.000'}
                                value={formData.tonelada}
                                name={'tonelada'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Ferro</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <InputMask
                                mask={'99.99'}
                                placeholder={'00.00'}
                                value={formData.ferro}
                                name={'ferro'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'} pb={'10'}>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Sílica</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                        </InputGroup>
                        <InputMask
                            mask={'9.99'}
                            placeholder={'0.00'}
                            value={formData.silica}
                            name={'silica'}
                            onChange={handleChange}
                        >
                            {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                        </InputMask>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>Alumínio</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <InputMask
                                mask={'9.99'}
                                placeholder={'0.00'}
                                value={formData.aluminio}
                                name={'aluminio'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Fósforo</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <InputMask
                                mask={'9.999'}
                                placeholder={'0.000'}
                                value={formData.fosforo}
                                name={'fosforo'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Manganês</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <InputMask
                                mask={'9.99'}
                                placeholder={'0.00'}
                                value={formData.manganes}
                                name={'manganes'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>P.P.C</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <InputMask
                                mask={'9.99'}
                                placeholder={'0.00'}
                                value={formData.ppc}
                                name={'ppc'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} className={'text-center'}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <Flex align={'end'} marginLeft={'10%'}>
                    <WrapItem>
                        <Button colorScheme='whatsapp' type={'submit'}>Registrar</Button>
                    </WrapItem>
                </Flex>
            </Grid>
            </form>
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header className={'bg-success text-white'} closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Registro cadastrado com sucesso!
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

