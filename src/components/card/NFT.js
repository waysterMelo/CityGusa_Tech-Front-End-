
// Assets
import React from "react";
import {Link as ReactRouterLink} from "react-router-dom";
import {Avatar, AvatarGroup, Box, Flex, Image, Link, Text} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import {Button} from "react-bootstrap";
export default function NFT(props) {
  const { image, name, titulo, bidders, responsavel } = props;

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>

        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <Image style={{ height: '200px', width:'100%'}}
            className={'img-fluid'}
            src={image}
            borderRadius='20px'
          />
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={'black'}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {name}
              </Text>
              <Text
                align={'start'}
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {titulo}
              </Text>
            </Flex>
              <AvatarGroup
                  max={3}
                  color={'black'}
                  size='sm'
                  mt={{
                      base: "0px",
                      md: "10px",
                      lg: "0px",
                      xl: "10px",
                      "2xl": "0px",
                  }}
                  fontSize='12px'>
                  {bidders.map((avt, key) => (
                      <Avatar key={key} src={avt} />
                  ))}

                  <Text fontWeight='700' fontSize='sm' color={'blue'} mx={'6%'}>
                    {responsavel}
                  </Text>
              </AvatarGroup>
          </Flex>
          <Button variant={'outline-primary'} className={'mx-auto text-dark fw-bold'} style={{width: '40%', marginTop:'2%'}}
              as={ReactRouterLink}
              to={'/admin/leito'}>
              acessar
          </Button>

          </Flex>
        </Flex>
    </Card>

  );
}
