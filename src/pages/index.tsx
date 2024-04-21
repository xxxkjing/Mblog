// index.tsx

import React from "react";
import { NextPage } from "next";
import styled from "@emotion/styled";

const IndexPage: NextPage = () => {
  return (
    <StyledContainer>
      <h1>Tejjas Kaul</h1>
      <p>Seeking opportunities for hands-on research in neuroscience and technology.</p>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export default IndexPage;
