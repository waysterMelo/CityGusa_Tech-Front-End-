import React, {useEffect, useRef, useState} from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input, InputGroup, InputLeftElement, WrapItem
} from "@chakra-ui/react";
import {format} from "date-fns";
import {CalendarIcon, TimeIcon} from "@chakra-ui/icons";
import Banner from "../../../components/banner/Banner";
import CadastrarAnaliseEscoriaService from "../../../App/AnalisesService/Minerios/CadastrarAnaliseEscoriaService";
import {Modal} from "react-bootstrap";
import InputMask from "react-input-mask";

export default function AnaliseEscoria() {
    const current_date = new Date();
    const formatted_date = format(current_date, "dd/MM/yyyy");
    const [currentHour, setCurrentHours] = useState('');
    const service = useRef(new CadastrarAnaliseEscoriaService()).current;
    const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);
    const [formData, setFormData] = useState(service.formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await service.salvar(formData);
        setShowSuccessModal(service.showSuccessModal);
        setShowErrorModal(service.showErrorModal);
        setMensagemErro(service.mensagemErro);
        if (result.success) {
          setShowSuccessModal(true);
          service.resetFormData(setFormData);
        }else{
            setShowErrorModal(true);
        }
    }

    const handleChange = (e) => {
            service.handleChange(e, setFormData);
    };

    const handleClose = (e) => {
        service.handleClose(setShowSuccessModal, setShowErrorModal);
    }

    useEffect(() => {
        const getCurrentHour = () => {
            const now = new Date();
            const formatted_hours = format(now, 'HH:mm');
            setCurrentHours(formatted_hours);
        };
        // Atualiza a hora atual a cada segundo
        const intervalId = setInterval(getCurrentHour, 1000);

        // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
        return () => clearInterval(intervalId);

    }, []);
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
                        <Banner texto_primario={'ANÁLISE DE ESCÓRIA'} segundo_botao={'ver análises por data'} url_segundo_botao={'ver-analises-escoria'}/>
                    </Flex>
                </Flex>
            </Grid>

            <form onSubmit={handleSubmit}>
            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'} pt={'7'} w={'96%'}>
                <GridItem>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <CalendarIcon color='blue'/>
                            </InputLeftElement>
                            <Input className={'bg-dark-subtle border-black fw-bold'} fontSize={'15px'}
                                   value={formatted_date} pointerEvents={'none'} onChange={handleChange}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>

                <FormControl>
                    <FormLabel>Horas</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <TimeIcon color='blue'/>
                        </InputLeftElement>
                        <Input  className={'bg-dark-subtle border-black fw-bold'}
                                w={'70%'} value={currentHour} onChange={handleChange} />
                    </InputGroup>
                </FormControl>
            </Grid>

            <Grid templateColumns='repeat(9, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'} w={'96%'} p={'10'}>
                <GridItem>
                    <FormControl>
                        <FormLabel className={'text-center'}>Cálcio</FormLabel>
                        <InputGroup className={'text-center'}>
                            <InputMask
                                mask={'99.99'}
                                value={formData.calcio}
                                onChange={handleChange}
                                name={'calcio'}
                                placeholder={'00.00'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text" />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>Silício</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'99.99'}
                                value={formData.silicio}
                                onChange={handleChange}
                                name={'silicio'}
                                placeholder={' 00.00'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text"  />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>Alumínio</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'99.99'}
                                value={formData.aluminio}
                                onChange={handleChange}
                                name={'aluminio'}
                                placeholder={' 00.00'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text"  />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>Magnésio</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'9.99'}
                                value={formData.magnesio}
                                onChange={handleChange}
                                name={'magnesio'}
                                placeholder={'0.00'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text"  />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>Ferro</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'9.99'}
                                value={formData.ferro}
                                onChange={handleChange}
                                name={'ferro'}
                                placeholder={' 0.00'}
                            >
                                {(inputProps) => <Input {...inputProps} type="text"  />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>Manganês</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'9.99'}
                                value={formData.manganes}
                                onChange={handleChange}
                                name={'manganes'}
                                placeholder={' 0.00'}
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