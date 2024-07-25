import styled from "@emotion/styled";
import React from "react";
import { FaSun, FaMoon } from  "react-icons/fa";
import useScheme from "src/hooks/useScheme";


type Props = {};

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme();

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light");
  };

  return (
    <StyledWrapper scheme={scheme} onClick={handleClick}>
      {scheme === "light" ? (
        <FaSun/>
      ) : (
        <FaMoon/>
      )}
    </StyledWrapper>
  );
};

export default ThemeToggle;

interface StyledWrapperProps {
  scheme: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${({ scheme }) => (scheme === "light" ? "#f0f0f0" : "#333")};
  border-radius: 50%;
`;