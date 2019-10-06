import React from "react";
import ReactParticles from "react-particles-js";
import { Box } from "agonkit";

import particlesConfig from "./particles-config";

const Particles = ({ children }) => (
  <Box position="relative">
    <ReactParticles
      params={particlesConfig}
      style={{
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }}
    />
    {children && <Box position="relative">{children}</Box>}
  </Box>
);

export default Particles;
