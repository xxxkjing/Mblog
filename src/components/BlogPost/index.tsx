import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { TPost } from "src/types"
import Image from "next/image"

interface BlogPostProps {
  post: TPost
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const router = useRouter()

  return (
    <Article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/${post.slug}`} passHref>
        <PostLink>
          {post.thumbnail && (
            <ImageContainer>
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                style={{ 
                  objectFit: 'cover',
                }}
              />
            </ImageContainer>
          )}
          <Content>
            <PostDate>
              {new Date(post.date?.start_date || post.createdTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </PostDate>
            <Title>{post.title}</Title>
            <Description>{post.description}</Description>
            {post.categories && post.categories.length > 0 && (
              <Categories>
                {post.categories.map(category => (
                  <Category key={category}>{category}</Category>
                ))}
              </Categories>
            )}
          </Content>
        </PostLink>
      </Link>
    </Article>
  )
}

const Article = styled(motion.article)`
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    border-radius: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) => theme.colors.gray3};
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
  }
`;

const PostLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray3};

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const Content = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PostDate = styled.time`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray10};
  display: block;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.gray11};
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

const Categories = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }
`;

const Category = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.6875rem;
    padding: 0.2rem 0.625rem;
  }
`;

export default BlogPost; 