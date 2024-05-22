import React from "react";
import { Flex, Text} from "@chakra-ui/react";
import banner from "assets/img/1.jpg";
import {Link as ChakraLink} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";

export default function Banner(props) {

    const {texto_primario, texto_secundario, primeiro_botao} = props;


  return (
    <Flex
        bgImage={banner}
        bgSize={'cover'}
      direction='column'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      mt={{md: "2%"}} mb={{md: "2%"}}
      borderRadius='30px'>
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
        lineHeight={{ base: "32px", md: "42px"}}>
          {texto_primario}
      </Text>
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
      <Flex align='center'>
        <ChakraLink className={'btn badge'}
          bg='white'
          color='black'
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
          fontWeight='500'
          fontSize='14px'
          py='20px'
          px='20px'
          me='38px'
          href="mailto:seuemail@example.com">
            {primeiro_botao}
        </ChakraLink>
          <ChakraLink
              bg='transparent'
              color='white'
              _hover={{ bg: "whiteAlpha.900", color: "black"}}
              _active={{ bg: "white" }}
              _focus={{ bg: "white" }}
              rounded={'30rem'}
              fontWeight='500'
              fontSize='14px'
              py='2%'
              px='27'
              me='38px' as={ReactRouterLink} to={'/admin/home'} >
              voltar
          </ChakraLink>
      </Flex>
    </Flex>
  );
}

