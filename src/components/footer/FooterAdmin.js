/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex 
      zIndex='3'
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "50px" }}
      pb='30px'>
      <Text
        color={'black'}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        {" "}
       &copy; {1900 + new Date().getYear()}
        <Text as='b' fontWeight='900' ms='4px' color='blue'>
            CityGusa Todos os direitos reservados.
          <Link
            mx='3px'
            color={'black'}
            href='https://citygusa.com'
            target='_blank'
            fontWeight='900'>
          
          </Link>
        </Text>

      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
          
            fontWeight='500'
            color={'black'}
            href='mailto:carvao02@citygusa.com.br'>
            Suporte
          </Link>
        
        </ListItem>
      </List>
    </Flex>
  );
}
