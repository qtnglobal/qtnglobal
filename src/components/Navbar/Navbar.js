import React from "react";
import { Menu } from "styled-icons/boxicons-regular/Menu";
import { Flex, Box, Image, Heading, Spacer } from "agonkit";

import logo from "../../assets/images/qtnglobal.png";

export const Navbar = ({ onClick, ...props }) => (
  <Flex {...props} as="nav">
    <Image m={3} py={2} src={logo} alt="Logo" width="48px" height="48px" />
    <Heading py={2}>QTN Global</Heading>
    <Spacer m="auto" />
    <Box m={3} py={2} display={["none", "none", "block"]}>
      Home
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      Who We Are
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      What We Do
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      Our Community
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      News
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      Contact Us
    </Box>
    <Box m={3} py={2} display={["block", "block", "none"]} onClick={onClick}>
      <Menu size="32" />
    </Box>
  </Flex>
);

export default Navbar;
