import { CONFIG } from "../../site.config"
import { NextPageWithLayout, TPost } from "../types"
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
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTags } from "src/libs/utils/notion/getAllTags";
import TagsSection from 'src/components/TagsSection';

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
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  
  const { data: posts = [] } = useQuery<TPost[]>(queryKey.posts());
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique categories and tags from posts
  const { categories, tags } = useMemo(() => {
    const uniqueCategories = new Set(['All']);
    posts.forEach(post => {
      post.categories?.forEach(category => uniqueCategories.add(category));
    });

    const tagCounts = getAllTags(posts);
    
    return { 
      categories: Array.from(uniqueCategories),
      tags: tagCounts
    };
  }, [posts]);

  const filteredPosts = posts?.filter(post => {
    if (!post) return false;
    
    // Search matching
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category matching
    const matchesCategory = selectedCategory === 'All' || 
      (post.categories && post.categories.includes(selectedCategory));
    
    // Tag matching
    const matchesTag = !selectedTag || 
      (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag || tag === '') {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
  };

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
        categories={categories}
      >
        <TagsSection 
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={handleTagClick}
        />
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
                    {post.thumbnail && (
                      <ImageWrapper>
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          priority={index < 2}
                        />
                      </ImageWrapper>
                    )}
                    <CardBody>
                      <PostDate>
                        {new Date(post.date?.start_date || post.createdTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </PostDate>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDescription>{post.description}</PostDescription>
                      <MetadataContainer>
                        {post.categories && post.categories.length > 0 && (
                          <Categories>
                            {post.categories.map(category => (
                              <Category key={category}>{category}</Category>
                            ))}
                          </Categories>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <Tags>
                            {post.tags.map(tag => (
                              <Tag 
                                key={tag}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleTagClick(tag);
                                }}
                                isActive={selectedTag === tag}
                              >
                                {tag}
                              </Tag>
                            ))}
                          </Tags>
                        )}
                      </MetadataContainer>
                    </CardBody>
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

const FilterBar = styled.div`
  margin-bottom: 1.5rem;
  min-height: 40px;
`;

const BlogGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gray6};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.gray4};
  }
`;

const CardContent = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray3};

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
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

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Categories = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Category = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
  white-space: nowrap;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ isActive?: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.blue5 : theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue11};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue4};
  }
`;

const ActiveTag = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.blue5};
  color: ${({ theme }) => theme.colors.blue11};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue6};
  }
`;

const CloseIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

const EmptyText = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const EmptyDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.9375rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export default BlogPage;
