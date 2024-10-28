import React from "react";
import * as Theme from "./Theme";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

const LabelComponent: React.FC<LabelProps> = ({ text, ...rest }) => {
  return <Theme.Label {...rest}>{text}</Theme.Label>;
};

export default LabelComponent;
