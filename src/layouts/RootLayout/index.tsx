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
      <Footer>
        <LinksContainer>
          <a href="/resume"><FiFile /></a>
          <a href="https://www.linkedin.com/in/yourprofile"><FaLinkedin /></a>
          <a href="https://github.com/yourusername"><FaGithub /></a>
          <a href="https://www.instagram.com/yourprofile"><FaInstagram /></a>
        </LinksContainer>
        <Image src="/images/handwave.png" alt="Tejjas Kaul" width="100" height="100" />
      </Footer>
    </ThemeProvider>
  );
};

export default RootLayout;

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 1rem;
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
