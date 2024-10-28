import React from "react";
import * as Theme from "./Theme";

interface HintProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

const HintComponent: React.FC<HintProps> = ({ text, ...rest }) => {
  return (
    <Theme.Hint className="hint" {...rest}>
      {text}
    </Theme.Hint>
  );
};

export default HintComponent;
