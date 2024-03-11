import {
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Center,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter, Box, Image
} from "@chakra-ui/react";
import React  from "react";
// Custom components
import Card from "components/card/Card";
// Assets
import { FaRegCalendarAlt } from "react-icons/fa";
import { CgMoreO  } from "react-icons/cg";
import LeitodeFusaoCompleto from "../../dataTables/components/leitodefusaocompleto";

export default function ColumnsTable() {
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const handleClick = (newSize) =>{
    setSize(newSize)
    onOpen()
  }

  const sizes = ['xl']

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
          Alterações no leito de fusão
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
  <Table variant='striped' colorScheme='facebook' size='sm'>
  
    <Thead>
      <Tr>
        <Th>NOME</Th>
        <Th>LOTE</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>minerio extrativa</Td>
        <Td>741</Td>

      </Tr>
      <Tr>
        <Td>minerio comisa</Td>
        <Td>745B</Td>

      </Tr>
      <Tr>
        <Td>minerio ciclo metal</Td>
        <Td>852A</Td>

      </Tr>
      <Tr>
        <Td>sucata</Td>
        <Td>su758</Td>

      </Tr>
      <Tr>
        <Td>calcario</Td>
        <Td>ca756</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
       <Th colSpan={'3'}>
        <Center>
            {
              sizes.map((size) => (
     <Button ref={btnRef} onClick={() => handleClick(size)} leftIcon={<CgMoreO />} key={size}
             colorScheme='blue'>mais info</Button>
              ))
            }

          <Drawer isOpen={isOpen} onClose={onClose} size={size} placement={'right'} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Informações do leito de fusão
                12/01/2024
              </DrawerHeader>

              <DrawerBody>
                <LeitodeFusaoCompleto />
              </DrawerBody>

              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Center>
       </Th>
      </Tr>

    </Tfoot>
  </Table>
</TableContainer>

      
    </Card>
  );
}
