import { NextPageWithLayout } from "../types"
import MetaConfig from "src/components/MetaConfig"
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CONFIG } from "site.config";
import { useState, useEffect } from 'react';
import TagsSection from 'src/components/TagsSection';

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

const WorkPage: NextPageWithLayout = () => {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique tags and their counts
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
    description: "A curated collection of projects at the intersection of technology, healthcare, and social impact.",
    type: "website",
    url: `${CONFIG.link}/me`,
  };

  if (!mounted) return null;

  return (
    <>
      <MetaConfig {...meta} />
      <Container>
        <Title>Me</Title>
        <Description>
          A curated collection of projects at the intersection of technology, healthcare, and social impact
        </Description>
        
        <TagsSection 
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={handleTagClick}
        />

        <ProjectGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CardContent>
                {mounted && (
                  <ImageWrapper>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      priority={index < 2}
                    />
                  </ImageWrapper>
                )}
                <CardBody>
                  <ProjectDate suppressHydrationWarning>
                    {project.date}
                  </ProjectDate>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <Tags>
                    {project.tags.map(tag => (
                      <Tag 
                        key={tag}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleTagClick(tag);
                        }}
                        isActive={selectedTag === tag}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Tags>
                  <Links>
                    <LinkButton href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </LinkButton>
                    {project.demoLink && (
                      <LinkButton 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="demo"
                      >
                        Watch Demo
                      </LinkButton>
                    )}
                  </Links>
                </CardBody>
              </CardContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </>
  );
};

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.75rem;
  text-align: center;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray11};
  max-width: 600px;
  margin: 0 auto 3rem;
  text-align: center;
  line-height: 1.6;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

  @media (max-width: 768px) {
    gap: 0;
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)`
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
  }
`;

const CardContent = styled.div`
  color: inherit;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray3};

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProjectDate = styled.time`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray10};
  display: block;
  margin-bottom: 0.75rem;
`;

const ProjectTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
`;

const ProjectDescription = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.gray11};
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

const Tag = styled.span<{ isActive?: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.blue5 : theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue11};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue4};
  }
`;

const Links = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue11};

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
  }

  &.demo {
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
    }
  }
`;

export default WorkPage; 