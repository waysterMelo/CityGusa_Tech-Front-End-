import React, {useEffect, useState} from "react";
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
import {CalendarIcon, TimeIcon, DragHandleIcon} from "@chakra-ui/icons";
import Banner from "../../../components/banner/Banner";

export default function AnaliseEscoria() {
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
                        <Banner texto_primario={'CONTROLE ANÁLISE DE ESCÓRIA'} texto_secundario={'ADICIONAR ANÁLISE'}/>
                    </Flex>
                </Flex>
            </Grid>

            <Grid templateColumns='repeat(6, 1fr)' mx={'auto'} bg={'whiteAlpha.800'} px={'5'} pt={'7'} w={'96%'}>
                <GridItem>
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

                <FormControl>
                    <FormLabel>Horas</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <TimeIcon color='blue'/>
                        </InputLeftElement>
                        <Input  className={'bg-dark-subtle border-black fw-bold'} w={'70%'} value={currentHour}/>
                    </InputGroup>
                </FormControl>
            </Grid>

            <Grid templateColumns='repeat(9, 1fr)' mx={'auto'} gab={2} bg={'whiteAlpha.800'} px={'5'} w={'96%'} p={'10'}>
                <GridItem>
                    <FormControl>
                        <FormLabel className={'text-center'}>CaO</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input type={'text'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>SiO2</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>AI2O3</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>MgO</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>FeO</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>MnO</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>Kg/t</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
                            </InputLeftElement>
                            <Input w={'100%'} type={'number'} className={'text-center'}/>
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem pl={1}>
                    <FormControl>
                        <FormLabel className={'text-center'}>I B</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <DragHandleIcon color='blue'/>
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