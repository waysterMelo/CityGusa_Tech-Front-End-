import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    WrapItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from "@chakra-ui/react";
import { CalendarIcon, ChevronRightIcon, DragHandleIcon, PlusSquareIcon } from "@chakra-ui/icons";
import Banner from "../../../components/banner/Banner";
import CargasLeitoFusaoService from "../../../App/service/CargasLeitoFusaoService";

export default function CadastroLeitoDeFusao() {
    const service = useRef(new CargasLeitoFusaoService()).current;
    const [formData, setFormData] = useState(service.state.formData);
    const [showSuccessModal, setShowSuccessModal] = useState(service.state.showSuccessModal);
    const [showErrorModal, setShowErrorModal] = useState(service.state.showErrorModal);
    const [mensagemErro, setMensagemErro] = useState(service.state.mensagemErro);

    const handleChange = (e) => {
        service.handleChange(e);
        setFormData({ ...service.state.formData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await service.salvar();
        setFormData({ ...service.state.formData });
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
        setMensagemErro(service.state.mensagemErro);
        if (result.success) {
            setShowSuccessModal(true);
        } else {
            setShowErrorModal(true);
        }
    };

    const handleClose = () => {
        service.handleClose();
        setShowSuccessModal(service.state.showSuccessModal);
        setShowErrorModal(service.state.showErrorModal);
    };


    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={{ xl: "repeat(1, 1fr)", "2xl": "1fr 1" }}
                gap={{ base: "20px", xl: "10px" }}
                display={{ base: "block", xl: "grid" }}>
                <Flex
                    flexDirection="column"
                    width={"100%"}
                    gridArea={{ md: "2x1" }}>
                    <Flex direction="column">
                        <Banner texto_primario={"CONTROLE DE LEITO DE FUSÃO"} texto_secundario={"ADICIONAR LEITO"} />
                    </Flex>
                </Flex>
            </Grid>


            <form onSubmit={handleSubmit}>

            <Grid templateColumns="repeat(6, 1fr)" mx={"auto"} bg={"whiteAlpha.800"} px={"5"} pt={"7"} w={"96%"}>

                <FormControl>
                        <FormLabel>Data</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <CalendarIcon color="blue"/>
                            </InputLeftElement>
                            <Input fontSize={"15px"} value={formData.data_atual} pointerEvents={"none"} readOnly />
                        </InputGroup>
                    </FormControl>

                <FormControl>
                    <FormLabel>Horas</FormLabel>
                    <InputGroup>
                        <Input w={"70%"} type={"time"} name="horas" value={formData.horas} onChange={handleChange} />
                    </InputGroup>
                </FormControl>
            </Grid>

            <Grid templateColumns="repeat(6, 1fr)" gap={3} mx={"auto"} bg={"whiteAlpha.800"} pl={"5"} pt={"4"} w={"96%"}>
                <GridItem>
                    <FormControl>
                        <FormLabel>Numero da carga</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <PlusSquareIcon color="blue" />
                            </InputLeftElement>
                            <Input w={"100%"} fontSize={"15px"} placeholder={"carga"} name="numeroDaCarga" value={formData.numeroDaCarga} onChange={handleChange}/>
                        </InputGroup>
                    </FormControl>

                </GridItem>

                <FormControl>
                    <FormLabel className={"text-center"}>Porcentagem</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input w={"100%"} placeholder={"%"} name="porcentagem" value={formData.porcentagem} onChange={handleChange} />
                    </InputGroup>
                </FormControl>
            </Grid>

            <Grid templateColumns="repeat(7, 1fr)" mx={"auto"} bg={"whiteAlpha.800"} px={"5"} pt={4} w={"96%"}>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Minérios</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <DragHandleIcon color="blue" />
                            </InputLeftElement>
                            <Select className={"text-center"} name="minerio" value={formData.minerio} onChange={handleChange}>
                                <option value="Extrativa">Extrativa</option>
                                <option value="Comisa">Comisa</option>
                                <option value="Bassari">Bassari</option>
                                <option value="Bassari">Ciclo Metal</option>
                                <option value="Bassari">JLM</option>
                            </Select>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel>Quantidade</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <ChevronRightIcon color="blue" />
                            </InputLeftElement>
                            <Input w={"100%"} type={"number"} name="quantidade" value={formData.quantidade} onChange={handleChange} />
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" gap={3} mx={"auto"} bg={"whiteAlpha.800"} pl={"5"} py={4} w={"96%"}>
                <FormControl>
                    <FormLabel>Calcáreo</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input placeholder={"..."} name="calcareo" value={formData.calcareo} onChange={handleChange} />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Bauxita</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input placeholder={"..."} name="bauxita" value={formData.bauxita} onChange={handleChange} />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Coque</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input placeholder={"..."} name="coque" value={formData.coque} onChange={handleChange} />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Secas</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input placeholder={"..."} name="secas" value={formData.secas} onChange={handleChange} />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Sucata Gusa</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input placeholder={"..."} name="sucataGusa" value={formData.sucataGusa} onChange={handleChange} />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Sucata Aço</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color="blue" />
                        </InputLeftElement>
                        <Input placeholder={"..."} name="sucataAco" value={formData.sucataAco} onChange={handleChange} />
                    </InputGroup>
                </FormControl>

                <Flex align={"end"} marginLeft={"10%"}>
                    <WrapItem>
                        <Button type={"submit"} colorScheme="whatsapp">Registrar</Button>
                    </WrapItem>
                </Flex>
            </Grid>

            </form>
            <Modal isOpen={showSuccessModal} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className={"bg-success text-white"}>Sucesso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Registro cadastrado com sucesso!
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={showErrorModal} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className={"bg-danger"}>Erro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {mensagemErro}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Grid templateColumns="repeat(1, 1fr)" bg={"lightsteelblue"} boxShadow={"dark-lg"} p={"2"} mx={"auto"} rounded={"md"} my={"2"}>
                <TableContainer>
                    <Table size="sm" variant={"striped"}>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Carga</Th>
                                <Th>Quantidade</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Extrativa</Td>
                                <Td>02</Td>
                                <Td>250.40</Td>
                            </Tr>
                            <Tr>
                                <Td>Extrativa</Td>
                                <Td>02</Td>
                                <Td>250.40</Td>
                            </Tr>
                            <Tr>
                                <Td>Extrativa</Td>
                                <Td>02</Td>
                                <Td>250.40</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Grid>
        </Box>
    );
}