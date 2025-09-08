import React from 'react';
import styled from '@emotion/styled';
import { FiHash, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';

interface Tag {
  name: string;
  count: number;
}

interface TagFilterProps {
  tags: Tag[] | { [key: string]: number };
  selectedTags?: string[];
  onTagSelect?: (tag: string) => void;
  variant?: 'sidebar' | 'inline' | 'grid';
  showHeader?: boolean;
  showCounts?: boolean;
  className?: string;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags = [],
  onTagSelect,
  variant = 'grid',
  showHeader = true,
  showCounts = true,
  className,
}) => {
  const router = useRouter();
  
  // Handle different tag data formats
  const normalizedTags: Tag[] = React.useMemo(() => {
    if (Array.isArray(tags)) {
      return tags;
    }
    return Object.entries(tags).map(([name, count]) => ({ name, count }));
  }, [tags]);

  // Default tag selection handler using router query
  const defaultTagSelect = (tag: string) => {
    const currentTag = router.query.tag as string;
    
    if (currentTag === tag) {
      // Remove tag
      const newQuery = { ...router.query };
      delete newQuery.tag;
      router.push({ query: newQuery });
    } else {
      // Add tag
      router.push({
        query: {
          ...router.query,
          tag: tag,
        },
      });
    }
  };

  const handleTagClick = onTagSelect || defaultTagSelect;
  const currentSelectedTags = selectedTags.length > 0 
    ? selectedTags 
    : (router.query.tag ? [router.query.tag as string] : []);

  const clearAllTags = () => {
    if (onTagSelect) {
      currentSelectedTags.forEach(tag => onTagSelect(''));
    } else {
      const newQuery = { ...router.query };
      delete newQuery.tag;
      router.push({ query: newQuery });
    }
  };

  return (
    <Container className={className} variant={variant}>
      {showHeader && (
        <Header>
          <HeaderTitle>
            <FiHash />
            <span>Tags</span>
          </HeaderTitle>
          {currentSelectedTags.length > 0 && (
            <ClearButton onClick={clearAllTags}>
              <FiX />
              <span>Clear</span>
            </ClearButton>
          )}
        </Header>
      )}
      
      <TagContainer variant={variant}>
        {normalizedTags.map(({ name, count }) => {
          const isActive = currentSelectedTags.includes(name);
          
          return (
            <TagButton
              key={name}
              isActive={isActive}
              variant={variant}
              onClick={() => handleTagClick(name)}
            >
              {name}
              {showCounts && <TagCount>{count}</TagCount>}
            </TagButton>
          );
        })}
      </TagContainer>
    </Container>
  );
};

const Container = styled.div<{ variant: string }>`
  ${({ variant }) => variant === 'sidebar' && `
    margin-bottom: 1rem;
  `}
  
  ${({ variant }) => variant === 'inline' && `
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  `}
  
  ${({ variant }) => variant === 'grid' && `
    margin-bottom: 2rem;
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const HeaderTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray12};
  font-weight: 500;
  margin: 0;

  svg {
    color: ${({ theme }) => theme.colors.gray11};
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  background: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

const TagContainer = styled.div<{ variant: string }>`
  ${({ variant }) => variant === 'sidebar' && `
    display: block;
    
    @media (max-width: 1023px) {
      display: flex;
      gap: 0.25rem;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
  `}
  
  ${({ variant }) => variant === 'inline' && `
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  `}
  
  ${({ variant }) => variant === 'grid' && `
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  `}
`;

const TagButton = styled.button<{ isActive: boolean; variant: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.blue7 : theme.colors.gray4};
  background: ${({ theme, isActive }) => 
    isActive ? theme.colors.blue4 : theme.colors.gray2};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.blue11 : theme.colors.gray11};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${({ variant }) => variant === 'sidebar' && `
    width: 100%;
    justify-content: flex-start;
    padding: 0.375rem 1rem;
    margin-bottom: 0.25rem;
    border-radius: 0.75rem;
    
    @media (max-width: 1023px) {
      width: auto;
      margin-bottom: 0;
    }
  `}
  
  ${({ variant }) => variant === 'inline' && `
    padding: 0.25rem 0.75rem;
  `}
  
  ${({ variant }) => variant === 'grid' && `
    padding: 0.375rem 0.75rem;
  `}

  &:hover {
    background: ${({ theme, isActive }) => 
      isActive ? theme.colors.blue5 : theme.colors.gray3};
    border-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.blue8 : theme.colors.gray5};
    color: ${({ theme, isActive }) => 
      isActive ? theme.colors.blue11 : theme.colors.gray12};
  }
`;

const TagCount = styled.span`
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
  font-weight: 500;
`;

export default TagFilter;