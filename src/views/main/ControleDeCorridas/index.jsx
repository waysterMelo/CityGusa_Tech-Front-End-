import React from "react";
import {Box, Button, FormControl, FormLabel, Grid, Input, SimpleGrid, useBreakpointValue} from "@chakra-ui/react";
import Banner from "components/banner/Banner";

export default function ControleDeCorridas() {
    const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            {/* Main Fields */}
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'}/>
            </Grid>

            <SimpleGrid columns={{ base: 1, md: 5 }} spacing={2} bg={'white'} className={'p-5'} boxShadow={'xs'} rounded={'md'}>

                <FormControl>
                    <FormLabel>Caçambas</FormLabel>
                    <Input size={inputSize} placeholder="número de caçambas" />
                </FormControl>

                <FormControl>
                    <FormLabel>Hora de Abertura</FormLabel>
                    <Input type="time" size={inputSize} />
                </FormControl>

                <FormControl>
                    <FormLabel>Hora de Tampa</FormLabel>
                    <Input type="time" size={inputSize} />
                </FormControl>

                <FormControl>
                    <FormLabel>Temperatura (°C)</FormLabel>
                    <Input size={inputSize} placeholder="Digite a temperatura" />
                </FormControl>

                <FormControl>
                    <FormLabel>Redução</FormLabel>
                    <Input size={inputSize} placeholder="Digite a redução" />
                </FormControl>

                <FormControl>
                    <FormLabel>Reserva Fundida</FormLabel>
                    <Input size={inputSize} placeholder="reserva fundida" />
                </FormControl>

                <FormControl>
                    <FormLabel>Escória Visual</FormLabel>
                    <Input size={inputSize} placeholder="escória visual" />
                </FormControl>

                <FormControl>
                    <FormLabel>Produção</FormLabel>
                    <Input size={inputSize} placeholder="Digite a produção" />
                </FormControl>

                <FormControl>
                    <FormLabel>Produção Acumulada</FormLabel>
                    <Input size={inputSize} placeholder="produção acumulada" />
                </FormControl>

                <FormControl>
                    <FormLabel>Média</FormLabel>
                    <Input size={inputSize} placeholder="Digite a média" />
                </FormControl>

                <FormControl>
                    <FormLabel>C.EC. Dia (m³)</FormLabel>
                    <Input size={inputSize} placeholder="Digite o CEC Dia em metros cúbicos" />
                </FormControl>

                <FormControl>
                    <FormLabel>C.EC. Dia (kg)</FormLabel>
                    <Input size={inputSize} placeholder="Digite o CEC Dia em quilos" />
                </FormControl>

                <Button colorScheme="blue" size={inputSize} mt={'auto'}>
                    Cadastrar Corrida
                </Button>
            </SimpleGrid>
        </Box>
    );
}