import {
  Flex,
  HStack,
  Text,
  Center,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter, Box, Grid, GridItem, Square, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot
} from "@chakra-ui/react";
import React from "react";
// Custom components
import Card from "components/card/Card";
// Assets
import { FaRegCalendarAlt } from "react-icons/fa";
import { CgMoreO  } from "react-icons/cg";

export default function ColumnsTable(props) {
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
     
      <Flex px='20px' py='3' justify='space-between' align='center'>
        <Text
          color={'blue.900'}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          FECHAMENTO LEITO DE FUSÃO
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

      <Box>
        <TableContainer p={'5'}>
          <Table variant={'striped'} size='sm'>
            <Thead bgColor={'gray.300'}>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>1° TURNO</Th>
                <Th>2° TURNO</Th>
                <Th>3° TURNO</Th>
                <Th>umido</Th>
                <Th>seco</Th>
              </Tr>
            </Thead>
            <Tbody>

              <Tr>
                <Td></Td>
                <Td>Número de cargas</Td>
                <Td>01</Td>
                <Td >40</Td>
                <Td >80</Td>
              </Tr>

              <Tr>
                <Td></Td>
                <Td>Produção Total</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>% Umidade de Carvão</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons CV Úmido - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Finos Minério</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>P.E.U - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td bgColor={'facebook.200'}>u</Td>
                <Td bgColor={'facebook.200'}>s</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons Minério - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons Coque - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV.kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV. - m/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Pó do coletor - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV + Coque -kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E Minério - kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Rendimento</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV - m</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
              </Tr>
            </Tbody>
            <Tfoot>

            </Tfoot>
          </Table>
        </TableContainer>
      </Box>

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
              <DrawerHeader>
              </DrawerHeader>

              <DrawerBody>
                <Box bg={'gray.300'} w={'100%'} h={'100%'} p={'4'} color={'white'}>

                </Box>
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


      
    </Card>
  );
}
