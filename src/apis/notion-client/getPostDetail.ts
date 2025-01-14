import { getPosts } from "./getPosts"
import { getRecordMap } from "./getRecordMap"
import { filterPosts } from "src/libs/utils/notion"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getPostDetail = async (slug: string) => {
  const posts = await getPosts()
  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t) => t.slug === slug)
  
  if (!postDetail?.id) {
    throw new Error(`No post found for slug: ${slug}`)
  }

  const recordMap = await getRecordMap(postDetail.id)
  
  return {
    ...postDetail,
    recordMap,
  }
} 