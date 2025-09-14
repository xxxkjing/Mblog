import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { CONFIG } from "site.config";

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
              {/* 添加头像显示 */}
              <AvatarContainer>
                <AvatarImage
                  src={CONFIG.profile.image}
                  alt={CONFIG.profile.name}
                  width={120}
                  height={120}
                />
              </AvatarContainer>
              <h1>Hi, I&apos;m <Highlight>MetaIllusion</Highlight></h1>
              <Description>
                记录一个不务正业的高中生的日常
              </Description>
              {mounted && (
                <SocialLinks>
                  <a href="https://github.com/xxxkjing" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="mailto:xkjing.xiajing@gmail.com" target="_blank" rel="noopener noreferrer"><FaEmail /></a>
                </SocialLinks>
              )}
              
              {/* 添加项目展示 */}
              {CONFIG.projects && CONFIG.projects.length > 0 && (
                <ProjectsSection>
                  <SectionTitle>Featured Projects</SectionTitle>
                  <ProjectsGrid>
                    {CONFIG.projects.map((project, index) => (
                      <ProjectCard 
                        key={index}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ProjectTitle>{project.name}</ProjectTitle>
                        <ProjectArrow>→</ProjectArrow>
                      </ProjectCard>
                    ))}
                  </ProjectsGrid>
                </ProjectsSection>
              )}
              
              {mounted && (
                <NavigationButtons>
                  <Link href="/blog" passHref legacyBehavior>
                    <NavButton
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavButtonText>What have I been up to?</NavButtonText>
                    </NavButton>
                  </Link>
                </NavigationButtons>
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
  
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 1rem;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const AvatarImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.gray4};
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

const ProjectsSection = styled.div`
  margin-top: 3rem;
  text-align: left;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.gray12};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProjectCard = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray2};
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray6};
    background: ${({ theme }) => theme.colors.gray3};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 0;
`;

const ProjectArrow = styled.span`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: 1.2rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;

  @media (max-width: 640px) {
    gap: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const NavButton = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  transition: all 0.2s ease;
  min-width: 140px;

  &:hover {
    background: ${({ theme }) => theme.colors.gray3};
    border-color: ${({ theme }) => theme.colors.gray6};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 640px) {
    min-width: 120px;
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 200px;
    padding: 1rem;
  }
`;

const NavButtonText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray12};
  text-align: center;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

export default IndexLayout;
