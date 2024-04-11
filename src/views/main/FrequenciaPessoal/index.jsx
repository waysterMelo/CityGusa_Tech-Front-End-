import React from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import Banner from "./components/Banner";
import TableTopCreators from "./components/TableTopCreators";
import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";

export default function FrequenciaPessoal() {

    return (
        <Box pt={{ base: "", md: "80px", xl: "40px" }}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={'repeat(2, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <GridItem w='120%' h={'-10'}>
                    <Banner/>
                </GridItem>
                <GridItem w='100%'>
                    <TableTopCreators columnsSize={'md'} tableData={tableDataTopCreators}
                                      columnsData={tableColumnsTopCreators} />
                </GridItem>

            </Grid>
            {/* Delete Product */}
        </Box>
    );
}