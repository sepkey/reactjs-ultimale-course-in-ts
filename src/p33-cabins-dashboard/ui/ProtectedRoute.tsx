import { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  // 1 Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3 If ther is no authenticated user redirect to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );
  // 2 While loading show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4 If there is a user render the app
  return <>{children}</>;
  //   return null;
}
