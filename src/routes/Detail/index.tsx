import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { CONFIG } from "site.config"
import { NotionRenderer } from "react-notion-x"
import { ExtendedRecordMap } from "notion-types"
import "react-notion-x/src/styles.css"
import { useTheme } from "@emotion/react"

interface PostData {
  id: string
  title: string
  date: { start_date: string }
  createdTime: string
  categories: string[]
  thumbnail?: string
  recordMap: ExtendedRecordMap
}

const Detail = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: post } = useQuery<PostData>(queryKey.post(slug as string))
  const commentsRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  useEffect(() => {
    if (commentsRef.current && CONFIG.utterances?.config) {
      const utterancesEl = document.querySelector('.utterances')
      if (utterancesEl) {
        utterancesEl.remove()
      }

      const scriptEl = document.createElement('script')
      scriptEl.src = 'https://utteranc.es/client.js'
      scriptEl.async = true
      scriptEl.crossOrigin = 'anonymous'
      scriptEl.setAttribute('repo', CONFIG.utterances.config.repo)
      scriptEl.setAttribute('issue-term', CONFIG.utterances.config["issue-term"])
      scriptEl.setAttribute('label', CONFIG.utterances.config.label)
      commentsRef.current.appendChild(scriptEl)
    }
  }, [slug])

  if (!post || !post.recordMap) return null

  return (
    <>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {post.thumbnail && (
          <ThumbnailContainer>
            <Image
              src={post.thumbnail}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority
              quality={90}
            />
          </ThumbnailContainer>
        )}
        <Header>
          <Title>{post.title}</Title>
          <Meta>
            <DateText>
              {new Date(post.date?.start_date || post.createdTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </DateText>
            {post.categories && (
              <Categories>
                {post.categories.map((category: string) => (
                  <Category key={category}>{category}</Category>
                ))}
              </Categories>
            )}
          </Meta>
        </Header>
        <ContentWrapper>
          <NotionRenderer 
            recordMap={post.recordMap} 
            fullPage={false} 
            darkMode={theme.scheme === 'dark'} 
            className="notion"
          />
        </ContentWrapper>
        <CommentsContainer ref={commentsRef} />
      </Container>
    </>
  )
}

const Container = styled(motion.article)`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray1};
  color: ${({ theme }) => theme.colors.gray12};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  margin: -2rem -1.5rem 2rem;
  height: 50vh;
  min-height: 400px;
  max-height: 600px;
  overflow: hidden;

  @media (min-width: 768px) {
    margin: 0 0 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const DateText = styled.time`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.875rem;
`;

const Categories = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Category = styled.span`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray12};
`;

const ContentWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray12};
  line-height: 1.8;
  margin-bottom: 3rem;

  .notion {
    font-family: inherit;
    color: ${({ theme }) => theme.colors.gray12};
    
    h1, h2, h3, h4, h5, h6 {
      margin: 2rem 0 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray12};
    }
    
    p {
      margin-bottom: 1.5rem;
      color: ${({ theme }) => theme.colors.gray12};
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 2rem auto;
      display: block;
      max-width: 100%;
    }

    .notion-image-caption {
      text-align: center;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray11};
      margin-top: 0.5rem;
    }

    pre {
      background: ${({ theme }) => theme.colors.gray3};
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
      color: ${({ theme }) => theme.colors.gray12};
    }

    code {
      font-family: monospace;
      background: ${({ theme }) => theme.colors.gray3};
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
      color: ${({ theme }) => theme.colors.gray12};
    }

    blockquote {
      border-left: 4px solid ${({ theme }) => theme.colors.gray6};
      padding-left: 1rem;
      margin: 1.5rem 0;
      color: ${({ theme }) => theme.colors.gray11};
      font-style: italic;
    }

    ul, ol {
      margin: 1.5rem 0;
      padding-left: 1.5rem;
      color: ${({ theme }) => theme.colors.gray12};
    }

    li {
      margin: 0.5rem 0;
      color: ${({ theme }) => theme.colors.gray12};
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      color: ${({ theme }) => theme.colors.gray12};
    }

    th, td {
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      padding: 0.75rem;
    }

    th {
      background: ${({ theme }) => theme.colors.gray3};
      font-weight: 600;
    }

    a {
      color: ${({ theme }) => theme.colors.blue11};
      text-decoration: underline;
      transition: color 0.2s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.blue9};
      }
    }

    .notion-collection {
      color: ${({ theme }) => theme.colors.gray12};
    }

    .notion-page-link {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 3rem;
`;

export default Detail;
