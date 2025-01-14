import styled from "@emotion/styled";
import React from "react";

interface CategoryListProps {
  selected: string;
  onChange: (category: string) => void;
  categories?: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  selected, 
  onChange,
  categories = ["All", "Web Development", "Design", "AI/ML", "Research"]  // Default categories
}) => {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem
          key={category}
          isSelected={selected === category}
          onClick={() => onChange(category)}
        >
          {category}
        </CategoryItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0;
  }
`;

const CategoryItem = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  border: 1px solid ${({ theme, isSelected }) => 
    isSelected ? theme.colors.gray8 : theme.colors.gray4};
  background-color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.gray4 : theme.colors.gray2};
  color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.gray12 : theme.colors.gray11};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray3};
    border-color: ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.gray12};
  }

  @media (max-width: 768px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
`;

export default CategoryList; 