import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { NotionRenderer } from "react-notion-x"
import "react-notion-x/src/styles.css"
import { useTheme } from "@emotion/react"
import { TPost } from "src/types"

const Detail = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: post } = useQuery<TPost>(queryKey.post(slug as string))
  const theme = useTheme()

  if (!post) return null

  const postDate = new Date(post.date?.start_date || post.createdTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header>
        <PostDate>{postDate}</PostDate>
        <Title>{post.title}</Title>
        {post.categories && post.categories.length > 0 && (
          <Categories>
            {post.categories.map(category => (
              <Category key={category}>{category}</Category>
            ))}
          </Categories>
        )}
      </Header>
      <Content>
        <NotionRenderer 
          recordMap={post.recordMap} 
          fullPage={false} 
          darkMode={theme.scheme === 'dark'}
        />
      </Content>
    </Container>
  )
}

const Container = styled(motion.article)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 1rem 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PostDate = styled.time`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray11};
`;

const Categories = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Category = styled.span`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.gray12};
  line-height: 1.8;

  .notion {
    font-family: inherit;
    
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
      border-radius: 8px;
      margin: 2rem auto;
    }

    pre {
      background: ${({ theme }) => theme.colors.gray3};
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    code {
      font-family: monospace;
      background: ${({ theme }) => theme.colors.gray3};
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
    }
  }
`;

export default Detail;
