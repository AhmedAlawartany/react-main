import React from "react";
import Meta from "./Meta";

const RegisterPageMeta: React.FC = () => {
  return (
    <Meta
      title="Register"
      description="Create a new account to enjoy all the features and benefits."
      keywords="register, signup, create account"
      url={typeof window !== "undefined" ? window.location.href : ""}
      image="/path/to/register/image.jpg"
    />
  );
};

export default RegisterPageMeta;
