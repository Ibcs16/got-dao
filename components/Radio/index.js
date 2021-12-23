import { useState } from "react";
import { Wrapper, RadioCircle, RadioCircleFill } from "./styles";

const Radio = ({ checked, label, htmlFor, ...others }) => {
  return (
    <Wrapper htmlFor={htmlFor}>
      <RadioCircle>{checked && <RadioCircleFill />}</RadioCircle>

      <input type={"radio"} className="hidden" {...others} />
      {label}
    </Wrapper>
  );
};

export default Radio;
