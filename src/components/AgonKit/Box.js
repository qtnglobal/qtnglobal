import styled from "styled-components";
import {
  compose,
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  textStyle,
  colorStyle,
  buttonStyle
} from "styled-system";
import propTypes from "@styled-system/prop-types";

const themed = key => props => props.theme[key];

export const Box = styled("div")(
  {
    boxSizing: "border-box",
    minWidth: 0
  },
  compose(
    color,
    space,
    typography,
    layout,
    flexbox,
    grid,
    background,
    border,
    position,
    shadow,
    textStyle,
    colorStyle,
    buttonStyle
  ),
  themed("Box")
);

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.layout,
  ...propTypes.flexbox,
  ...propTypes.grid,
  ...propTypes.background,
  ...propTypes.border,
  ...propTypes.position,
  ...propTypes.shadow,
  ...propTypes.textStyle,
  ...propTypes.colorStyle,
  ...propTypes.buttonStyle
};

export default Box;
