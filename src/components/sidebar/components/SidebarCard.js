import {
  Box,
  Image
} from "@chakra-ui/react";
import logoWhite from "assets/img/logo.png";
import React from "react";

export default function SidebarDocs() {
  return (
           
      <Box
        display={'flex'}
        justifyContent={'center'}
      >
        <Image src={logoWhite} w='120px' h='120px'/>
      </Box>
    

  );
}