import {
  Flex,
  Text,
  Center,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td
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
      overflowX={{sm: "scroll", lg: "hidden"}}>
     
      <Flex px='20px' py='3' justify='space-between' align='center'>
        <Text
          color={'blue.900'}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          FECHAMENTO LEITO DE FUSÃO
        </Text>
      </Flex>

      <Box>
        <TableContainer p={'5'}>
          <Table className={'table table-striped-columns'} variant={'striped'} size='sm'>
            <Thead bgColor={'gray.400'}>
              <Tr>
                <Th className={'bg-black text-white'}></Th>
                <Th className={'bg-black text-white'}></Th>
                <Th className={'bg-black text-white'}>1° TURNO</Th>
                <Th className={'bg-black text-white'}>2° TURNO</Th>
                <Th className={'bg-black text-white'}>3° TURNO</Th>
                <Th className={'bg-black text-white'}></Th>
                <Th className={'bg-black text-white'}></Th>
                <Th className={'bg-black text-white text-center '}>TOTAL</Th>
              </Tr>
            </Thead>
            <Tbody clas>
              <Tr>
                <Td></Td>
                <Td>Número de cargas</Td>
                <Td>01</Td>
                <Td>40</Td>
                <Td>80</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>121</Td>
              </Tr>

              <Tr>
                <Td></Td>
                <Td>Produção Total</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>% Umidade de Carvão</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons CV Úmido - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Finos Minério</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>P.E.U - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td style={{ width: '2px'}} className={'text-center'}>900<Badge pill={true} bg="dark">úmido</Badge></Td>
                <Td style={{ width: '2px'}} className={'text-center'}>900<Badge pill={true} bg="dark">seco</Badge></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons Minério - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Cons Coque - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td className={'bold'}>C.E.CV.kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td style={{ width: '2px'}} className={'text-center'}><span>900 </span><Badge pill={true} bg="dark">úmido</Badge></Td>
                <Td style={{ width: '2px'}} className={'text-center'}><span>900 </span><Badge pill={true} bg="dark">seco</Badge></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV. - m/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td style={{ width: '2px'}} className={'text-center'}>200<Badge pill={true} bg="dark">enfor</Badge></Td>
                <Td style={{ width: '2px'}} className={'text-center'}>200<Badge pill={true} bg="dark">bruto</Badge></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Pó do coletor - kg</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV + Coque -kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E Minério - kg/t</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>Rendimento</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>C.E.CV - m</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td>100</Td>
                <Td></Td>
                <Td></Td>
                <Td className={'text-black text-center fw-bolder'}>300</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
        <Center>
            {
              sizes.map((size) => (
                <Button className={'btn btn-md btn-primary'} ref={btnRef} onClick={() => handleClick(size)} leftIcon={<CgMoreO />} key={size}
             colorScheme='gray'>mais info...</Button>
              ))
            }

          <Drawer isOpen={isOpen} onClose={onClose} size={size} placement={'left'} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Text bgColor={'facebook.400'} color={'white'} className={'text-center p-4 h3'}>Alterações no leito de fusão</Text>
              </DrawerHeader>

              <DrawerBody>
                <Box bgColor={'lightyellow'} w={'100%'} h={'100%'} >
                  <TableContainer>
                    <Table variant='striped' size={'sm'}>
                      <Thead>
                        <Tr>
                          <Th className={'bg-black text-white'}>N° da carga</Th>
                          <Th className={'bg-black text-white'}>%</Th>
                          <Th className={'bg-black text-white'}>02</Th>
                          <Th className={'bg-black text-white'}>50</Th>
                          <Th className={'bg-black text-white'}>80</Th>
                          <Th className={'bg-black text-white'}>120</Th>
                          <Th className={'bg-black text-white text-center'}>Total</Th>
                        </Tr>
                        <Tr>
                          <Th className={'bg-black text-white p-2'}>Minério</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td className={'bg-black text-white'}>Extrativa</Td>
                          <Td className={'bg-secondary-subtle'}>15%</Td>
                          <Td>160</Td>
                          <Td>160</Td>
                          <Td>160</Td>
                          <Td>160</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Comisa</Td>
                          <Td className={'bg-secondary-subtle'}>15%</Td>
                          <Td>150</Td>
                          <Td>150</Td>
                          <Td>150</Td>
                          <Td>150</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Bassari</Td>
                          <Td className={'bg-secondary-subtle'}>15%</Td>
                          <Td>100</Td>
                          <Td>100</Td>
                          <Td>100</Td>
                          <Td>100</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Ciclo Metal</Td>
                          <Td className={'bg-secondary-subtle'}>15%</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Lâmina</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Calcareo</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Bauxita</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Coque</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Secas</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Sucata Gusa</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                        <Tr>
                          <Td className={'bg-black text-white'}>Sucata Aço</Td>
                          <Td></Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td>90</Td>
                          <Td className={'text-center bg-secondary-subtle'}>640</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </DrawerBody>

              <DrawerFooter>
                <Button className={'btn btn-md btn-dark'} onClick={onClose}>
                    Voltar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Center>


      
    </Card>
  );
}
