import styled from "styled-components";
import { Container } from "@material-ui/core";

export const StyledContainer = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
`;
