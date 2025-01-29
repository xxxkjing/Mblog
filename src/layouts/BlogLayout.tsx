import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import SearchInput from 'src/routes/Feed/SearchInput';

type BlogLayoutProps = {
  children: ReactNode;
  onSearch: (query: string) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  categories: string[];
  selectedTags?: string[];
  onTagChange?: (tag: string) => void;
  tags?: Array<[string, number]>;
};

const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  onSearch,
  selectedCategories,
  onCategoryChange,
  categories,
  selectedTags = [],
  onTagChange,
  tags = [],
}) => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <SearchWrapper>
            <SearchInput onSearch={onSearch} />
          </SearchWrapper>
          <FilterGroups>
            <Categories>
              {categories.filter(cat => cat !== 'All').map((category) => (
                <CategoryButton
                  key={category}
                  isActive={selectedCategories.includes(category)}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </Categories>
            <TagsSection>
              {tags.map(([tag]) => (
                <TagButton
                  key={tag}
                  isActive={selectedTags.includes(tag)}
                  onClick={() => onTagChange?.(tag)}
                >
                  {tag}
                </TagButton>
              ))}
            </TagsSection>
          </FilterGroups>
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
      </Container>
      <Footer>
        <FooterContent>
          <Copyright>© {new Date().getFullYear()} Tejjas Kaul. All rights reserved.</Copyright>
          <Attribution>
            Forked from <a href="https://github.com/morethanmin/morethan-log" target="_blank" rel="noopener noreferrer">morethan-log</a>
          </Attribution>
        </FooterContent>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const SearchWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Categories = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.gray8 : theme.colors.gray6};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray8};
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

const Main = styled.main`
  width: 100%;
`;

const ContentWrapper = styled(motion.div)``;

const Footer = styled.footer`
  padding: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};
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

const TagsSection = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
`;

const TagButton = styled.button<{ isActive: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: ${({ theme, isActive }) => isActive ? theme.colors.gray3 : 'none'};
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.gray8 : theme.colors.gray5};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray7};
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

export default BlogLayout; 