import React from "react";
import {Box, Flex, Grid, GridItem, Text, useColorModeValue,} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function CadastroLeitoDeFusao() {
    const textColor = useColorModeValue("black");
    const textColorBrand = useColorModeValue("blue");
    return (
        <Box pt={{ base: "150px", md: "50px", xl: "80px" }} mx={{ base: "2%" }} width="100%">
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

            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={2} h='10' bg='tomato' />
                <GridItem colStart={4} colEnd={6} h='10' bg='papayawhip' />
            </Grid>

        </Box>
    );
}