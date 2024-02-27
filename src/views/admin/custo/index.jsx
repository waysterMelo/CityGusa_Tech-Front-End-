import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TotalSpent from '../default/components/TotalSpent';
import ComplexTable from '../default/components/ComplexTable'; 
import {columnsDataComplex} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function Custo(){

return (
    <Box  pt={{ base: "130px", md: "80px", xl: "80px" }}>

<SimpleGrid column={1} gap='20px' mb='20px'>
        <TotalSpent />
      </SimpleGrid>

      <SimpleGrid columns={1} gap='20px' mb='20px'>
        <ComplexTable 
          columnsData={columnsDataComplex} 
          tableData={tableDataComplex}
        />
      </SimpleGrid> 

    </Box>
);
};