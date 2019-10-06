import React from "react";
import { Menu } from "styled-icons/boxicons-regular/Menu";
import { Flex, Box, Image, Heading, Spacer } from "agonkit";
import { Link } from "gatsby";

import logo from "../../assets/images/qtnglobal.png";

export const Navbar = ({ onClick, ...props }) => (
  <Flex {...props} as="nav">
    <Image m={3} py={2} src={logo} alt="Logo" width="48px" height="48px" />
    <Heading py={2}>QTN Global</Heading>
    <Spacer m="auto" />
    <Box m={3} py={2} display={["none", "none", "block"]}>
      <Link to="/">Home</Link>
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      <Link to="/about">Who We Are</Link>
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      <Link to="/services">What We Do</Link>
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      <Link to="/community">Our Community</Link>
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      <Link to="/blog">News</Link>
    </Box>
    <Box m={3} py={2} display={["none", "none", "block"]}>
      <Link to="/contact">Contact Us</Link>
    </Box>
    <Box m={3} py={2} display={["block", "block", "none"]} onClick={onClick}>
      <Menu size="32" />
    </Box>
  </Flex>
);

export default Navbar;
