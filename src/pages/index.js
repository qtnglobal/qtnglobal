import React from "react";

import Layout from "../components/Layout";
import { Box, Heading } from "../components/AgonKit";

export default () => (
  <Layout>
    <Box
      color="white"
      height="100vh"
      backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://source.unsplash.com/random/1024x768)"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
        css={{ transform: "translate(-50%, -50%)" }}
      >
        <Heading>Welcome to QTN Global!</Heading>
      </Box>
    </Box>
  </Layout>
);
