import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import SearchInput from 'src/routes/Feed/SearchInput';
import CategoryList from 'src/components/Category/CategoryList';

type BlogLayoutProps = {
  children: React.ReactNode;
  onSearch?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  categories?: string[];
};

interface SearchInputProps {
  onSearch?: (value: string) => void;
}

interface CategoryListProps {
  selected: string;
  onChange: (category: string) => void;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ 
  children, 
  onSearch,
  selectedCategory = 'All',
  onCategoryChange = () => {},
  categories
}) => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Thoughts & Notes</Title>
          <Description>
            Exploring the intersections of technology, design, and neuroscience
          </Description>
        </HeaderContent>
        <FilterSection>
          <SearchContainer>
            <SearchInput onSearch={onSearch} />
          </SearchContainer>

        </FilterSection>
      </Header>
      <Main>
        <ContentWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </ContentWrapper>
      </Main>
      <Footer>
        <FooterContent>
          <Copyright>© {new Date().getFullYear()} Tejjas Kaul. All rights reserved.</Copyright>
          <Attribution>
            Forked from <a href="https://github.com/morethanmin/morethan-log" target="_blank" rel="noopener noreferrer">morethan-log</a>
          </Attribution>
        </FooterContent>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Header = styled.header`
  padding: 4rem 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.gray1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

  @media (max-width: 768px) {
    padding: 2rem 1rem 1.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const FilterSection = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray11};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  margin: 0 auto 1.5rem;
`;

const CategoryContainer = styled.div`
  margin: 0 auto;
  padding: 0.5rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.gray1};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const ContentWrapper = styled(motion.div)``;

const Footer = styled.footer`
  padding: 2rem 1.5rem;
  background: ${({ theme }) => theme.colors.gray1};
  border-top: 1px solid ${({ theme }) => theme.colors.gray4};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray11};
`;

const Attribution = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray11};
  
  a {
    color: ${({ theme }) => theme.colors.gray12};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.blue11};
    }
  }
`;

export default BlogLayout; 