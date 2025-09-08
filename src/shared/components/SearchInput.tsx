import React from 'react';
import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps {
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <SearchWrapper>
      <SearchIcon />
      <Input
        type="text"
        placeholder="Search posts..."
        onChange={handleChange}
        value={value || ''}
        spellCheck={false}
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray10};
  width: 1.25rem;
  height: 1.25rem;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  font-size: 0.9375rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 8px;
  background: none;
  color: ${({ theme }) => theme.colors.gray12};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray9};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gray8};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray8};
  }
`;

export default SearchInput;
