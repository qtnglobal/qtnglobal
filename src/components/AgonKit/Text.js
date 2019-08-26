import styled from "styled-components";
import Box from "./Box";

const themed = key => props => props.theme[key];

export const Text = styled(Box)(themed("Text"));

export const Heading = styled(Text)(themed("Heading"));

Heading.defaultProps = {
  as: "h2",
  m: 0,
  fontSize: 4,
  fontWeight: "bold"
};

export default Text;
