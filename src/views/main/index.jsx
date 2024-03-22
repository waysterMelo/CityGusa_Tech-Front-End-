import React from "react";
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid
} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import {Link as ChakraLink} from "@chakra-ui/react";
import NFT from "components/card/NFT";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
export default function Home() {
    // Chakra Color Mode
    const textColor = useColorModeValue("black");
    const textColorBrand = useColorModeValue("blue");
    return (
        <Box pt={{ base: "150px", md: "50px", xl: "80px"}}
             mx={{base: "2%"}}>
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
                        <Flex
                            mt='35px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: "column", md: "row"}}
                            align={{ base: "center", md: "center"}}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Setores
                            </Text>
                            <Flex
                                align='center'>
                                <ChakraLink
                                    color={textColorBrand}
                                    fontWeight='bold'
                                    me={{ base: "34px", md: "44px" }}
                                    as={ReactRouterLink}
                                    to='/admin/leito'>
                                    Leito
                                </ChakraLink>
                                <ChakraLink
                                    color={textColorBrand}
                                    fontWeight='bold'
                                    me={{ base: "34px", md: "44px" }}
                                    to={''}>
                                    Analise de escória
                                </ChakraLink>
                                <ChakraLink color={textColorBrand} fontWeight='bold' to={''}>
                                    Análise Minérios
                                </ChakraLink>
                            </Flex>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
                            <NFT
                                name='Abstract Colors'
                                author='By Esthera Jackson'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft1}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                            <NFT
                                name='ETH AI Brain'
                                author='By Nick Wilson'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft2}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                            <NFT
                                name='Mesh Gradients '
                                author='By Will Smith'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft3}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                        </SimpleGrid>
                        <Text
                            mt='45px'
                            mb='36px'
                            color={textColor}
                            fontSize='2xl'
                            ms='24px'
                            fontWeight='700'>
                            Recently Added
                        </Text>
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            gap='20px'
                            mb={{ base: "20px", xl: "0px" }}>
                            <NFT
                                name='Swipe Circles'
                                author='By Peter Will'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft4}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                            <NFT
                                name='Colorful Heaven'
                                author='By Mark Benjamin'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft5}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                            <NFT
                                name='3D Cubes Art'
                                author='By Manny Gates'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft6}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}
