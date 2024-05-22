import React from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input, InputGroup, InputLeftElement, Select, WrapItem
} from "@chakra-ui/react";
import {format} from "date-fns";
import {CalendarIcon, ChevronRightIcon, DragHandleIcon} from "@chakra-ui/icons";
import Banner from "components/banner/Banner";

export default function AnaliseQuimicaDeMinerio() {
    const current_date = new Date();

    const formatted_date = format(current_date, "dd/MM/yyyy");


    return (
        <Box pt={{ base: "90px", md: "50px", xl: "8%" }} mx={{ base: "2%" }}>
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
                        <Banner texto_primario={'ANALISE QUIMICIA DE MINERIOS'} texto_secundario={''}/>
                        {/*<Flex*/}
                        {/*    mt='5%'*/}
                        {/*    mb='5%'*/}
                        {/*    justifyContent='space-between'*/}
                        {/*    direction={{ base: "column", md: "row" }}*/}
                        {/*    align={{ base: "center", md: "center" }}>*/}
                        {/*    <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>*/}
                        {/*        Análise química de minérios*/}
                        {/*    </Text>*/}
                        {/*    <Flex align='end'>*/}
                        {/*        <ChakraLink color={textColorBrand} fontWeight='bold' as={ReactRouterLink}*/}
                        {/*                    to={'/admin/home'} className={'btn btn-primary text-white'}>*/}
                        {/*            voltar*/}
                        {/*        </ChakraLink>*/}
                        {/*    </Flex>*/}
                        {/*</Flex>*/}
                    </Flex>
                </Flex>
            </Grid>

            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'} pt={'7'} w={'96%'}>
                <GridItem gap={'5'}>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <CalendarIcon color='blue'/>
                            </InputLeftElement>
                            <Input fontSize={'15px'} value={formatted_date} pointerEvents={'none'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>


            <Grid templateColumns='repeat(7, 1fr)'  mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'}>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel marginTop={3}>Minério</FormLabel>
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
            </Grid>
            <Grid templateColumns='repeat(9, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'}
                  w={'96%'} pb={'10'}>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Fe</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                        </InputGroup>
                            <Input type={'number'} className={'text-center'}/>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}  marginTop={3}>SiO2</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>AI2O3</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>P</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>Mn</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>P.P.C.</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3}>LOTE</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <ChevronRightIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'} marginTop={3} >%</FormLabel>
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

        </Box>
    );
}