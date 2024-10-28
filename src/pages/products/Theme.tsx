import styled from "styled-components";

export const Body = styled.div.attrs({
  className:
    "flex flex-col items-center justify-center  p-4 bg-gray-100 text-gray-900 w-full h-full",
})``;

export const FormSection = styled.section.attrs({
  className:
    "flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md w-full max-w-4xl",
})``;

export const FormTitle = styled.h2.attrs({
  className: "text-2xl font-bold mb-4",
})``;

export const ProductList = styled.ul.attrs({
  className: "w-full space-y-4",
})``;

export const ProductItem = styled.li.attrs({
  className:
    "flex items-center space-x-4 p-4 border border-gray-200 rounded-md",
})``;

export const Loading = styled.div.attrs({
  className: "text-lg text-gray-500 w-full flex justify-center items-center ",
})``;

export const Errors = styled.div.attrs({
  className: "text-red-500",
})``;
