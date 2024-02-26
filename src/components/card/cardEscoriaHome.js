// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";

export default function Default(props) {
  const { startContent, endContent, name, imageSrc, img} = props;
  const textColorSecondary = "secondaryGray.600";

  return (
    <Card py='30px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={textColorSecondary}
            fontSize={{  base: "12"}}
            >
            {name}
          </StatLabel>
          
          <StatNumber>
            <img src={imageSrc} alt="Imagem" style={{ maxWidth: "100%", borderRadius: "50%" }} />
            {img}
          </StatNumber>
  
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
