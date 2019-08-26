import styled from "styled-components";
import { variant } from "styled-system";
import propTypes from "@styled-system/prop-types";
import Box from "./Box";

const themed = key => props => props.theme[key];

const cards = variant({ key: "cards" });

export const Card = styled(Box)(cards, themed("Card"));

Card.propTypes = {
  ...propTypes.cards
};

Card.defaultProps = {
  variant: "normal"
};

export default Card;
