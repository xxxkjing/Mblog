import { GetStaticPaths, GetStaticProps } from "next"
import { CONFIG } from "../../../site.config"
import { getPost, getPosts } from "../../apis"
import { NextPageWithLayout } from "../../types"
import { queryClient } from "../../libs/react-query"
import { queryKey } from "../../constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "../../libs/utils/notion"
import BlogPost from "src/components/BlogPost"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  
  try {
    const post = await getPost(slug)
    await queryClient.prefetchQuery(queryKey.post(slug), () => post)

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: CONFIG.revalidateTime,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

const PostPage: NextPageWithLayout = () => {
  return <BlogPost />
}

export default PostPage 