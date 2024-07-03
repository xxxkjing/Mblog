import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

type LayoutProps = {
  children: ReactNode;
};

const IndexLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  useEffect(() => {
    console.log("Current Path:", router.pathname);
  }, [router.pathname]);

  return (
    <Container>
      {isIndexPage && (
        <Header>
          <ImageContainer>
            <Image src="/images/handwave.png" alt="Tejjas Kaul" width={200} height={200} />
            <AboutMe>
            <p>Hi, I'm <strong>Tejjas Kaul</strong>! I'm a high schooler who is keen on exploring neurotech and the policies at play. Check out the <LinkStyle href="/blog">blog</LinkStyle> and the links below to stay updated:</p>
            </AboutMe>
            <SocialLinks>
              <a href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><FiFile /></a>
              <a href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/tkpepper15" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.instagram.com/tejjaskphoto/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </SocialLinks>
          </ImageContainer>
        </Header>
      )}
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialLinks = styled.div`
  position: absolute;
  bottom: -50px; /* Adjust this value as needed */
  display: flex;
  gap: 20px;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray1};
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
`;

const LinkStyle = styled.a`
  color: gray;
`;

const AboutMe = styled.div`
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray1};
`;

const Main = styled.main`
  flex: 1;
`;

export default IndexLayout;
