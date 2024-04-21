import { NextPage } from "next";
import styled from "@emotion/styled";
import Image from "next/image";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const IndexPage: NextPage = () => {
  return (
    <StyledContainer1>
      <NameAndLinks>
        <div>
          <h2>tejjas kaul</h2>
        </div>
        <LinksContainer>
          <a href="/resume"><FiFile /></a>
          <a href="https://www.linkedin.com/in/yourprofile"><FaLinkedin /></a>
          <a href="https://github.com/yourusername"><FaGithub /></a>
          <a href="https://www.instagram.com/yourprofile"><FaInstagram /></a>
        </LinksContainer>
      </NameAndLinks>
      <Image src="/images/handwave.png" alt="Tejjas Kaul" width={100} height={100} />
    </StyledContainer1>
  );
};

const StyledContainer1 = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const NameAndLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default IndexPage;
