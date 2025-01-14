import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from "./RootLayout/Header/ThemeToggle";
import dynamic from 'next/dynamic';

type LayoutProps = {
  children: ReactNode;
};

type Project = {
  title: string;
  link: string;
  image: string;
  description: string;
  date: string;
};

const projects: Project[] = [
  {
    title: "Duke Applied Ethics+ & NCSSM SRIP",
    link: "https://applied-ethics.vercel.app/",
    image: "/images/dukeappliedethics.png",
    description: "Case Study Analysis, UI/UX, Video Editing, Web Design",
    date: "May - July 2024"
  },
  {
    title: "Brailliant Website",
    link: "https://brailliant.vercel.app/",
    image: "/images/braillebox.png",
    description: "Web Design, Visual Impairment, UI/UX, Accessibility",
    date: "Aug 2024 - Present"
  },
  {
    title: "Youth Climate Initiative Website",
    link: "https://yci-website-enterprise.vercel.app/",
    image: "/images/yci.png",
    description: "Web Design, Climate Change, UI/UX, Fundraising",
    date: "May 2024 - Present"
  },
  {
    title: "MoodFlip: Gauging Emotions from Selfies",
    link: "https://www.tejjaskaul.com/moodflip",
    image: "/images/moodflip.png",
    description: "UI/UX, AI/ML, Mobile App Development, Web Design",
    date: "September 2023"
  },
  {
    title: "Neuro-Ophthalmology Guide (NCSSM)",
    link: "https://tkpepper15.github.io/neuro-midterm/",
    image: "/images/neuro-ophthalmology.png",
    description: "Scientific Writing, Analytical Research, Web Design, Neuroanatomy",
    date: "March 2024"
  },
  {
    title: "Smart Vision Glasses for the Elderly",
    link: "https://www.tejjaskaul.com/ar-glasses",
    image: "/images/smartglasses.png",
    description: "AI/ML, UI/UX, Engaging with Professionals, Collaborative Discovery",
    date: "December 2023 - Present"
  }
];

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray12};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray11};
  }
`;

const IndexLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create a common layout structure to ensure consistency
  const content = (
    <Section
      {...(mounted ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      } : {})}
    >
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

      <ProjectsSection>
        <SectionTitle>Relevant Work</SectionTitle>
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              {...(mounted ? { whileHover: { y: -4 } } : {})}
            >
              {mounted ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={225}
                  style={{ 
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                    borderRadius: "16px 16px 0 0"
                  }}
                />
              ) : (
                <div style={{ 
                  width: "100%", 
                  height: "200px",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: "16px 16px 0 0"
                }} />
              )}
              <ProjectContent>
                <ProjectTitle className="project-title">{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectDate suppressHydrationWarning>{project.date}</ProjectDate>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsSection>
    </Section>
  );

  return (
    <Wrapper>
      
      <Container>
        <Main>
          {mounted ? (
            <AnimatePresence mode="wait">
              {content}
            </AnimatePresence>
          ) : content}
        </Main>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const GlobalHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
  }
`;

const Container = styled.div`
  padding: 2rem;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled(motion.div)``;

const AboutSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const ProjectsSection = styled.div`
  margin-top: 6rem;
  padding: 0 1rem;
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

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 3rem;
  font-weight: 600;
  text-align: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 0;
  font-weight: 600;
  transition: color 0.2s ease;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
`;

const ProjectDate = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray10};
  font-weight: 500;
  margin-top: auto;
`;

const ProjectCard = styled(motion.a)`
  text-decoration: none;
  color: inherit;
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    
    &::after {
      opacity: 1;
    }
    
    .project-title {
      color: ${({ theme }) => theme.colors.blue11};
    }
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
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

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray11};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

export default IndexLayout;