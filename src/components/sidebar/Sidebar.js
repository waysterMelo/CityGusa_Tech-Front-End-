import React from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";

// Assets
import { IoMenuOutline } from "react-icons/io5";

import banner from "assets/img/nfts/NftBanner1.png";
import Content from "./Content";

function Sidebar(props) {
  const { routes } = props;

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
      "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
      "unset"
  );
  // Chakra Color Mode
  let sidebarMargins = "0px";

  //filtar rotas ocultas
  const visibleRoutes = routes.filter(route => !route.hidden);

  // SIDEBAR
  return (
      <Box display={{ sm: "none", xl: "block" }} className={'sidebarResponsivoTela1366'} bgColor={'transparent'}>
        <Box
            bgImage={banner}
            bgSize={'cover'}
            transition={variantChange}
            w='20%'
            h='100vh'
            m={sidebarMargins}
            minH='100%'
            overflowX='hidden'
            boxShadow={shadow}>
          <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
            <Content routes={visibleRoutes} />
          </Scrollbars>
        </Box>
      </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND
  const visibleRoutes = routes.filter(route => !route.hidden);


  return (
      <Flex display={{ sm: "flex", xl: "none" }} alignItems='center'>
        <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
          <Icon
              as={IoMenuOutline}
              color={'white'}
              my='auto'
              w='20px'
              h='20px'
              me='10px'
              _hover={{ cursor: "pointer" }}
          />
        </Flex>
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement={document.documentElement.dir === "rtl" ? "right" : "left"}
            finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent w='285px' maxW='285px'>
            <DrawerCloseButton
                zIndex='3'
                onClose={onClose}
                _focus={{ boxShadow: "none" }}
                _hover={{ boxShadow: "none" }}
            />
            <DrawerBody maxW='285px' px='0rem' pb='0'>
              <Scrollbars
                  autoHide
                  renderTrackVertical={renderTrack}
                  renderThumbVertical={renderThumb}
                  renderView={renderView}>
                <Content routes={visibleRoutes} />
              </Scrollbars>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;