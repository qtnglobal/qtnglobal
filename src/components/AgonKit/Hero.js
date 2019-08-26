import React, { useState, useEffect } from "react";
import Box from "./Box";

export const Hero = ({ slides }) => {
  const [curr, setCurr] = useState(0);
  const { length } = slides;

  const goToNext = () => {
    setCurr(curr === length - 1 ? 0 : curr + 1);
  };

  useEffect(() => {
    setTimeout(goToNext, 2000);
    return function() {
      clearTimeout(goToNext);
    };
  });

  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  return (
    <Box position="relative" height="100vh">
      {slides.map((s, i) => (
        <div
          className={i === curr ? "slide active" : "slide"}
          key={s.title}
          aria-hidden={i !== curr}
        >
          <div>
            <h1>{s.title}</h1>
            <h2>{s.subtitle}</h2>
          </div>
          {i === curr && (
            <img className="image" src={s.image} alt={`${s.title}`} />
          )}
        </div>
      ))}
    </Box>
  );
};

export default Hero;
