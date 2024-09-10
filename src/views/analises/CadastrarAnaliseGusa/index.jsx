import React, {useRef, useState} from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem, Input, InputGroup, InputLeftElement, WrapItem
} from "@chakra-ui/react";
import {format} from "date-fns";
import {CalendarIcon, DragHandleIcon} from "@chakra-ui/icons";
import Banner from "../../../components/banner/Banner";
import {Modal} from "react-bootstrap";
import AnaliseGusaService from "../../../App/AnalisesService/AnaliseGusaService";
import InputMask from "react-input-mask";

export default function AnaliseGusa() {
    const current_date = new Date();
    const formatted_date = format(current_date, "dd/MM/yyyy");
    const service = useRef(new AnaliseGusaService()).current;
    const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);
    const [formData, setFormData] = useState(service.formData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await service.salvar();
        setShowSuccessModal(service.showSuccessModal);
        setShowErrorModal(service.showErrorModal);
        setMensagemErro(service.mensagemErro);
        if (result.success) {
            setShowSuccessModal(true);
            service.resetFormData(setFormData);
        } else {
            setShowErrorModal(true);
        }
    };

    const handleChange = (e) => {
        service.handleChange(e, setFormData);
    };

    const handleClose = () => {
        service.handleClose(setShowSuccessModal, setShowErrorModal);
    };


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
                    <Banner texto_primario={'CONTROLE ANÁLISE GUSA'}
                            url_voltar={'/admin/analises'}  primeiro_botao={'Ver análises de gusa'} url={'ver-analises-gusa'}/>
                </Flex>
            </Grid>
            <form onSubmit={handleSubmit}>
            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'} pt={'7'} w={'96%'}>
                <GridItem gap={'5'}>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <CalendarIcon color='blue'/>
                            </InputLeftElement>
                            <Input fontSize={'15px'} value={formatted_date} pointerEvents={'none'} onChange={handleChange}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(7, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'} w={'96%'}>
                <GridItem py={5}>
                    <FormControl>
                        <FormLabel>Produto</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <DragHandleIcon color='blue'/>
                        </InputLeftElement>
                        <Input name={'produto'} value={"GUSA"} isReadOnly pointerEvents={'none'} />
                    </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(7, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'} w={'96%'} pb={'10'}>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel>Fe (%): Ferro</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'99'}
                                name={'ferro'}
                                value={formData.ferro}
                                onChange={handleChange}
                                placeholder={'00'}
                            >
                                {(inputProps) => <Input {...inputProps} type={'text'} />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel>Si(%): Silício</FormLabel>
                        <InputGroup>
                            <InputMask
                              mask={'9.999'}
                              value={formData.silicio}
                              onChange={handleChange}
                              name={'silicio'}
                              placeholder={'0.00'}
                            >
                                {(inputProps) => <Input {...inputProps}/>}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel>S (%): Enxofre</FormLabel>
                        <InputGroup>
                          <InputMask
                            mask={'9.999'}
                            value={formData.enxofre}
                            onChange={handleChange}
                            name={'enxofre'}
                            placeholder={'0.000'}
                          >
                              {(inputProps) => <Input {...inputProps}/>}
                          </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel whiteSpace="nowrap" width="100%">
                            Mn (%): Manganês
                        </FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'9.999'}
                                value={formData.manganes}
                                onChange={handleChange}
                                name={'manganes'}
                                placeholder={'0.000'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text"  />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel whiteSpace="nowrap" width="100%">
                            Cr (%): Cromo
                        </FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'9.999'}
                                value={formData.cromo}
                                onChange={handleChange}
                                name={'cromo'}
                                placeholder={'0.000'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text"  />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
                <Grid templateColumns='repeat(7, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'} w={'96%'} pb={'10'}>
                    <GridItem pl={2}>
                        <FormControl>
                            <FormLabel whiteSpace="nowrap" width="100%">
                                P (%): Fósforo
                            </FormLabel>
                            <InputGroup>
                                <InputMask
                                    mask={'9.99'}
                                    value={formData.fosforo}
                                    onChange={handleChange}
                                    name={'fosforo'}
                                    placeholder={'0.00'}
                                >
                                    {(inputProps) => <Input {...inputProps} type="text"  />}
                                </InputMask>
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                    <GridItem pl={2}>
                        <FormControl>
                            <FormLabel whiteSpace="nowrap" width="100%">
                                Ti (%): Titânio
                            </FormLabel>
                            <InputGroup>
                                <InputMask
                                    mask={'9.999'}
                                    value={formData.titanium}
                                    onChange={handleChange}
                                    name={'titanium'}
                                    placeholder={'0.000'}
                                >
                                    {(inputProps) => <Input {...inputProps} type="text"  />}
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