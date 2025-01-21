import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

type LayoutProps = {
  children: ReactNode;
};

const IndexLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Wrapper>
      <Container>
        <Main>
          <Section>
            <AboutSection>
              <h1>Hi, I&apos;m <Highlight>Tejjas Kaul</Highlight></h1>
              <Description>
                A high schooler passionate about exploring the intersections of neuroscience and design.
              </Description>
              {mounted && (
                <SocialLinks>
                  <a href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><FiFile /></a>
                  <a href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                  <a href="https://github.com/tkpepper15" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.instagram.com/tejjaskphoto/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </SocialLinks>
              )}
            </AboutSection>
          </Section>
        </Main>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Container = styled.div`
  padding: 2rem;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div``;

const AboutSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray11};
  margin: 1.5rem 0;
  max-width: 600px;
  margin: 1.5rem auto;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.gray12};
  font-weight: 600;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;

  a {
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 1.25rem;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
      transform: translateY(-2px);
    }
  }
`;

export default IndexLayout;