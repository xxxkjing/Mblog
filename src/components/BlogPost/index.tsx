import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Post } from "src/types"
import Image from "next/image"

const BlogPost = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: post } = useQuery<Post>(queryKey.post(slug as string))

  if (!post) return null;

  // Handle Notion date format which might be an object with start_date
  const formatDate = (date: any) => {
    if (!date) return "";
    if (typeof date === 'object' && date.start_date) {
      return new Date(date.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return "";
  };

  return (
    <>
      {post.thumbnail && (
        <ThumbnailBackground>
          <Image
            src={post.thumbnail}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
            quality={90}
          />
          <Overlay />
        </ThumbnailBackground>
      )}
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <Title>{post.title}</Title>
          <Meta>
            <DateText>{formatDate(post.date)}</DateText>
            {post.categories && (
              <Categories>
                {post.categories.map((category: string) => (
                  <Category key={category}>{category}</Category>
                ))}
              </Categories>
            )}
          </Meta>
        </Header>
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </>
  )
}

const ThumbnailBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  z-index: -1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    ${({ theme }) => theme.colors.gray1}
  );
`;

const Container = styled(motion.article)`
  position: relative;
  max-width: 800px;
  margin: 40vh auto 0;
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
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
  color: ${({ theme }) => theme.colors.gray11};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.gray12};
  line-height: 1.8;
  
  h1, h2, h3, h4, h5, h6 {
    margin: 2rem 0 1rem;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 1.5rem;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
  }

  pre {
    background: ${({ theme }) => theme.colors.gray2};
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  code {
    font-family: monospace;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.gray4};
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.gray11};
  }
`;

export default BlogPost; 