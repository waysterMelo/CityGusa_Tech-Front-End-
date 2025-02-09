import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import banner from "assets/img/1.jpg";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Banner(props) {
    const {
        texto_primario,
        texto_secundario,

        primeiro_botao,
        primeiro_botao_texto_secundario,
        url,

        segundo_botao,
        segundo_botao_texto_secundario,
        url_segundo_botao,

        terceiro_botao,
        terceiro_botao_texto_secundario,
        url_terceiro_botao,

        url_voltar,
        children
    } = props;

    return (
        <Flex
            bgImage={banner}
            bgSize={'cover'}
            direction='column'
            py={{ base: "30px", md: "56px" }}
            px={{ base: "30px", md: "64px" }}
            mt={{ md: "2%" }}
            mb={{ md: "2%" }}
            borderRadius='30px'>

            {/* Renderiza texto primário se existir */}
            {texto_primario && (
                <Text
                    fontSize={{ base: "24px", md: "34px" }}
                    color='white'
                    mb='14px'
                    maxW={{
                        base: "100%",
                        md: "64%",
                        lg: "46%",
                        xl: "70%",
                        "2xl": "50%",
                        "3xl": "42%",
                    }}
                    fontWeight='700'
                    lineHeight={{ base: "32px", md: "42px" }}>
                    {texto_primario}
                </Text>
            )}

            {/* Renderiza texto secundário se existir */}
            {texto_secundario && (
                <Text
                    fontSize='md'
                    color='#E3DAFF'
                    maxW={{
                        base: "100%",
                        md: "64%",
                        lg: "40%",
                        xl: "56%",
                        "2xl": "46%",
                        "3xl": "34%",
                    }}
                    fontWeight='500'
                    mb='40px'
                    lineHeight='28px'>
                    {texto_secundario}
                </Text>
            )}

            <Flex align='center'>
                {/* Renderiza o primeiro botão se existir */}
                {primeiro_botao && url && (
                    <ChakraLink
                        className={'btn badge'}
                        height={'100%'}
                        bg='yellow.300'
                        color='black'
                        _hover={{ bg: "yellow.300" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        py='20px'
                        me='1%'
                        as={ReactRouterLink}
                        to={url}>
                        <Text fontSize={'md'}>
                            {primeiro_botao}
                        </Text>
                        <Text className={'font-monospace mt-3'}>
                            {primeiro_botao_texto_secundario}
                        </Text>
                    </ChakraLink>
                )}

                {/* Renderiza o segundo botão se existir */}
                {segundo_botao && url_segundo_botao && (
                    <ChakraLink
                        className={'btn badge'}
                        height={'100%'}
                        bg='yellow.300'
                        color='black'
                        _hover={{ bg: "yellow.300" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        py='20px'
                        me='1%'
                        as={ReactRouterLink}
                        to={url_segundo_botao}>
                        <Text fontSize={'md'}>
                            {segundo_botao}
                        </Text>
                        <Text className={'font-monospace mt-3'}>
                            {segundo_botao_texto_secundario}
                        </Text>
                    </ChakraLink>
                )}

                {/* Renderiza o terceiro botão se existir */}
                {terceiro_botao && url_terceiro_botao && (
                    <ChakraLink
                        className={'btn badge'}
                        height={'100%'}
                        bg={'yellow.300'}
                        color='black'
                        _hover={{ bg: "yellow.300" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        py='20px'
                        me='1%'
                        as={ReactRouterLink}
                        to={url_terceiro_botao}>
                        <Text fontSize={'md'}>
                            {terceiro_botao}
                        </Text>
                        <Text className={'font-monospace mt-3'}>
                            {terceiro_botao_texto_secundario}
                        </Text>
                    </ChakraLink>
                )}
            </Flex>
            {children}
            {/* Renderiza o botão de voltar se existir */}
            {url_voltar && (
                <Flex justify={'flex-end'}>
                    <ChakraLink
                        className={'btn badge'}
                        height={'100%'}
                        bg='yellow.300'
                        color='black'
                        _hover={{ bg: "yellow.300" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        py='1%'
                        me='1%'
                        mt={'1%'}
                        as={ReactRouterLink}
                        to={url_voltar}>
                        <Text fontSize={'md'}>
                            voltar
                        </Text>
                    </ChakraLink>
                </Flex>
            )}

        </Flex>

    );
}
