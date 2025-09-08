import { useState } from "react"

import SearchInput from "@/shared/components/SearchInput"
import { FeedHeader } from "@/features/blog/components/FeedHeader"
import Footer from "@/shared/components/Footer"
import styled from "@emotion/styled"
import TagList from "./TagList"
import MobileProfileCard from "@/features/profile/components/MobileProfileCard"
import ProfileCard from "@/features/profile/components/ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "@/features/profile/components/ContactCard"
import PostList from "@/features/blog/components/PostList"

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <StyledWrapper>
      <div
        className="lt"
        css={{
          height: "calc(100vh - 73px)",
        }}
      >
        <TagList />
      </div>
      <div className="mid">
        <MobileProfileCard />
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="tags">
          <TagList />
        </div>
        <FeedHeader />
        <PostList q={q} />
        <div className="footer">
          <Footer />
        </div>
      </div>
      <div
        className="rt"
        css={{
          height: "calc(100vh - 73px)",
        }}
      >
        <ProfileCard />
        <ServiceCard />
        <ContactCard />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  display: block;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.5rem;
  padding-top: 2rem;

  @media (min-width: 768px) {
    display: grid;
  }

  > .lt {
    display: none;
    overflow: scroll;
    position: sticky;
    grid-column: span 2 / span 2;
    top: 73px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1024px) {
      display: block;
    }
  }

  > .mid {
    grid-column: span 12 / span 12;

    @media (min-width: 1024px) {
      grid-column: span 7 / span 7;
    }

    > .tags {
      display: block;

      @media (min-width: 1024px) {
        display: none;
      }
    }

    > .footer {
      padding-bottom: 2rem;
      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  > .rt {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    display: none;
    overflow: scroll;
    position: sticky;
    top: 73px;

    @media (min-width: 1024px) {
      display: block;
      grid-column: span 3 / span 3;
    }

    .footer {
      padding-top: 1rem;
    }
  }
`
