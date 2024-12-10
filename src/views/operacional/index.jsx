import React, {useRef, useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Grid, HStack, Input, SimpleGrid, Stack, Text} from "@chakra-ui/react";
import Banner from "../../components/banner/Banner";
import InputMask from "react-input-mask";
import { Modal } from "react-bootstrap";
import ControleOperacionalService from "../../App/OperacionalService/ControleOperacionalService";

const ControleOperacional = () => {
     const service = useRef(new ControleOperacionalService()).current;
     const [formData, setFormData] = useState(service.formData);
     const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
     const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
     const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);


    const resetFormData = () => {
        service.resetFormData();
        setFormData(service.formData);
    }

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

    const handleChange = (e) => {
        service.handleChange(e, setFormData);
    };

    const handleClose = () => {
        service.handleClose(setShowSuccessModal, setShowErrorModal);
    };



    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'cargas-pressao-temperatura-sonda'} url_voltar={'/admin/home'} texto_primario={'CONTROLE OPERACIONAL'}
                    texto_secundario={'Abaixo confira as informações inseridas'}
                    primeiro_botao={'CARGAS | PRESSÃO | TEMPERATURA | SONDA'}
                    segundo_botao={''}
                    url_segundo_botao={'ver-analise-minerio-escoria'}
                        terceiro_botao={''}
                        url_terceiro_botao={'peso-gusa-consumo-carvao-sopradores'}
                />
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={3} mt={4}>
                    <Stack direction={['column', 'row']}>
                        <Box height="auto" bg="white" p="4" boxShadow="xs" rounded="md" flex="0.5">
                            <Text className="p-3 text-bg-dark text-center">Operacional</Text>
                            <Flex gap={3} flexWrap="nowrap" p={4}>
                                <FormControl id="a" className="form-control">
                                    <FormLabel className="fw-bold text-center">A</FormLabel>
                                    <Input type="text" bgColor="yellow.100" className={'text-center'} name={'a'} value={formData.a} onChange={handleChange}/>
                                </FormControl>
                                <FormControl id="gaiola" className="form-control">
                                    <FormLabel className="fw-bold text-center">Gaiola</FormLabel>
                                    <Input type="text" bgColor="yellow.100" className={'text-center'} name={'gaiola'} value={formData.gaiola} onChange={handleChange}/>
                                </FormControl>
                                <FormControl id="cargaSeca" className="form-control">
                                    <FormLabel className="fw-bold">Carga/Seca</FormLabel>
                                    <Input type="text" bgColor="yellow.100" className={'text-center'} name={'cargaSeca'} value={formData.cargaSeca} onChange={handleChange}/>
                                </FormControl>

                                <FormControl id="carga-hora" className="form-control">
                                    <FormLabel className="fw-bold">Carga/Hora</FormLabel>
                                    <Input type="text" bgColor="yellow.100" className={'text-center'} name={'cargaHora'} value={formData.cargaHora} onChange={handleChange}/>
                                </FormControl>

                                <FormControl id="vazao" className="form-control">
                                    <FormLabel className="fw-bold text-center">Vazão</FormLabel>
                                    <Input type="text" bgColor="yellow.100" name={'vazao'} value={formData.vazao} onChange={handleChange}/>
                                </FormControl>
                            </Flex>
                        </Box>
                        <Box height="auto" bg="white" p={4} boxShadow="xs" rounded="md" flex="0.18">
                            <Text className="p-3 text-bg-dark text-center">Pressão</Text>
                            <HStack className="p-3">
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Coroa</FormLabel>
                                    <InputMask
                                        mask={'9.99'}
                                        value={formData.pressaoCoroa}
                                        onChange={handleChange}
                                        placeholder={'0.00'}
                                        name={'pressaoCoroa'}
                                    >
                                        {(inputProps) => <Input {...inputProps} type={'text'} bgColor={'yellow.100'} />}
                                    </InputMask>
                                </FormControl>
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Topo</FormLabel>
                                    <Input bgColor={'yellow.100'} name={'pressaoTopo'} value={formData.pressaoTopo} onChange={handleChange}/>
                                </FormControl>
                            </HStack>
                        </Box>
                        <Box height="auto" p={4} bg="white" boxShadow="xs" rounded="md" flex="0.18">
                            <Text className="p-3 text-bg-dark text-center">Temperatura</Text>
                            <HStack className="p-3">
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Coroa</FormLabel>
                                    <Input bgColor={'yellow.100'} name={'temperaturaCoroa'} value={formData.temperaturaCoroa} onChange={handleChange}/>
                                </FormControl>
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Topo</FormLabel>
                                    <Input bgColor={'yellow.100'} name={'temperaturaTopo'} value={formData.temperaturaTopo} onChange={handleChange}/>
                                </FormControl>
                            </HStack>
                        </Box>
                        <Box height="auto" p={4} bg="white" boxShadow="xs" rounded="md" flex="0.12">
                            <Text className="p-3 text-bg-dark text-center fw-bold">Sonda</Text>
                            <HStack className="p-3">
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Digite</FormLabel>
                                    <Input type="text" bgColor="yellow.100" name={'sonda'} value={formData.sonda} onChange={handleChange}/>
                                </FormControl>
                            </HStack>
                        </Box>
                    </Stack>

                    <Stack direction={['column', 'row']}>
                        <Box height="auto" bg="white" p="4" boxShadow="xs" rounded="md" flex="0.1">
                            <Text className="p-3 text-bg-dark text-center">Densidade</Text>
                            <Flex gap={3} flexWrap="nowrap" p={4}>
                                <FormControl id="densidadeKg" className="form-control">
                                    <FormLabel className="fw-bold">KG/M³</FormLabel>
                                    <Input type="text" bgColor="yellow.100" name={'densidadeKg'} value={formData.densidadeKg} onChange={handleChange}/>
                                </FormControl>
                            </Flex>
                        </Box>
                        <Box height="auto" bg="white" p="4" boxShadow="xs" rounded="md" flex="0.1">
                            <Text className="p-3 text-bg-dark text-center">Umidade</Text>
                            <Flex gap={3} flexWrap="nowrap" p={4}>
                                <FormControl id="umidade" className="form-control">
                                    <FormLabel className="fw-bold text-center">%</FormLabel>
                                    <InputMask
                                        mask={''}
                                        value={formData.umidade}
                                        onChange={handleChange}
                                        placeholder={'00'}
                                        name={'umidade'}
                                    >
                                        {(inputProps) => <Input {...inputProps} bgColor={'yellow.100'} />}
                                    </InputMask>
                                </FormControl>
                            </Flex>
                        </Box>
                        <Box height="auto" bg="white" p="4" boxShadow="xs" rounded="md" flex="0.1">
                            <Text className="p-3 text-bg-dark text-center">Gusa/C</Text>
                            <Flex gap={3} flexWrap="nowrap" p={4}>
                                <FormControl id="gusaKg" className="form-control">
                                    <FormLabel className="fw-bold text-center">Kg</FormLabel>
                                    <Input type="text" bgColor="yellow.100" name={'gusaKg'} value={formData.gusaKg} onChange={handleChange}/>
                                </FormControl>
                            </Flex>
                        </Box>
                        <Box height="auto" bg="white" p="4" boxShadow="xs" rounded="md" flex="0.2">
                            <Text className="p-3 text-bg-dark text-center">Peso Carvão</Text>
                            <Flex gap={3} flexWrap="nowrap" p={4}>
                                <FormControl id="gusaKg" className="form-control">
                                    <FormLabel className="fw-bold text-center">Acumulado Kilos</FormLabel>
                                    <Input className={'text-center'} type="text" bgColor="yellow.100" name={'acumuladoKilos'} value={formData.acumuladoKilos} onChange={handleChange}/>
                                </FormControl>
                            </Flex>
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
                    Informações cadastradas com sucesso !
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

export default ControleOperacional;
