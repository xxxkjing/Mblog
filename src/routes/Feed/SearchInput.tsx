import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <StyledWrapper>
      <div className="mid">
        <input
          className="input-wrapper"
          type="text"
          placeholder="What are you looking for?"
          onChange={handleChange}
          {...props}
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: 0.1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  .mid {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.gray2};
    border-radius: 1rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray4};
  }

  .input-wrapper {
    flex: 1;
    width: 100%;
    padding: 0.5rem;
    border: none;
    outline: none;
    font-size: 1rem;
    border-radius: 0.5rem;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.gray12};
    transition: all 0.2s ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray10};
    }

    &:focus {
      background-color: ${({ theme }) => theme.colors.gray3};
    }
  }
`;

export default SearchInput;
