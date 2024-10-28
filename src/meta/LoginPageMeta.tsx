import React from "react";
import { Helmet } from "react-helmet-async";

const LoginPageMeta: React.FC = () => {
  return (
    <Helmet>
      <title>Login</title>
      <meta
        name="description"
        content="Log in to access your account and manage your information."
      />
      <meta name="keywords" content="login, sign in, myapp, account access" />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};

export default LoginPageMeta;
