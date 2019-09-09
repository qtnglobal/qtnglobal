import React from "react";
import { Flex, Box, Heading } from "agonkit";

const Sidebar = ({ onClose, ...props }) => (
  <Flex {...props} onClick={onClose} flexDirection="column">
    <Box mx={3} my={2}>
      <Heading>QTN Global</Heading>
    </Box>
    <Box mx={3} my={2}>
      Home
    </Box>
    <Box mx={3} my={2}>
      Who We Are
    </Box>
    <Box mx={3} my={2}>
      What We Do
    </Box>
    <Box mx={3} my={2}>
      Community
    </Box>
    <Box mx={3} my={2}>
      News
    </Box>
    <Box mx={3} my={2}>
      Contact
    </Box>
  </Flex>
);

export default Sidebar;
