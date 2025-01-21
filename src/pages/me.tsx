import { NextPageWithLayout } from "../types"
import MetaConfig from "src/components/MetaConfig"
import styled from '@emotion/styled';
import Image from 'next/image';
import { CONFIG } from "site.config";
import { useState, useEffect } from 'react';

type Project = {
  title: string;
  link: string;
  demoLink?: string;
  image: string;
  description: string;
  date: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Duke Applied Ethics+ & NCSSM SRIP",
    link: "https://applied-ethics.vercel.app/",
    demoLink: "https://www.youtube.com/watch?v=Ne1Vq62ntLo",
    image: "/images/dukeappliedethics.png",
    description: "A research initiative exploring ethical implications in technology through interactive case studies and collaborative learning.",
    date: "May - July 2024",
    tags: ["Research", "Ethics", "Education"]
  },
  {
    title: "Brailliant Website",
    link: "https://brailliant.vercel.app/",
    image: "/images/braillebox.png",
    description: "An accessible platform bridging visual and tactile learning through innovative Braille technology and inclusive design.",
    date: "Aug 2024 - Present",
    tags: ["Accessibility", "Design", "Education"]
  },
  {
    title: "Youth Climate Initiative",
    link: "https://yci-website-enterprise.vercel.app/",
    image: "/images/yci.png",
    description: "A digital platform empowering youth engagement in climate action through educational resources and community initiatives.",
    date: "May 2024 - Present",
    tags: ["Climate", "Community", "Education"]
  },
  {
    title: "MoodFlip: Emotion Analysis",
    link: "https://www.tejjaskaul.com/moodflip",
    image: "/images/moodflip.png",
    description: "An AI-powered application analyzing facial expressions to understand and track emotional patterns in real-time.",
    date: "September 2023",
    tags: ["AI/ML", "Healthcare", "Mobile"]
  },
  {
    title: "Neuro-Ophthalmology Guide",
    link: "https://tkpepper15.github.io/neuro-midterm/",
    image: "/images/neuro-ophthalmology.png",
    description: "A comprehensive digital guide exploring the intersection of neurology and ophthalmology through interactive learning materials.",
    date: "March 2024",
    tags: ["Neuroscience", "Research", "Education"]
  },
  {
    title: "Smart Vision Glasses",
    link: "https://www.tejjaskaul.com/ar-glasses",
    image: "/images/smartglasses.png",
    description: "An augmented reality solution designed to enhance visual accessibility and independence for elderly individuals.",
    date: "December 2023 - Present",
    tags: ["AR/VR", "Healthcare", "Accessibility"]
  }
];

const MePage: NextPageWithLayout = () => {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tags = projects.reduce((acc, project) => {
    project.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as { [key: string]: number });

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag || tag === '') {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
  };

  const filteredProjects = selectedTag 
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  const meta = {
    title: "Me — Tejjas Kaul",
    description: "High school student exploring neuroscience and design",
    type: "website",
    url: `${CONFIG.link}/me`,
  };

  return (
    <>
      <MetaConfig {...meta} />
      <Container>
        <Header>
          <ProfileSection>
            <Image
              src="/images/profile.jpg"
              alt="Tejjas Kaul"
              width={120}
              height={120}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              priority
            />
          </ProfileSection>
          <HeaderContent>
            <Title>Tejjas Kaul</Title>
            <SubtitleText>High School Student & Researcher</SubtitleText>
          </HeaderContent>
        </Header>

        <Section>
          <SectionTitle>About Me</SectionTitle>
          <ContentText>
            I'm passionate about exploring the intersections of neuroscience and design, 
            creating solutions that bridge technology and human experience. Currently, I'm focused on 
            research in applied ethics and developing accessible technology solutions.
          </ContentText>
        </Section>

        <Section>
          <SectionTitle>Current Focus</SectionTitle>
          <FocusGrid>
            {mounted && (
              <>
                <FocusCard>
                  <IconWrapper>🧠</IconWrapper>
                  <CardTitle>Neuroscience</CardTitle>
                  <CardText>Studying brain-computer interfaces and cognitive enhancement</CardText>
                </FocusCard>
                <FocusCard>
                  <IconWrapper>🎨</IconWrapper>
                  <CardTitle>Design</CardTitle>
                  <CardText>Creating accessible and intuitive user experiences</CardText>
                </FocusCard>
                <FocusCard>
                  <IconWrapper>🔬</IconWrapper>
                  <CardTitle>Research</CardTitle>
                  <CardText>Exploring ethical implications of emerging technologies</CardText>
                </FocusCard>
              </>
            )}
          </FocusGrid>
        </Section>

        <Section>
          <SectionTitle>Featured Projects</SectionTitle>
          <ProjectList>
            {mounted && (
              <>
                <ProjectItem>
                  <ProjectLink href="https://applied-ethics.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <ProjectTitle>Duke Applied Ethics+ & NCSSM SRIP</ProjectTitle>
                    <ProjectDescription>Research initiative on ethical implications in technology</ProjectDescription>
                  </ProjectLink>
                </ProjectItem>
                <ProjectItem>
                  <ProjectLink href="https://brailliant.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <ProjectTitle>Brailliant</ProjectTitle>
                    <ProjectDescription>Accessible platform for visual and tactile learning</ProjectDescription>
                  </ProjectLink>
                </ProjectItem>
                <ProjectItem>
                  <ProjectLink href="https://www.tejjaskaul.com/ar-glasses" target="_blank" rel="noopener noreferrer">
                    <ProjectTitle>Smart Vision Glasses</ProjectTitle>
                    <ProjectDescription>AR solution for enhanced visual accessibility</ProjectDescription>
                  </ProjectLink>
                </ProjectItem>
              </>
            )}
          </ProjectList>
        </Section>

        <Footer>
          <SocialList>
            {mounted && (
              <>
                <SocialItem>
                  <SocialLink href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                    Resume
                  </SocialLink>
                </SocialItem>
                <SocialItem>
                  <SocialLink href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </SocialLink>
                </SocialItem>
                <SocialItem>
                  <SocialLink href="https://github.com/tkpepper15" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </SocialLink>
                </SocialItem>
              </>
            )}
          </SocialList>
        </Footer>
      </Container>
    </>
  );
};

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const ProfileSection = styled.div`
  flex-shrink: 0;
`;

const HeaderContent = styled.div``;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`;

const SubtitleText = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray11};
  font-weight: 500;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 1.5rem;
`;

const ContentText = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray11};
`;

const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const FocusCard = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;
`;

const CardText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray11};
  line-height: 1.6;
`;

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProjectItem = styled.li`
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProjectLink = styled.a`
  display: block;
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.gray3};
    transform: translateY(-2px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray11};
  margin: 0;
`;

const Footer = styled.footer`
  margin-top: 6rem;
  text-align: center;
`;

const SocialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialItem = styled.li``;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.gray11};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

export default MePage; 