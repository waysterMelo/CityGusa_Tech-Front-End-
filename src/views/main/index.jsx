// Home.js
import React from "react";
import {Box, Flex, Grid, Link, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import Corrida from "assets/img/Corrida.jpg";
import NFT from "components/card/NFT";
import Person from "assets/img/icons/person.webp"
import Leito from "assets/img/backgrounds/leito.png";

export default function Home() {
    // Chakra Color Mode
    const textColor = useColorModeValue("black");
    const textColorBrand = useColorModeValue("blue");
    return (
        <Box
            pt={{ base: "150px", md: "50px", xl: "5%" }}
            mx={{ base: "auto" }}
        >
            {/* Main Fields */}
            <Grid
                mb="20px"
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(1, 1fr)" }}
                gap={{ base: "20px", xl: "10px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    w="auto"
                    gridArea={{ xl: "lg", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <Flex direction="column">
                        <Flex
                            className="p-2"
                            mt="35px"
                            mb="20px"
                            justifyContent="space-between"
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "center", md: "center" }}
                        >
                            <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                                Página inicial
                            </Text>
                            <Flex align="end">
                                <Link
                                    as={ReactLink}
                                    color={textColorBrand}
                                    fontWeight="bold"
                                    me={{ base: "34px", md: "44px" }}
                                    to="/admin/pessoal"
                                >
                                    Frequência pessoal
                                </Link>
                            </Flex>
                        </Flex>

                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="3%">
                            <NFT
                                name="Controle de Corridas"
                                responsavel="Supervisor"
                                image={Corrida}
                                chamar_rota="/admin/controle-corrida"
                                responsavelImage={Person}
                            />
                            <NFT
                                name="Leito de Fusão"
                                responsavel="Supervisor"
                                image={Leito}
                                chamar_rota="/admin/leito"
                                responsavelImage={Person}
                            />
                        </SimpleGrid>
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            gap="20px"
                            mb={{ base: "20px", xl: "0px" }}
                        />
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    );
}
