import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, filter)

  return {
    paths: filteredPost.map((row) => `/${row.slug}`),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  
  try {
    const posts = await getPosts()
    const feedPosts = filterPosts(posts)
    await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

    const detailPosts = filterPosts(posts, filter)
    const postDetail = detailPosts.find((t) => t.slug === slug)
    const recordMap = await getRecordMap(postDetail?.id!)
    
    await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
      ...postDetail,
      recordMap,
    }))

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

const DetailPage: NextPageWithLayout = () => {
  return <Detail />
}

export default DetailPage
