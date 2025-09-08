import { CONFIG } from "site.config"
import React from "react"
import {
  AiOutlineMail,
} from "react-icons/ai"
import styled from "@emotion/styled"

const ContactCard: React.FC = () => {
  return (
    <>
      <StyledTitle></StyledTitle>
      <StyledWrapper>
        {CONFIG.profile.linkedin && (
          <a
            href="https://www.linkedin.com/in/tejjas-kaul-36091a22b/"
            rel="noreferrer"
            target="_blank"
          >
        <img src="/images/linkedin.png" alt="LinkedIn" className="icon" />
            <div className="name">linkedin</div>
          </a>
        )}
        {CONFIG.profile.github && (
          <a
            href="https://github.com/tkpepper15"
            rel="noreferrer"
            target="_blank"
          >
            <img src="/images/github.png" alt="GitHub" className="icon" />
            <div className="name">github</div>
          </a>
        )}
        {CONFIG.profile.instagram && (
          <a
            href={`https://www.instagram.com/${CONFIG.profile.instagram}`}
            rel="noreferrer"
            target="_blank"
          >
            <img src="/images/instagram.png" alt="Instagram" className="icon" />
            <div className="name">instagram</div>
          </a>
        )}
        {CONFIG.profile.email && (
          <a
            href={`mailto:${CONFIG.profile.email}`}
            rel="noreferrer"
            target="_blank"
            css={{ overflow: "hidden" }}
          >
            <AiOutlineMail className="icon" />
            <div className="name">email</div>
          </a>
        )}
      </StyledWrapper>
    </>
  )
}

export default ContactCard

const StyledTitle = styled.div`

`
const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  a {
    display: flex;
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`
