import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import useScheme from "src/hooks/useScheme";
import Header from "./Header";
import styled from "@emotion/styled";
import Scripts from "src/layouts/RootLayout/Scripts";
import useGtagEffect from "./useGtagEffect";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  const [scheme] = useScheme();
  useGtagEffect();
  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      <Header fullWidth={false} />
      <StyledMain>{children}</StyledMain>
    </ThemeProvider>
  );
};

export default RootLayout;

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0 0.25rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 10px;
`;
