import React from "react";
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid, Link
} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import GusaImg from "assets/img/backgrounds/gusa.jpg";
import NFT from "components/card/NFT";
import Minerios from "assets/img/backgrounds/analiseDeMinerios.jpg";
import PersonIcon from "assets/img/icons/person.webp";

export default function Analises() {
    // Chakra Color Mode
    const textColor = useColorModeValue("black");
    const textColorBrand = useColorModeValue("blue");
    return (
        <Box pt={{ base: "150px", md: "50px", xl: "80px"}}
             mx={{base: "auto"}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
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
                                <Link
                                    as={ReactLink}
                                    color={textColorBrand}
                                    fontWeight='bold'
                                    me={{ base: "34px", md: "44px" }}
                                    to={'/admin/pessoal'}>
                                    Frequência pessoal
                                </Link>
                            </Flex>
                        </Flex>

                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='3%'>

                            <NFT
                                name='Análise de Gusa'
                                responsavel={'Supervisor'}
                                image={GusaImg}
                                chamar_rota={'/admin/analise-gusa'}
                                responsavelImage={PersonIcon}
                            />
                            <NFT
                                name='Análise Química de Minérios'
                                responsavel={'Supervisor'}
                                image={Minerios}
                                chamar_rota={'/admin/analise-minerio'}
                                responsavelImage={PersonIcon}
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
