import React from "react";
import { Flex } from "@chakra-ui/react";

export default function IconBox(props) {
  const { img, imageSrc, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      {...rest}>
      <img src={imageSrc} alt={''} style={{ maxWidth: "100%", borderRadius: "50%" }} />
      {img}
    </Flex>
  );
}
