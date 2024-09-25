import React, {useRef, useState} from "react";
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
import {CalendarIcon, ChevronRightIcon, DragHandleIcon} from "@chakra-ui/icons";
import Banner from "../../../../components/banner/Banner";
import InputMask from "react-input-mask";
import {Modal} from "react-bootstrap";
import CadastroMineriosService from "../../../../App/AnalisesService/Minerios/CadastroMineriosService";

export default function CadastrarMinerio() {
    const current_date = new Date();
    const service = useRef(new CadastroMineriosService()).current;
    const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);
    const formatted_date = format(current_date, "dd/MM/yyyy");
    const [formData, setFormData] = useState(service.formData);

    const handleCadastrar = async (e) => {
        e.preventDefault();
        try {
            console.log(formData.minerio)
            const rs = await service.salvar();
            if (rs.success){
                setShowSuccessModal(true);
                setShowErrorModal(false);
                setMensagemErro('');
                service.resetFormData(setFormData);
            }else{
                setShowSuccessModal(false);
                setShowErrorModal(true);
                setMensagemErro(rs.errorMessage || 'Ocorreu um erro ao salvar.');
            }
        }catch (err){
            setShowSuccessModal(false);
            setShowErrorModal(true);
            setMensagemErro('Erro ao realizar a operação. Tente novamente mais tarde.')
        }
    }

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
                        <Banner texto_primario={'CADASTRO DE MINÉRIO'}
                                primeiro_botao={'pesquisar minérios'} url={'pesquisar-minerios'}
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
                            <Input className={'bg-dark-subtle border-black fw-bold'} fontSize={'15px'} value={formatted_date} pointerEvents={'none'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(8, 1fr)'  mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'}>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel marginTop={3}>Tipo Minério</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <DragHandleIcon color='blue'/>
                        </InputLeftElement>
                        <Input w={'100%'} name={'minerio'} value={formData.minerio} onChange={handleChange}
                               textTransform={'uppercase'} placeholder={'nome do minério'}/>
                    </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>Preço Tonelada</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'999.99'}
                                name={'valorTonelada'}
                                value={formData.valorTonelada}
                                placeholder={'R$ 000,00'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(7, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'} pb={'5'}>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>Lote</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} name={'lote'} value={formData.lote} textTransform={'uppercase'}
                                   onChange={handleChange}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>Pátio</FormLabel>
                        <InputGroup>
                            <Input w={'100%'}  className={'text-center'}
                                  name={'patio'} onChange={handleChange}
                                   textTransform={'uppercase'} value={formData.patio}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Transportador</FormLabel>
                        <InputGroup>
                            <Input w={'100%'}  className={'text-center'}
                                   name={'transportador'} onChange={handleChange}
                                   textTransform={'uppercase'} value={formData.transportador}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Frete</FormLabel>
                        <InputGroup>
                            <InputMask
                                mask={'99.99'}
                                name={'frete'}
                                value={formData.frete}
                                placeholder={'R$ 00,00'}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Input {...inputProps} />}
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

