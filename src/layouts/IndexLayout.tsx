import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram, FaChevronLeft, FaChevronRight, FaArrowDown } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { keyframes } from '@emotion/react';

type LayoutProps = {
  children: ReactNode;
};

const IndexLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <FaChevronRight />,
    prevArrow: <FaChevronLeft />,
    centerMode: false, // Default to false
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true, // Enable center mode on tablets and smaller screens
          arrows: false, // Hide arrows on mobile
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode on mobile screens
          arrows: false, // Hide arrows on mobile
          centerPadding: '25px', // Adjust padding for mobile screens
        }
      }
    ]
  };

  return (
    <Container>
      {isClient && isIndexPage && (
        <Header>
          <ImageContainer>
            <Image
              src="/images/handwave.png"
              alt="Tejjas Kaul"
              width={200}
              height={200}
            />
            <AboutMe>
              <p>Hi, I'm <strong>Tejjas Kaul</strong>, a high school student keen on exploring neurotech, public health, and design. Check out my <LinkStyle href="/blog">blog</LinkStyle> and connect with me!</p>
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
      <Main>
        <Container>
          <Heading>Relevant Work <BouncingArrow /></Heading>
          {isClient && (
            <Carousel {...settings}>
              <MyProjects>
                <ProjectContent href="https://applied-ethics.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <StyledLink>Duke Applied Ethics+ & NCSSM SRIP</StyledLink>
                  <RoundedImage
                    src="/images/dukeappliedethics.png"
                    alt="Duke Applied Ethics+ Project"
                    width={500}
                    height={300}
                  />
                  <p>Case Study Analysis, UI/UX, Video Editing, Web Design</p>
                  <DateText>May - July 2024</DateText>
                </ProjectContent>
              </MyProjects>
              <MyProjects>
                <ProjectContent href="https://drive.google.com/file/d/10IFe0ovxQgVi8ZPEvog8hrw5WO1sEgcC/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <StyledLink>Neuroethics Scientific Essay (NCSSM)</StyledLink>
                <RoundedImage
                    src="/images/neuroethicsessay.png"
                    alt="Neuroethics Essay"
                    width={200}
                    height={200}
                  />
                  <p>Literature Review, Scientific Writing, Analytical Research</p>
                  <DateText>April 2024</DateText>
                </ProjectContent>
              </MyProjects>
              <MyProjects>
                <ProjectContent  href="https://yci-website-enterprise.vercel.app/" target="_blank" rel="noopener noreferrer">
                <StyledLink>Youth Climate Initiative Website</StyledLink>
                <RoundedImage
                    src="/images/yci.png"
                    alt="YCI"
                    width={200}
                    height={200}
                  />
                  <p>Web Design, Climate Change, UI/UX, Fundraising</p>
                  <DateText>May 2024 - Present</DateText>
                </ProjectContent>
              </MyProjects>
              <MyProjects>
                <ProjectContent  href="https://www.tejjaskaul.com/moodflip" target="_blank" rel="noopener noreferrer">
                <StyledLink>MoodFlip: Gauging Emotions from Selfies</StyledLink>
                <RoundedImage
                    src="/images/moodflip.png"
                    alt="Moodflip"
                    width={200}
                    height={200}
                  />
                  <p>UI/UX, AI/ML, Mobile App Development, Web Design</p>
                  <DateText>September 2023</DateText>
                </ProjectContent>
              </MyProjects>
              <MyProjects>
                <ProjectContent  href="https://tkpepper15.github.io/neuro-midterm/" target="_blank" rel="noopener noreferrer">
                <StyledLink>Neuro-Ophthalmology Guide (NCSSM)</StyledLink>
                <RoundedImage
                    src="/images/neuro-ophthalmology.png"
                    alt="Neuro-Ophthalmology Guide"
                    width={200}
                    height={200}
                  />
                  <p>Scientific Writing, Analytical Research, Web Design, Neuroanatomy</p>
                  <DateText>March 2024</DateText>
                </ProjectContent>
              </MyProjects>
              <MyProjects>
                <ProjectContent  href="https://www.tejjaskaul.com/ar-glasses" target="_blank" rel="noopener noreferrer">
                <StyledLink>Smart Vision Glasses for the Elderly</StyledLink>
                <RoundedImage
                    src="/images/smartglasses.png"
                    alt="Smart Glasses"
                    width={200}
                    height={200}
                  />
                  <p>AI/ML, UI/UX, Engaging with Professionals, Collaborative Discovery</p>
                  <DateText>December 2023 - Present</DateText>
                </ProjectContent>
              </MyProjects>
            </Carousel>
          )}
        </Container>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0; // Remove padding to ensure edge-to-edge design
  margin: 0; // Remove margin
`;

const Header = styled.header`
  max-width: 100%; // Ensure full width
  margin: 0 auto;
  padding: .5rem; // Adjust padding for better mobile view
  text-align: center;

  @media (min-width: 768px) {
    max-width: 60%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoundedImage = styled(Image)`
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  height: auto;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray1};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  position: static; // Update position for better mobile positioning
  margin-top: 10px;
`;

const MyProjects = styled.div`
  display: flex;
  padding: 1rem;
  width: 90%;
  max-width: 350px; // Ensure the width is not too large on smaller screens
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  background: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray1};
  transition: background 0.3s ease, color 0.3s ease;
  align-items: center;

  &:hover {
    background: black;
    color: white;
  }
`;

const ProjectContent = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: underline;
  font-size: 1.5rem; // Reduce font size on smaller screens
  color: inherit;
  text-align: center; // Center the text
  margin-bottom: 1rem;
`;


const LinkStyle = styled.a`
  color: gray;
`;

const Heading = styled.h2`
  font-size: 1.5rem; // Reduce font size on smaller screens
  line-height: 2.25rem; // Adjust line height
  font-weight: 400;
  margin: 1rem 0; // Add margin for spacing
  text-align: center;
`;

const AboutMe = styled.div`
  display: flex;
  padding: .5rem; // Increase padding for better touch targets
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray1};
`;

const Main = styled.main`
  flex: 1;
`;

const Carousel = styled(Slider)`
  width: 100%; // Ensure full width on smaller screens

  .slick-slide {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  .slick-prev, .slick-next {
    color: ${({ theme }) => theme.scheme === "light" ? "black" : "white"};
    margin: .5rem;
  }

  .slick-prev:before, .slick-next:before {
    font-family: 'FontAwesome';
  }

  .slick-dots li button:before {
    color: ${({ theme }) => theme.scheme === "light" ? "black" : "white"};
  }

  // Hide arrows on mobile
  @media (max-width: 600px) {
    .slick-prev, .slick-next {
      display: none;
    }
  }
`;

const DateText = styled.span`
  color: gray;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const BouncingArrow = styled(FaArrowDown)`
  animation: ${bounce} 2s infinite;
`;

export default IndexLayout;
