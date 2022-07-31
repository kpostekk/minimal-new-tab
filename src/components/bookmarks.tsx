import { useQuery } from "@tanstack/react-query"
import { UserLink } from "./userlink"

async function getBookmarks() {
  const allBookmarks = await chrome.bookmarks.getSubTree("1")
  const localBookmarks = (allBookmarks[0].children ?? []).filter(
    (x) => x.children === undefined
  )
  return localBookmarks
}

export function Bookmarks() {
  const bookmarksQuery = useQuery(["bookmarks"], getBookmarks)

  return (
    <div className={"flex justify-center flex-wrap gap-4 pt-2"}>
      {bookmarksQuery.data &&
        bookmarksQuery.data
          .filter((x) => x.children === undefined)
          .map((bookmark, i) => (
            <UserLink key={i} name={bookmark.title} href={bookmark.url} />
          ))}
    </div>
  )
}
