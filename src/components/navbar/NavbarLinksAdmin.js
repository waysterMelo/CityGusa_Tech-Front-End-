
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
import routes from 'routes.js';
import {SearchBar} from "../searchBar/SearchBar";

export default function HeaderLinks(props) {

	const { secondary } = props;

	// Chakra Color Mode
	let menuBg = useColorModeValue('yellow');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	return (
		//componente lado direito
		<Flex 
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px"/>
			<SidebarResponsive routes={routes} />
			<Menu>
				<MenuButton>
				<Text fontSize='2xl' fontWeight={'extrabold'}>TURNO</Text>
				</MenuButton>
			</Menu>

			<Menu>
				<MenuButton p="0px">
					<Avatar 
					margin={'5px'}
						_hover={{ cursor: 'pointer' }}
						color="white"
						name="D"
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={'blue'}>
							👋&nbsp; Olá, Supervisor do turno
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
					
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="blue.900"
							borderRadius="8px"
							px="14px">
							<Text fontSize="sm">Trocar Turno</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
