import * as React from "react";
import {Box, SimpleGrid} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ComplexTable from '../default/components/ComplexTable'; 
import {columnsDataComplex} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
// Assets
import Fire from "assets/img/icons/fire.png";
import Carvao from "assets/img/icons/carvao.png";
import Minerio from "assets/img/icons/minerio.png";
import Escoria from "assets/img/icons/escoria.png";
import Interroga from "assets/img/icons/interroga.png"
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import GeneralInformation from "../profile/components/General";

export default function Dashboards() {
  return (
    <Box pt={{ base:"130px", md: "80px", xl:"80px"}} className={'otherSide'} bgColor={'transparent'}>
      <SimpleGrid
        columns={{ base:1, sm: 1, md:2, lg:4, xl:3}}
        gap='1%'
        mt={'2%'}
      >
          <Link to={'consumo-minerios'}>
              <MiniStatistics
                  startContent={
                      <IconBox
                          w='20px'
                          h='20px'
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
          </Link>

          <Link to={'consumo-carvao'}>
            <MiniStatistics
          startContent={
            <IconBox
              w='20px'
              h='20px'
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
          </Link>

          <Link to={'temperaturas'}>
            <MiniStatistics
        startContent= {
          <IconBox
            w='20px'
            h='20px'
            img={
              <img
                src={Fire}
                alt='Fire'
                style={{ width: "100%", height: "100%" }}
              />
            }
          />
        }
        name='TEMPERATURA COROA'
        value='667'
      />
          </Link>

          <Link to={'escoria'}>
             <MiniStatistics
            startContent={
            <IconBox
              w='20px'
              h='20px'
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
            </Link>

          <Link>
              <MiniStatistics
                  startContent={
                      <IconBox
                          w='20px'
                          h='20px'
                          img={
                              <img
                                  src={Interroga}
                                  alt='carvao'
                                  style={{ width: "100%", height: "100%" }}
                              />
                          }
                      />
                  }
                  name='OUTRA INFORMAÇÃO'
                  value='350.40'
              />

          </Link>

          <Link>
              <MiniStatistics
                  startContent={
                      <IconBox
                          w='20px'
                          h='20px'
                          img={
                              <img
                                  src={Interroga}
                                  alt='carvao'
                                  style={{ width: "100%", height: "100%" }}
                              />
                          }
                      />
                  }
                  name='OUTRA INFORMAÇÃO'
                  value='642,39'
              />
          </Link>

      </SimpleGrid>

      <SimpleGrid columns={1} mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>

        <Box bg={'facebook.900'} w={'100%'} p={'4'} color={'white'}>
            <GeneralInformation/>
        </Box>
    
    </Box>
  );
}
