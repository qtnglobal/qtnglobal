import React from "react";
import styled from "styled-components";
import {
  space,
  width,
  fontSize,
  color,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  letterSpacing,
  display,
  height,
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  alignSelf,
  order,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  boxShadow,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  opacity,
  variant
} from "styled-system";

const themed = key => props => props.theme[key];

export const Box = styled("div")(
  {
    boxSizing: "border-box"
  },
  space,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  display,
  themed("Box")
);

Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...display.propTypes
};

export const Flex = styled(Box)(
  {
    display: "flex"
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  themed("Flex")
);

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes
};

export const Text = styled(Box)(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Text")
);

Text.propTypes = {
  ...fontFamily.propTypes,
  ...fontWeight.propTypes,
  ...textAlign.propTypes,
  ...lineHeight.propTypes,
  ...letterSpacing.propTypes
};

export const Heading = styled(Text)(themed("Heading"));

Heading.defaultProps = {
  as: "h2",
  m: 0,
  fontSize: 4,
  fontWeight: "bold"
};

export const Link = styled(Box)(themed("Link"));

Link.defaultProps = {
  as: "a",
  color: "blue"
};

export const Button = styled(Box)(
  {
    appearance: "none",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "inherit",
    textDecoration: "none"
  },
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  themed("Button")
);

Button.propTypes = {
  ...fontWeight.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...buttonStyle.propTypes
};

Button.defaultProps = {
  as: "button",
  fontSize: "inherit",
  fontWeight: "bold",
  m: 0,
  px: 3,
  py: 2,
  color: "white",
  bg: "blue",
  border: 0,
  borderRadius: 4
};

export const Image = styled(Box)(
  {
    maxWidth: "100%",
    height: "auto"
  },
  height,
  borderRadius,
  themed("Image")
);

Image.propTypes = {
  ...height.propTypes,
  ...borderRadius.propTypes
};

Image.defaultProps = {
  as: "img",
  m: 0
};

const cards = variant({ key: "cards" });

export const Card = styled(Box)(
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  opacity,
  cards,
  themed("Card")
);

Card.propTypes = {
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...boxShadow.propTypes,
  ...backgroundImage.propTypes,
  ...backgroundSize.propTypes,
  ...backgroundPosition.propTypes,
  ...backgroundRepeat.propTypes,
  ...opacity.propTypes,
  ...cards.propTypes
};

export const Container = props => (
  <Box
    {...props}
    mx="auto"
    css={{
      maxWidth: "1024px"
    }}
  />
);

export const Badge = props => (
  <Card
    color="white"
    bg="blue"
    {...props}
    px={3}
    py={1}
    borderRadius={9999}
    css={{
      display: "inline-block"
    }}
  />
);

export const Avatar = props => (
  <Image width={48} height={48} borderRadius={9999} {...props} />
);

export const BlockLink = props => (
  <Link
    color="inherit"
    display="block"
    {...props}
    css={{
      textDecoration: "none"
    }}
  />
);

export const NavLink = props => (
  <Link
    px={2}
    py={1}
    color="inherit"
    display="inline-block"
    {...props}
    css={{
      fontWeight: "bold",
      textDecoration: "none"
    }}
  />
);

export const Embed = props => (
  <Box
    {...props}
    width={1}
    css={{
      height: 0,
      paddingBottom: 9 / 16 + "%",
      position: "relative",
      overflow: "hidden",
      "& > iframe": {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }
    }}
  />
);

export const Pre = props => (
  <Text
    {...props}
    as="pre"
    fontFamily="Menlo, monospace"
    p={2}
    bg="lightgray"
  />
);

export const Fixed = props => (
  <Box
    {...props}
    css={{
      position: "fixed"
    }}
  />
);

export const Divider = props => (
  <Box
    {...props}
    as="hr"
    bg="gray"
    css={{
      border: 0,
      height: 1
    }}
  />
);

export const Caps = props => (
  <Text
    fontSize={1}
    {...props}
    css={{
      textTransform: "uppercase",
      letterSpacing: "0.2em"
    }}
  />
);

export const Toolbar = props => (
  <Flex px={2} color="white" bg="black" alignItems="center" {...props} />
);
