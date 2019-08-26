import styled from "styled-components";
import Box from "./Box";

const themed = key => props => props.theme[key];

export const Image = styled(Box)(
  {
    maxWidth: "100%",
    height: "auto"
  },
  themed("Image")
);

Image.defaultProps = {
  as: "img",
  m: 0
};

export default Image;
