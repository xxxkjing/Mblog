import styled from "@emotion/styled";
import React from "react";
import { MdSunny, MdNightlight } from "react-icons/md";
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
        <MdSunny size={18} />
      ) : (
        <MdNightlight size={18} />
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
  color: ${({ scheme }) => (scheme === "light" ? "#333" : "#f0f0f0")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ scheme }) => (scheme === "light" ? "#e0e0e0" : "#444")};
  }
`;