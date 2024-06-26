import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Grid, Input, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import axios from "axios";

const ControleDeCorridas = () => {

    const inputSize = useBreakpointValue({ base: "md", md: "sm" });
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        data: today,
        cacambas: "",
        horaAbertura: "",
        horaTampa: "",
        temperatura: "",
        reducao: "",
        reservaFundida: "",
        escoriaVisual: "",
        producao: "",
        producaoAcumulada: "",
        media: "",
        cecDiaM3: "",
        cecDiaKg: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/corridas/add", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Corrida cadastrada com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar corrida:", error);
        }
    };

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'}/>
            </Grid>

            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 5 }} spacing={2} bg={'white'} className={'p-5'} boxShadow={'xs'} rounded={'md'}>
                    <FormControl>
                        <FormLabel>Data</FormLabel>
                        <Input type="date" size={inputSize} name="data" value={formData.data} readOnly={true} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Caçambas</FormLabel>
                        <Input size={inputSize} name="cacambas" value={formData.cacambas} onChange={handleChange} placeholder="número de caçambas" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Hora de Abertura</FormLabel>
                        <Input type="time" size={inputSize} name="horaAbertura" value={formData.horaAbertura} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Hora de Tampa</FormLabel>
                        <Input type="time" size={inputSize} name="horaTampa" value={formData.horaTampa} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Temperatura (°C)</FormLabel>
                        <Input size={inputSize} name="temperatura" value={formData.temperatura} onChange={handleChange} placeholder="Digite a temperatura" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Redução</FormLabel>
                        <Input size={inputSize} name="reducao" value={formData.reducao} onChange={handleChange} placeholder="Digite a redução" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Reserva Fundida</FormLabel>
                        <Input size={inputSize} name="reservaFundida" value={formData.reservaFundida} onChange={handleChange} placeholder="reserva fundida" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Escória Visual</FormLabel>
                        <Input size={inputSize} name="escoriaVisual" value={formData.escoriaVisual} onChange={handleChange} placeholder="escória visual" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Produção</FormLabel>
                        <Input size={inputSize} name="producao" value={formData.producao} onChange={handleChange} placeholder="Digite a produção" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Produção Acumulada</FormLabel>
                        <Input size={inputSize} name="producaoAcumulada" value={formData.producaoAcumulada} onChange={handleChange} placeholder="produção acumulada" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Média</FormLabel>
                        <Input size={inputSize} name="media" value={formData.media} onChange={handleChange} placeholder="Digite a média" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>C.EC. Dia (m³)</FormLabel>
                        <Input size={inputSize} name="cecDiaM3" value={formData.cecDiaM3} onChange={handleChange} placeholder="Digite o CEC Dia em metros cúbicos" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>C.EC. Dia (kg)</FormLabel>
                        <Input size={inputSize} name="cecDiaKg" value={formData.cecDiaKg} onChange={handleChange} placeholder="Digite o CEC Dia em quilos" />
                    </FormControl>

                    <Button type="submit" colorScheme="blue" size={inputSize} mt={'auto'}>
                        Cadastrar Corrida
                    </Button>
                </SimpleGrid>
            </form>
        </Box>
    );
}

export default ControleDeCorridas;
