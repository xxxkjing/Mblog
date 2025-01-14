import { TPosts } from "src/types"

type SelectableKeys = keyof Pick<TPosts[0], 'tags' | 'categories'>;

export function getAllSelectItemsFromPosts(
  key: SelectableKeys,
  posts: TPosts
) {
  const selectedPosts = posts.filter((post) => post?.[key])
  const items = [...selectedPosts.map((p) => p[key]).flat()]
  const itemObj: { [itemName: string]: number } = {}
  items.forEach((item) => {
    if (!item) return
    if (item in itemObj) {
      itemObj[item]++
    } else {
      itemObj[item] = 1
    }
  })
  return itemObj
}
