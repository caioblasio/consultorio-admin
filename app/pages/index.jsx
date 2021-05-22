import React from "react";
import { StyledContainer } from "./styles";

const Page = ({ children }) => {
  return <StyledContainer maxWidth={false}>{children}</StyledContainer>;
};

export default Page;
