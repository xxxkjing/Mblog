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
            <SocialLinks>
              <a href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><FiFile /></a>
              <a href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/tkpepper15" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.instagram.com/tejjaskphoto/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </SocialLinks>
            <AboutMe>
              <p>Hey, I'm Tejjas Kaul! I'm a highschooler who is keen on exploring neuroscience, ethics, and the technology at play. Check out my socials to see what I'm up to!</p>
            </AboutMe>
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
`;

const SocialLinks = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const AboutMe = styled.div`
  position: absolute;
  top: 240px; /* Adjust this value as needed */
  left: 50%;
  width: 400px;
  transform: translateX(-50%);
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 400px) {
    width: calc(100% - 1px);
    max-width: 400px;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: none;
  }
`;

const Main = styled.main`
  flex: 1;
`;

export default IndexLayout;
