import React from "react";
import { Text } from '@chakra-ui/react'

// Chakra imports
import { Flex} from "@chakra-ui/react";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
        <Text fontSize='3xl' as={'b'} my={'5'}  bgGradient='linear(to-l, #001FDF, #0900FF)'
        fontWeight='extrabold'
        bgClip='text'>
          CityGusa Tech</Text>
    </Flex>
  );
}
export default SidebarBrand;
