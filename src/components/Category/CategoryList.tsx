import React from 'react';
import styled from '@emotion/styled';
import { CATEGORIES } from './constants';

interface CategoryListProps {
  selected: string;
  onChange: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ selected, onChange }) => {
  return (
    <Container>
      {CATEGORIES.map((category) => (
        <CategoryButton
          key={category}
          isSelected={selected === category}
          onClick={() => onChange(category)}
          type="button"
        >
          {category}
        </CategoryButton>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: none;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray4 : theme.colors.gray2};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray12 : theme.colors.gray11};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.gray4 : theme.colors.gray3};
  }
`;

export default CategoryList; 