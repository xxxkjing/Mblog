
// src/layouts/indexLayout.tsx
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { FiFile } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

type LayoutProps = {
  children: ReactNode;
};

const indexLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  useEffect(() => {
    console.log("Current Path:", router.pathname);
  }, [router.pathname]);

  return (
    <Container>
      {isIndexPage && (
        <Header>
          <NameAndLinks>
            <div>
              <h2>tejjas kaul</h2>
            </div>
            <LinksContainer>
              <a href="https://docs.google.com/document/d/1SVg5OicX0dVmVkmRItPTlU5I_I7bLPGrKWgzEr2HdlA/edit?usp=sharing"><FiFile /></a>
              <a href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/"><FaLinkedin /></a>
              <a href="https://github.com/tkpepper15"><FaGithub /></a>
              <a href="https://www.instagram.com/tejjaskphoto/"><FaInstagram /></a>
            </LinksContainer>
          </NameAndLinks>
          <Image src="/images/handwave.png" alt="Tejjas Kaul" width={100} height={100} />
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

const NameAndLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Main = styled.main`
  flex: 1;
`;

export default indexLayout;
