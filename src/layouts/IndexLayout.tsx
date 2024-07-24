import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { FiFile, FiLink } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type LayoutProps = {
  children: ReactNode;
};

const IndexLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  useEffect(() => {
    console.log("Current Path:", router.pathname);
  }, [router.pathname]);

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
      {isIndexPage && (
        <Header>
          <ImageContainer>
            <Image
              src="/images/handwave.png"
              alt="Tejjas Kaul"
              width={200}
              height={200}
            />
            <AboutMe>
              <p>
                Hi, I'm <strong>Tejjas Kaul</strong>! I'm a high schooler who is keen on exploring neurotech, public health, and design. Check out the{" "}
                <LinkStyle href="/blog">blog</LinkStyle> and the links below to stay updated:
              </p>
            </AboutMe>
            <SocialLinks>
              <a
                href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFile />
              </a>
              <a
                href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/tkpepper15"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/tejjaskphoto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </SocialLinks>
          </ImageContainer>
        </Header>
      )}
      <Main>
        <CarouselContainer>
          <Heading>Relevant Projects</Heading>
          <Carousel {...settings}>
            
            <MyProjects
              href="https://applied-ethics.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLink>Duke Applied Ethics+ & NCSSM SRIP</StyledLink>
              <RoundedImageContainer>
                <RoundedImage
                  src="/images/dukeappliedethics.png"
                  alt="Duke Applied Ethics+ Project"
                  width={350}
                  height={150}
                />
              </RoundedImageContainer>
              <p>Case Study Analysis, User Research, Video Editing, WebDev</p>
              <DateText>June 2024</DateText>
            </MyProjects>

            <MyProjects
              href="https://drive.google.com/file/d/10IFe0ovxQgVi8ZPEvog8hrw5WO1sEgcC/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLink>Neuroethics Scientific Essay</StyledLink>
              <RoundedImageContainer>
                <BlankRoundedImage />
              </RoundedImageContainer>
              <DateText>May 2024</DateText>
            </MyProjects>
            <MyProjects
              href="https://tkpepper15.github.io/neuro-midterm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLink>Neuro-Ophthalmology Guide</StyledLink>
              <RoundedImageContainer>
                <BlankRoundedImage />
              </RoundedImageContainer>
              <DateText>April 2024</DateText>
            </MyProjects>
            <MyProjects
              href="https://yci-website-enterprise.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLink>Youth Climate Initiative Website</StyledLink>
              <RoundedImageContainer>
                <BlankRoundedImage />
              </RoundedImageContainer>
              <DateText>March 2024</DateText>
            </MyProjects>
          </Carousel>
        </CarouselContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

const Header = styled.header`
  max-width: 100%;
  margin: 0 auto;
  padding: 0.5rem;
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoundedImageContainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const RoundedImage = styled(Image)`
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  height: auto;
`;

const BlankRoundedImage = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  height: 200px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  background-color: ${({ theme }) => (theme.scheme === "light" ? "white" : theme.colors.gray1)};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const MyProjects = styled.a`
  display: flex;
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  background: ${({ theme }) => (theme.scheme === "light" ? "white" : theme.colors.gray1)};
  transition: background 0.3s ease, color 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: black;
    color: white;
  }
`;

const StyledLink = styled.span`
  font-weight: bold;
  text-decoration: underline;
  font-size: 1.5rem;
  color: inherit;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const LinkStyle = styled.a`
  color: gray;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 700;
  margin: 1rem 0;
  text-align: center;
`;

const AboutMe = styled.div`
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => (theme.scheme === "light" ? "white" : theme.colors.gray1)};
`;

const Main = styled.main`
  flex: 1;
`;

const CarouselContainer = styled.div`
  width: 100%;

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const Carousel = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    padding: 0 2rem;
    margin-bottom: 1rem;
  }

  .slick-prev,
  .slick-next {
    color: ${({ theme }) => (theme.scheme === "light" ? "black" : "white")};
  }

  .slick-prev:before,
  .slick-next:before {
    font-family: 'FontAwesome';
  }

  .slick-dots li button:before {
    color: ${({ theme }) => (theme.scheme === "light" ? "black" : "white")};
  }

  @media (max-width: 600px) {
    .slick-prev,
    .slick-next {
      display: none;
    }
  }
`;
const DateText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => (theme.scheme === "light" ? "#555" : "#ccc")};
`;

export default IndexLayout;
