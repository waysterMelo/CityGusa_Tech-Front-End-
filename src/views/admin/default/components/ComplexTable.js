import {Flex,HStack,Table,TableContainer,Tbody,Td,Text, Tfoot, Th, Thead, Tr, Center} from "@chakra-ui/react";
import React  from "react";
// Custom components
import Card from "components/card/Card";
// Assets
import { FaRegCalendarAlt } from "react-icons/fa";


export default function ColumnsTable() {

  return (
    <Card
    marginTop='50px'
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
     
      <Flex px='30px' py='3' justify='space-between' mb='10px' align='center'>
        <Text
          color={'blue.900'}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'> 
          LEITO DE FUSÃO
        </Text>
      
      <HStack>
      <FaRegCalendarAlt/>
      <Text fontSize={'25px'} fontWeight={'extrabold'} color={'messenger.900'}>
        <Center>
        12-01-2024
        </Center>
     
        </Text>
      </HStack>
    
      </Flex>

      <TableContainer>
  <Table variant='striped' colorScheme='facebook' size='md'>
  
    <Thead>
      <Tr>
        <Th>NOME</Th>
        <Th>LOTE</Th>
        <Th isNumeric>QUANTIDADE</Th>

      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>minerio extrativa</Td>
        <Td>741</Td>
        <Td isNumeric>250.40</Td>
      </Tr>
      <Tr>
        <Td>minerio comisa</Td>
        <Td>745B</Td>
        <Td isNumeric>300.48</Td>
      </Tr>
      <Tr>
        <Td>minerio ciclo metal</Td>
        <Td>852A</Td>
        <Td isNumeric>263.00</Td>
      </Tr>
      <Tr>
        <Td>sucata</Td>
        <Td>su758</Td>
        <Td isNumeric>263.00</Td>
      </Tr>
      <Tr>
        <Td>calcario</Td>
        <Td>ca756</Td>
        <Td isNumeric>263.00</Td>
      </Tr>
      <Tr>
        <Td>bauxita</Td>
        <Td>985</Td>
        <Td isNumeric>263.00</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th colSpan={'2'}>TOTAL</Th>
        <Th fontSize={'18px'} isNumeric>700.00 T</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>

      
    </Card>
  );
}
