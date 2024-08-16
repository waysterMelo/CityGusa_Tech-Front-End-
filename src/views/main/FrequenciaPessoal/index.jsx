import React from "react";
import {Box, Grid, SimpleGrid} from "@chakra-ui/react";
import Banner from "components/banner/Banner";
import TableTopCreators from "./components/TableTopCreators";
import {tableColumnsTopCreators} from "./variables/tableColumnsTopCreators";
import tableDataTopCreators from "./variables/tableDataTopCreators";

export default function FrequenciaPessoal() {

    return (
        <Box pt={{ base: "", md: "80px", xl: "10%" }}>
            {/* Main Fields */}
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>[
                <Banner  url_voltar={'/admin/home'}/>
            </Grid>

            <SimpleGrid columns={1} >
                  <TableTopCreators tableData={tableDataTopCreators} columnsData={tableColumnsTopCreators} />
            </SimpleGrid>
        </Box>
    );
}