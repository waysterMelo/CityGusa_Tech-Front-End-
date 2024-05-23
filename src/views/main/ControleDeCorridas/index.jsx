import React from "react";
import {Box, Grid, SimpleGrid} from "@chakra-ui/react";
import Banner from "components/banner/Banner";

export default function ControleDeCorridas() {

    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} mx={{ base: "1%" }}>
            {/* Main Fields */}
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner texto_primario={'CONTROLE DE CORRIDAS DO FORNO'} texto_secundario={'CADASTRAR CORRIDA'} primeiro_botao={'ver corridas'}/>
            </Grid>

            <SimpleGrid columns={1} >

            </SimpleGrid>
        </Box>
    );
}