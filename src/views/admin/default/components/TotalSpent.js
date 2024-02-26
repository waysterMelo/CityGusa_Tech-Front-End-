// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import BarChart from "components/charts/BarChart";
import React from "react";
import {MdOutlineCalendarToday } from "react-icons/md";
import { barChartDataDailyTraffic, barChartOptionsDailyTraffic } from "variables/charts";

export default function TotalSpent(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={'yellow'}
            fontSize='sm'
            fontWeight='extrabold'
            color={'blackAlpha.900'}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            Dia 12/02/2024
          </Button>
       
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        
        <Flex flexDirection='column' mt='18px'>
        <Text
              textAlign={'left'}
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Custo Do Dia
            </Text>

          <Flex align='center' mb='20px'>
            <Text
            color={textColor}
            fontSize='30px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            R$2000,00
          </Text>
          </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          <BarChart
            chartData={barChartDataDailyTraffic}
            chartOptions={barChartOptionsDailyTraffic} 
            />
        </Box>
      </Flex>
    </Card>
  );
}
