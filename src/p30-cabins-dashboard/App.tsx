import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Button } from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: #87ae45;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;
export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The wild Sepide</H1>
        <Button>Check in</Button>
        <Input />
      </StyledApp>
    </>
  );
}
