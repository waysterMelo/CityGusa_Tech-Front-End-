import {
  Flex,
  HStack,
  Text,
  Center,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot
} from "@chakra-ui/react";
import React from "react";
// Custom components
import Card from "components/card/Card";
import Button from 'react-bootstrap/Button';
import { CgMoreO  } from "react-icons/cg";
import Badge from 'react-bootstrap/Badge';
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
      <Text fontSize={'25px'} fontWeight={'extrabold'} color={'messenger.900'}>
        <Center>
          <Button variant={'secondary'}>12-01-2024</Button>
        </Center>

        </Text>
      </HStack>
    
      </Flex>

      <Box>
        <TableContainer p={'5'}>
          <Table variant={'striped'} size='sm'>
            <Thead bgColor={'gray.400'}>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>1° TURNO</Th>
                <Th>2° TURNO</Th>
                <Th>3° TURNO</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody bgColor={'gray.200'}>

              <Tr>
                <Td></Td>
                <Td>Número de cargas</Td>
                <Td>01</Td>
                <Td>40</Td>
                <Td>80</Td>
                <Td></Td>
                <Td></Td>
              </Tr>

              <Tr>
                <Td></Td>
                <Td>Produção Total</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>% Umidade de Carvão</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons CV Úmido - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Finos Minério</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>P.E.U - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td><span>900</span><Badge pill={true} bg="dark">úmido</Badge></Td>
                <Td><span>900</span><Badge pill={true} bg="dark">seco</Badge></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons Minério - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons Coque - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV.kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td><span>900</span><Badge pill={true} bg="dark">úmido</Badge></Td>
                <Td><span>900</span><Badge pill={true} bg="dark">seco</Badge></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV. - m/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td><span>200</span><Badge pill={true} bg="dark">enfor</Badge></Td>
                <Td><span>200</span><Badge pill={true} bg="dark">bruto</Badge></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Pó do coletor - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV + Coque -kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E Minério - kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Rendimento</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV - m</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
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
                <Button variant={'outline-secondary'} ref={btnRef} onClick={() => handleClick(size)} leftIcon={<CgMoreO />} key={size}
             colorScheme='gray'>mais info</Button>
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
