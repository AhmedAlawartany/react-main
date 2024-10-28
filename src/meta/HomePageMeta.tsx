import React from "react";
import Meta from "./Meta";

const HomePageMeta: React.FC = () => {
  return (
    <Meta
      title="Home"
      description="Welcome, your one-stop solution for all your needs."
      keywords="home, solutions"
      url={window.location.href}
    />
  );
};

export default HomePageMeta;
