import React from "react";
import styled from "styled-components";
import {
  compose,
  space,
  color,
  layout,
  flexbox,
  background,
  position
} from "styled-system";

import GlobalStyles from "../utils/global-styles";

const Box = styled.div(
  compose(
    space,
    color,
    layout,
    flexbox,
    background,
    position
  )
);

export default () => (
  <>
    <GlobalStyles />
    <Box
      height="100vh"
      backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://source.unsplash.com/random/1024x768)"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
    >
      <h1>Welcome to QTN Global!</h1>
    </Box>
  </>
);
