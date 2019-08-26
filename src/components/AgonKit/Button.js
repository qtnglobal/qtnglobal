import styled from "styled-components";
import { buttonStyle } from "styled-system";
import propTypes from "@styled-system/prop-types";
import Box from "./Box";

const themed = key => props => props.theme[key];

export const Button = styled(Box)(
  {
    appearance: "none",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "inherit",
    textDecoration: "none"
  },
  buttonStyle,
  themed("Button")
);

Button.propTypes = {
  ...propTypes.buttonStyle
};

Button.defaultProps = {
  as: "button",
  fontSize: "inherit",
  fontWeight: "bold",
  m: 0,
  px: 3,
  py: 2,
  border: 0,
  borderRadius: 4,
  variant: "primary"
};

export default Button;
