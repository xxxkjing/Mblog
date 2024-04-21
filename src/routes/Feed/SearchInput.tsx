import styled from "@emotion/styled";
import React, { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="top">
      </div>
      <div className="mid">
        <input
          className="input-wrapper"
          type="text"
          placeholder="What are you looking for?"
          {...props}
        />
      </div>
    </StyledWrapper>
  );
};

export default SearchInput;

const StyledWrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: 0.1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  .top {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }

  .mid {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .input-wrapper {
    flex: 1;
    width: 100%;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: none;
    outline: none;
    font-size: 1rem;
    border-radius: 0.5rem;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }

  input[type="text"]:focus {
    background-color: ${({ theme }) => theme.colors.gray2};
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.gray1};
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;
