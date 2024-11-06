import React from "react";
import {
    Box, Flex, FormControl, FormLabel,
    Grid, HStack, Input, SimpleGrid, Stack, Text
} from "@chakra-ui/react";
import Banner from "../../components/banner/Banner";

const ControleOperacional = () => {
    // const service = useRef(new ControleOperacional()).current;
    // const [formData, setFormData] = useState(service.formData);
    // const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    // const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    // const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);


    // const resetFormData = () => {
    //     service.resetFormService();
    //     setFormData(service.formData);
    // }
    //
    // const handleChange = (e) => {
    //     service.handleChange(e, setFormData);
    // };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await service.salvar();
    //     setShowSuccessModal(service.showSuccessModal);
    //     setShowErrorModal(service.showErrorModal);
    //     setMensagemErro(service.mensagemErro);
    //     if (result.success) {
    //         setShowSuccessModal(true);
    //         resetFormData();
    //     } else {
    //         setShowErrorModal(true);
    //     }
    // };
    //
    // const handleClose = () => {
    //     service.handleClose(setShowSuccessModal, setShowErrorModal);
    // };


    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'vazamento-cargas-fundidas'} url_voltar={'/admin/home'} texto_primario={'CONTROLE OPERACIONAL'}
                    texto_secundario={''}
                    primeiro_botao={''}
                    segundo_botao={''}
                    url_segundo_botao={'ver-analise-minerio-escoria'}
                        terceiro_botao={''}
                        url_terceiro_botao={'peso-gusa-consumo-carvao-sopradores'}
                />
            </Grid>

            <form onSubmit={''}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={3} mt={4}>
                    <Stack direction={['column', 'row']}>
                        <Box height="auto" bg="white" p="4" boxShadow="xs" rounded="md" flex="0.5">
                            <Text className="p-3 text-bg-dark text-center">Operacional</Text>
                            <Flex gap={3} flexWrap="nowrap" p={4}>
                                <FormControl id="gaiola" className="form-control">
                                    <FormLabel className="fw-bold">Gaiola</FormLabel>
                                    <Input type="text" bgColor="yellow.100" />
                                </FormControl>

                                <FormControl id="carga-hora" className="form-control">
                                    <FormLabel className="fw-bold">Carga Hora</FormLabel>
                                    <Input type="text" bgColor="yellow.100"  />
                                </FormControl>

                                <FormControl id="rt" className="form-control">
                                    <FormLabel className="fw-bold">RT</FormLabel>
                                    <Input type="text" bgColor="yellow.100" className="bg-dark-subtle"/>
                                </FormControl>

                                <FormControl id="vazao" className="form-control">
                                    <FormLabel className="fw-bold">Vazão</FormLabel>
                                    <Input type="text" bgColor="yellow.100"/>
                                </FormControl>
                            </Flex>
                        </Box>
                        <Box height="auto" bg="white" p={4} boxShadow="xs" rounded="md" flex="0.2">
                            <Text className="p-3 text-bg-dark text-center">Pressão</Text>
                            <HStack className="p-3">
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Coroa</FormLabel>
                                    <Input bgColor={'yellow.100'}/>
                                </FormControl>
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Topo</FormLabel>
                                    <Input bgColor={'yellow.100'}/>
                                </FormControl>
                            </HStack>
                        </Box>
                        <Box height="auto" p={4} bg="white" boxShadow="xs" rounded="md" flex="0.21">
                            <Text className="p-3 text-bg-dark text-center">Temperatura</Text>
                            <HStack className="p-3">
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Coroa</FormLabel>
                                    <Input bgColor={'yellow.100'}/>
                                </FormControl>
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Topo</FormLabel>
                                    <Input bgColor={'yellow.100'}/>
                                </FormControl>
                            </HStack>
                        </Box>
                        <Box height="auto" p={4} bg="white" boxShadow="xs" rounded="md" flex="0.12">
                            <Text className="p-3 text-bg-dark text-center fw-bold">Sonda</Text>
                            <HStack className="p-3">
                                <FormControl className="form-control">
                                    <FormLabel className={'fw-bold'}>Digite</FormLabel>
                                    <Input bgColor={'yellow.100'}/>
                                </FormControl>
                            </HStack>
                        </Box>
                    </Stack>
                </SimpleGrid>
            </form>


            {/*<Modal show={showSuccessModal} onHide={''}>*/}
            {/*    <Modal.Header className={'bg-success text-white'} closeButton>*/}
            {/*        <Modal.Title>Sucesso</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        Corrida cadastrada com sucesso!*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button className={'bg-primary text-white'} onClick={''}>*/}
            {/*            Fechar*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}

            {/*<Modal show={showErrorModal} onHide={''}>*/}
            {/*    <Modal.Header className={'bg-danger'} closeButton>*/}
            {/*        <Modal.Title>Erro</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        /!*{mensagemErro}*!/*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button className={'bg-dark text-white'} onClick={''}>*/}
            {/*            Fechar*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </Box>
    );
}

export default ControleOperacional;
