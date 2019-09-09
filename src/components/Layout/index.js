import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { Box, theme } from "agonkit";

import GlobalStyles from "../../utils/global-styles";
import Footer from "../Footer";

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Box as="main">{children}</Box>
      <Footer />
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
