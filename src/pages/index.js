import React, { useState } from "react";
import { Box, Heading } from "agonkit";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import useEventListener from "../hooks/use-event-listener";

export default () => {
  const [color, setColor] = useState("transparent");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("primary.500");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("transparent");
    }
  };

  useEventListener("scroll", changeColor);

  return (
    <Layout>
      <SEO title="Home" keywords={[`qtnglobal`, `application`, `react`]} />
      <Box
        color="white"
        height="100vh"
        backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://source.unsplash.com/random/1024x768)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="relative"
      >
        <Navbar
          bg={color}
          top="0"
          left="0"
          position="fixed"
          zIndex="1"
          width="100%"
          alignItems="center"
          onClick={() => setSidebarOpen(true)}
        />
        {sidebarOpen && (
          <Sidebar
            color="white"
            bg="black"
            top="0"
            right="0"
            position="fixed"
            zIndex="1"
            height="100%"
            width={["100%", "50%", "25%"]}
            onClose={() => setSidebarOpen(false)}
          />
        )}
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
};
