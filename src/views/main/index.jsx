import React from "react";
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid, Avatar
} from "@chakra-ui/react";
import {Link as ChakraLink} from "@chakra-ui/react";
import NFT from "components/card/NFT";
import Leito from "assets/img/backgrounds/leito.png";
import Minerios_img from "assets/img/backgrounds/analiseDeMinerios.jpg";
export default function Home() {
    // Chakra Color Mode
    const textColor = useColorModeValue("black");
    const textColorBrand = useColorModeValue("blue");
    return (
        <Box pt={{ base: "150px", md: "50px", xl: "80px"}}
             mx={{base: "auto"}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
                gap={{ base: "20px", xl: "10px" }}
                display={{ base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    w={'auto'}
                    gridArea={{ xl: "lg", "2xl": "1 / 1 / 2 / 2"}}>
                    <Flex direction='column'>
                        <Flex className={'p-2'}
                            mt='35px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: "column", md: "row"}}
                            align={{ base: "center", md: "center"}}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Página inicial
                            </Text>
                            <Flex
                                align='end'>
                                <ChakraLink
                                    color={textColorBrand}
                                    fontWeight='bold'
                                    me={{ base: "34px", md: "44px" }}
                                    to={''}>
                                    Frequência pessoal
                                </ChakraLink>
                                <ChakraLink color={textColorBrand} fontWeight='bold' to={''}>
                                    Análise escória
                                </ChakraLink>
                            </Flex>
                        </Flex>


                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='2%'>
                            <NFT
                                name='Alterar leito de fusão'
                                titulo='Responsável'
                                bidders={[
                                  Avatar
                                ]}
                                responsavel={'Supervisor'}
                                image={Leito}
                            />

                            <NFT
                                name='Análise química de Minérios'
                                titulo='Responsável'
                                bidders={[
                                    Avatar
                                ]}
                                responsavel={'Jose Ronaldo'}
                                image={Minerios_img}
                            />



                        </SimpleGrid>



                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            gap='20px'
                            mb={{ base: "20px", xl: "0px" }}>

                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}
