import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;
export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The wild Sepide</Heading>
        <Heading as="h2">Tired Sepide</Heading>
        <Heading as="h3">blowed Sepide</Heading>

        <Button>Check in</Button>
        <Input />
      </StyledApp>
    </>
  );
}
