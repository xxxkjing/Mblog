import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import BlogLayout from 'src/layouts/BlogLayout';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const BlogPage: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mounted, setMounted] = useState(false);
  
  const { data: posts } = useQuery(queryKey.posts());
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPosts = posts?.filter(post => {
    if (!post) return false;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      (post.categories && post.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  if (!mounted) return null;

  return (
    <>
      <MetaConfig {...meta} />
      <BlogLayout 
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      >
        {!filteredPosts || filteredPosts.length === 0 ? (
          <EmptyState>
            <EmptyText>No posts found</EmptyText>
            <EmptyDescription>
              Try adjusting your search or filter criteria
            </EmptyDescription>
          </EmptyState>
        ) : (
          <BlogGrid>
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/${post.slug}`} passHref>
                  <CardContent>
                    <PostDate>
                      {new Date(post.date?.start_date || post.createdTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </PostDate>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDescription>{post.description}</PostDescription>
                    {post.categories && post.categories.length > 0 && (
                      <TagContainer>
                        {post.categories.map(category => (
                          <Tag key={category}>{category}</Tag>
                        ))}
                      </TagContainer>
                    )}
                  </CardContent>
                </Link>
              </BlogCard>
            ))}
          </BlogGrid>
        )}
      </BlogLayout>
    </>
  );
};

const BlogGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.article)`
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`;

const CardContent = styled.a`
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  height: 100%;
`;

const PostDate = styled.time`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray10};
  display: block;
  margin-bottom: 0.75rem;
`;

const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
`;

const PostDescription = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.gray11};
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
  transition: all 0.2s ease;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
`;

const EmptyText = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.9375rem;
`;

export default BlogPage;
