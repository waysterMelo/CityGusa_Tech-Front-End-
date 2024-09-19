import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon,
    Flex,
    Stack,
} from "@chakra-ui/react";
import { FaAngleDown, FaBox } from "react-icons/fa";
import Brand from "./components/Brand";
import SidebarCard from "./components/SidebarCard";

function Content({ routes }) {
    const history = useHistory();

    return (
        <Flex className="font-monospace" direction="column" height="100%" pt="25px" px="16px" borderRadius="30px">
            {/* Marca da Aplicação */}
            <Brand />

            {/* Links de Navegação */}
            <Stack direction="column" mb="auto" mt="8px">
                <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
                    {routes.map((route, index) => {
                        // Verifica se a rota possui sub-rotas (children)
                        if (route.children) {
                            return (
                                <Menu key={index}>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<FaAngleDown />}
                                        w="100%"
                                        bg="white"
                                        leftIcon={<FaBox />}
                                        justifyContent="flex-start"
                                        textAlign="left"
                                        _hover={{ bg: "yellow.100" }}
                                        _focus={{ boxShadow: "md" }}
                                    >
                                        {route.name}
                                    </MenuButton>
                                    <MenuList>
                                        {route.children.map((child, childIndex) => (
                                            <MenuItem
                                                key={childIndex}
                                                onClick={() => history.push(`${child.layout}${child.path}`)}
                                                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                                            >
                                                <Icon as={FaBox} mr={2} />
                                                {child.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            );
                        }

                        // Renderiza itens de menu normais
                        return (
                            <Box key={index} my={2}>
                                <NavLink to={`${route.layout}${route.path}`} style={{ textDecoration: "none" }}>
                                    <Button
                                        w="100%"
                                        leftIcon={route.icon}
                                        justifyContent="flex-start"
                                        bg="white"
                                        _hover={{ bg: "yellow.100" }}
                                        _focus={{ boxShadow: "none" }}
                                    >
                                        {route.name}
                                    </Button>
                                </NavLink>
                            </Box>
                        );
                    })}
                </Box>
            </Stack>

            {/* Cartão na Barra Lateral */}
            <Box bg="transparent" mt="60px" mb="40px" borderRadius="30px">
                <SidebarCard />
            </Box>
        </Flex>
    );
}

export default Content;
