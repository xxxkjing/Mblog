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
              <p>Hey, I'm <strong>Tejjas Kaul</strong>! I'm a highschooler who is keen on exploring neuroscience and the technology at play. Check out my socials to see what I'm up to!</p>
            </AboutMe>
          </ImageContainer>
          <SocialLinks>
              <a href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><FiFile /></a>
              <a href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/tkpepper15" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.instagram.com/tejjaskphoto/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </SocialLinks>
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
  left: 50%;
  top: 275px;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const AboutMe = styled.div`
  margin-top: 10px; /* Added margin to create space between SocialLinks and AboutMe */
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray1};

  a {
    display: flex;
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }

    .icon {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`;

const Main = styled.main`
  flex: 1;
`;

export default IndexLayout;
