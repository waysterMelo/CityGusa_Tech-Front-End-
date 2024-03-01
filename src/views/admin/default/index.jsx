// Chakra imports
import {Box, SimpleGrid, Stack, Heading, Button, Image, Text} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import ComplexTable from '../default/components/ComplexTable'; 
import {columnsDataComplex} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
// Assets
import Fire from "assets/img/icons/fire.png";
import Carvao from "assets/img/icons/carvao.png";
import Minerio from "assets/img/icons/minerio.png";
import Escoria from "assets/img/icons/escoria.png";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import MiniStatisticsTemperaturaForno from  "components/card/MiniStatisticsTemperaturaForno";
import IconBox from "components/icons/IconBox";
import React from "react";


export default function UserReports() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='10px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='40px'
              h='40px'   
              img={
                <img
                  src={Minerio}
                  alt='carvao'
                  style={{ width: "100%", height: "100%" }}
                />
              }
            />
          }
          name='CONSUMO ATUAL DE MINERIOS'
          value='350.40'
        />
  
        <MiniStatistics
          startContent={
            <IconBox
              w='40px'
              h='40px'
              img={
                <img
                  src={Carvao}
                  alt='carvao'
                  style={{ width: "100%", height: "100%" }}
                />
              }
            />
          }
          name='COMSUMO CARVÃO'
          value='642,39'
        />
       
       <MiniStatisticsTemperaturaForno
        startContent= {
          <IconBox
            w='40px'
            h='40px'
            img={
              <img
                src={Fire}
                alt='Fire'
                style={{ width: "100%", height: "100%" }}
              />
            }
          />
        }
        name1='TEMPERATURA COROA'
        value1='667'
        name2='TEMPERATURA TOPO'
        value2='58'
      />     

          
          {/* card escoria */}
        <MiniStatistics
          startContent={
            <IconBox
              w='40px'
              h='40px'
              img={
                <img
                  src={Escoria}
                  alt='escoria'
                  style={{ width: "100%", height: "100%" }}
                />
              }
            />
        
            }
            
          name='ESCÓRIA'
          img={
            <img
              src={Escoria}
              alt='escoria'
              style={{ width: "100%", height: "100%" }}
            />
            
          }
          endContent={
            <Box position="center" bottom="-10px" left="50%" 
            transform="translateX(-50%)" width="50px" height="50px" borderRadius="50%" backgroundColor="green" />
          }
          />
      <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>

      <Text py='2'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>
  



         
      </SimpleGrid>

      <SimpleGrid columns={1} gap='20px' mb='20px'>
        <ComplexTable 
          columnsData={columnsDataComplex} 
          tableData={tableDataComplex}
        />
      </SimpleGrid> 

    </Box>
  );
}
