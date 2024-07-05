import React from "react";
import {Box, Grid} from "@chakra-ui/react";
import Banner from "../../../../components/banner/Banner";




const VerCorridas = () => {

        return (
                <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
                    <Grid
                        gridTemplateColumns={'repeat(1, 1fr)'}
                        gap={{ base: "20px", xl: "20px" }}
                        display={{ base: "block", xl: "grid" }}>
                        <Banner url_voltar={'/admin/controle-corrida'} texto_primario={'Pesquise pela data para retornar todas as informações cadastradas'} />
                    </Grid>
                </Box>
        )

}

export default VerCorridas;