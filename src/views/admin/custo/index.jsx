import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TotalSpent from '../default/components/TotalSpent';
import MiniCalendar from "../../../components/calendar/MiniCalendar";

export default function Custo(){

return (
    <Box  pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid column={1} gap='20px' mb='20px'>
        <TotalSpent />
      </SimpleGrid>
        <MiniCalendar />
    </Box>

);
};