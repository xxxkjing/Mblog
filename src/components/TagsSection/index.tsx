import React from 'react';
import styled from '@emotion/styled';
import { FiHash, FiX } from 'react-icons/fi';

interface TagsSectionProps {
  tags: { [key: string]: number };
  selectedTag: string | null;
  onTagSelect: (tag: string) => void;
}

const TagsSection: React.FC<TagsSectionProps> = ({ 
  tags, 
  selectedTag, 
  onTagSelect 
}) => {
  return (
    <Container>
      <TagsHeader>
        <HeaderTitle>
          <FiHash />
          <span>Tags</span>
        </HeaderTitle>
        {selectedTag && (
          <ClearButton onClick={() => onTagSelect('')}>
            <FiX />
            <span>Clear</span>
          </ClearButton>
        )}
      </TagsHeader>
      <TagsGrid>
        {Object.entries(tags).map(([tag, count]) => (
          <TagItem
            key={tag}
            isActive={selectedTag === tag}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
            <TagCount>{count}</TagCount>
          </TagItem>
        ))}
      </TagsGrid>
    </Container>
  );
};

const Container = styled.section`
  margin-bottom: 2rem;
`;

const TagsHeader = styled.div`
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

const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagItem = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
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
`;

export default TagsSection; 