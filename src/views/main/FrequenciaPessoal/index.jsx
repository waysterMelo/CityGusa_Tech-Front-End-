import React from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import Banner from "./components/Banner";
import TableTopCreators from "./components/TableTopCreators";
import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";

export default function FrequenciaPessoal() {

    return (
        <Box pt={{ base: "", md: "80px", xl: "1%" }}>
            {/* Main Fields */}
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                    <Banner/>
            </Grid>

        </Box>
    );
}