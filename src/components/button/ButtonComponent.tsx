import React from "react";
import * as Theme from "./Theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  label: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  isLoading = false,
  label,
  ...rest
}) => {
  return (
    <Theme.Button {...rest} disabled={isLoading || rest.disabled}>
      {isLoading ? (
        <span className="loader" role="status" aria-hidden="true">
          Loading ...
        </span>
      ) : (
        label
      )}
    </Theme.Button>
  );
};

export default ButtonComponent;
