import {
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import logoWhite from "assets/img/logo.png";
import React from "react";

export default function SidebarDocs() {
  const bgColor = "blue";
  const borderColor = useColorModeValue("white", "navy.100");

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      bg={bgColor}
      borderRadius='30px'
      position='relative'>
      <Flex
        border='5px solid'
        borderColor={borderColor}
        bg={bgColor}
        borderRadius='50%'
        w='150px'
        h='150px'
        align='center'
        justify='center'
        mx='auto'
        position='absolute'
        left='50%'
        top='-50px'
        transform='translate(-50%, 0%)'>
        <Image src={logoWhite} w='80px' h='80px' />
      </Flex>
      <Flex
        direction='column'
        mb='12px'
        align='center'
        justify='center'
        px='15px'
        pt='55px'>
          
      
        
      </Flex>
   
    </Flex>
  );
}