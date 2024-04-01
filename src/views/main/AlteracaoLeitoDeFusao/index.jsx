import React, {useEffect, useState} from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input, InputGroup, InputLeftElement, Select, Table, TableContainer, Tbody, Td,
    Text, Th, Thead, Tr,
    useColorModeValue, WrapItem
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {format} from "date-fns";
import {CalendarIcon, ChevronRightIcon, DragHandleIcon, PlusSquareIcon} from "@chakra-ui/icons";

export default function CadastroLeitoDeFusao() {
    const current_date = new Date();

    const formatted_date = format(current_date, "dd/MM/yyyy");

    const [currentHour, setCurrentHours] = useState('');

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


    const textColor = useColorModeValue("black");
    const textColorBrand = useColorModeValue("blue");

    return (
        <Box pt={{ base: "150px", md: "50px", xl: "80px" }} mx={{ base: "2%" }}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={{ xl: "repeat(1, 1fr)", "2xl": "1fr 1" }}
                gap={{ base: "20px", xl: "10px" }}
                display={{ base: "block", xl: "grid" }}>
                <Flex
                    flexDirection='column'
                    width={'100%'}
                    gridArea={{md: "2x1"}}>
                    <Flex direction='column'>
                        <Flex
                            mt='35px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "center", md: "center" }}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Alteração leito de fusão
                            </Text>
                            <Flex align='end'>
                                <ChakraLink color={textColorBrand} fontWeight='bold' as={ReactRouterLink}
                                            to={'/admin/home'} className={'btn btn-primary text-white'}>
                                    voltar
                                </ChakraLink>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Grid>

            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'} pt={'7'} w={'96%'}>
                <GridItem>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CalendarIcon color='blue'/>
                            </InputLeftElement>
                            <Input value={formatted_date} pointerEvents={'none'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>

                <FormControl>
                    <FormLabel>Horas</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <ChevronRightIcon color='blue'/>
                        </InputLeftElement>
                        <Input w={'70%'} value={currentHour}/>
                    </InputGroup>
                </FormControl>
            </Grid>
            <Grid templateColumns='repeat(7, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'}  w={'96%'}>
                <GridItem colSpan={1} mt={2} mb={5}>
                    <FormControl>
                        <FormLabel>Carga</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <PlusSquareIcon color='blue'/>
                            </InputLeftElement>
                            <Input  w={'70%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(7, 1fr)'  mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}  w={'96%'} pb={'10'}>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Minério</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <DragHandleIcon color='blue'/>
                        </InputLeftElement>
                        <Select className={'text-center'}>
                            <option value="opcao1">Extrativa</option>
                            <option value="opcao2">Comisa</option>
                            <option value="opcao3">Bassari</option>
                        </Select>
                    </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel>Quantidade</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <Flex align={'end'} marginLeft={'10%'}>
                    <WrapItem>
                        <Button colorScheme='whatsapp'>registrar</Button>
                    </WrapItem>
                </Flex>
            </Grid>



            <Grid templateColumns='repeat(1, 1fr)' bg={'lightsteelblue'} boxShadow={'dark-lg'} p={'2'} mx={'auto'}
                  rounded={'md'} my={'2'} >
                <TableContainer>
                    <Table size='sm' variant={'striped'}>
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

            <Grid templateColumns='repeat(1, 1fr)' bg={'lightsteelblue'} boxShadow={'dark-lg'} p={'2'} mx={'auto'}
                  rounded={'md'} mb={'2'} >
                <TableContainer>
                    <Table size='sm' variant={'striped'}>
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
            <Grid templateColumns='repeat(1, 1fr)' bg={'lightsteelblue'} boxShadow={'dark-lg'} p={'2'} mx={'auto'}
                  rounded={'md'} >
                <TableContainer>
                    <Table size='sm' variant={'striped'}>
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