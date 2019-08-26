import styled from "styled-components";
import Box from "./Box";

const themed = key => props => props.theme[key];

export const Flex = styled(Box)(
  {
    display: "flex"
  },
  themed("Flex")
);

export default Flex;
