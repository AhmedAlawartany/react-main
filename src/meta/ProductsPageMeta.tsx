import React from "react";
import Meta from "./Meta";

const ProductsPageMeta: React.FC = () => {
  return (
    <Meta
      title="Products"
      description="Explore our wide range of products and find what suits you best."
      keywords="products, shop, catalog"
      url={typeof window !== "undefined" ? window.location.href : ""}
      image="/path/to/products/image.jpg"
    />
  );
};

export default ProductsPageMeta;
