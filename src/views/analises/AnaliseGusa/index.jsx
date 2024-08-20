import React, {useRef, useState} from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input, InputGroup, InputLeftElement,WrapItem
} from "@chakra-ui/react";
import {format} from "date-fns";
import {CalendarIcon, ChevronRightIcon, DragHandleIcon} from "@chakra-ui/icons";
import Banner from "../../../components/banner/Banner";
import {Modal} from "react-bootstrap";
import AnaliseGusaService from "../../../App/AnalisesService/AnaliseGusaService";

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
            //resetFormData();
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
                    <Banner texto_primario={'CONTROLE ANÁLISE GUSA'} texto_secundario={'ADICIONAR ANÁLISE'} url_voltar={'/admin/analises'}/>
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
                      <Input name={'gusa'} value={"GUSA"} pointerEvents={'none'} onChange={handleChange}/>
                    </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(9, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'} w={'96%'} pb={'10'}>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel>Fe</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input type={'number'} name={'ferro'} className={'text-center'} value={formData.ferro} onChange={handleChange}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel>SiO2</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input name={'silicio'} className={'text-center'} value={formData.silicio} onChange={handleChange}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={2}>
                    <FormControl>
                        <FormLabel>AI2O3</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input type={'number'} name={'aluminio'} className={'text-center'} value={formData.aluminio} onChange={handleChange}/>
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