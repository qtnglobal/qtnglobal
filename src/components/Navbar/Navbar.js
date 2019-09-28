import React from "react";
import { Menu } from "styled-icons/boxicons-regular/Menu";
import { Flex, Box, Spacer } from "agonkit";
import Brand from "./Brand";

export const Navbar = ({ onClick, ...props }) => (
  <Flex {...props} as="nav">
    <Brand m={3} py={2} />
    <Spacer m="auto" />
    <Box m={3} py={2} display={["none", "block"]}>
      Home
    </Box>
    <Box m={3} py={2} display={["none", "block"]}>
      Who We Are
    </Box>
    <Box m={3} py={2} display={["none", "block"]}>
      What We Do
    </Box>
    <Box m={3} py={2} display={["none", "block"]}>
      Community
    </Box>
    <Box m={3} py={2} display={["none", "block"]}>
      News
    </Box>
    <Box m={3} py={2} display={["none", "block"]}>
      Contact
    </Box>
    <Box m={3} py={2} display={["block", "none"]} onClick={onClick}>
      <Menu size="32" />
    </Box>
  </Flex>
);

export default Navbar;
