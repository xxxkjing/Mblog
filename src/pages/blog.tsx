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

interface PostCardProps {
  post: TPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <PostCardWrapper>
      <StyledLink href={`/${post.slug}`}>
        {post.thumbnail && (
          <ImageWrapper>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
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
          </MetadataContainer>
        </CardBody>
      </StyledLink>
    </PostCardWrapper>
  );
};

const BlogPage: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const { data: posts = [] } = useQuery<TPost[]>(queryKey.posts());
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { categories, tags } = useMemo(() => {
    const uniqueCategories = new Set();
    posts.forEach(post => {
      post.categories?.forEach(category => uniqueCategories.add(category));
    });

    const tagCounts = getAllTags(posts);
    
    return { 
      categories: Array.from(uniqueCategories) as string[],
      tags: tagCounts
    };
  }, [posts]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const filteredPosts = posts?.filter(post => {
    if (!post) return false;
    
    // Search matching
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category matching - show all posts if no categories selected
    const matchesCategory = selectedCategories.length === 0 || 
      (post.categories && post.categories.some(cat => selectedCategories.includes(cat)));
    
    // Tag matching - show all posts if no tags selected
    const matchesTags = selectedTags.length === 0 ||
      (post.tags && post.tags.some(tag => selectedTags.includes(tag)));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const sortedTags = useMemo(() => {
    return Object.entries(tags)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10); // Show only top 10 tags
  }, [tags]);

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
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryClick}
        categories={categories}
        selectedTags={selectedTags}
        onTagChange={handleTagClick}
        tags={sortedTags}
      >
        {!filteredPosts || filteredPosts.length === 0 ? (
          <EmptyState>No posts found</EmptyState>
        ) : (
          <PostGrid>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostGrid>
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
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  height: 100%;
  display: flex;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gray8};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;

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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
`;

const Categories = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Category = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  color: ${({ theme }) => theme.colors.gray11};
  white-space: nowrap;
`;

const FilterSection = styled.div`
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagPill = styled.button<{ isActive: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: ${({ theme, isActive }) => isActive ? theme.colors.gray3 : 'none'};
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.gray8 : theme.colors.gray5};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray7};
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

const MetadataRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PostTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PostTag = styled.button<{ isActive: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: none;
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.gray7 : theme.colors.gray5};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.gray8},
      transparent
    );
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray7};
    color: ${({ theme }) => theme.colors.gray12};

    &:after {
      transform: scaleX(1);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 12px;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.gray7},
      transparent
    );
  }

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

const PostGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PostCardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  height: 100%;
  display: flex;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gray8};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export default BlogPage;