import { useState } from "react"
import reactLogo from "./assets/react.svg"
import { useQuery } from "@tanstack/react-query"
import "./App.css"
import { niceText } from "./assets/niceText.json"
import { userLinks } from "./assets/links.json"
import ky from "ky"
import { useEffectOnce } from 'usehooks-ts'

function RandomNiceText() {
  const [text, setText] = useState('')
  useEffectOnce(() => {
    setText(niceText[Math.floor(Math.random() * niceText.length)])
  })

  return <h2 className={"text-center"}>{text}</h2>
}

type UserLinkProps = {
  name: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

function UserLink(props: UserLinkProps) {
  const safeName =
    props.name.length > 24 ? props.name.slice(0, 24) + "..." : props.name

  return (
    <a {...props} className={"hover:underline-offset-1 hover:underline"}>
      {safeName}
    </a>
  )
}

function Separator() {
  return <hr className={"border-slate-800 my-4 mx-10"} />
}

type YourFuckingIp = {
  YourFuckingIPAddress: string
  YourFuckingLocation: string
}

async function getIp() {
  return await ky.get("https://myip.wtf/json").json<YourFuckingIp>()
}

function App() {
  const ipQuery = useQuery(["ip"], getIp)
  const bookmarksQuery = useQuery(["bookmarks"], () =>
    chrome.bookmarks.getSubTree("1").then((tree) => tree[0].children)
  )

  return (
    <div
      className={
        "grid place-items-center mx-auto bg-slate-800 text-slate-300 h-screen w-screen"
      }
    >
      <div
        className={"bg-slate-300 text-slate-800 p-8 rounded text-center"}
        style={{ width: "690px" }}
      >
        <RandomNiceText />
        {ipQuery.data && (
          <p className={"mt-2"}>
            <span className={"font-extrabold"}>Your IP is:</span>{" "}
            {ipQuery.data.YourFuckingIPAddress} at{" "}
            {ipQuery.data.YourFuckingLocation}
          </p>
        )}
        <div
          className={"flex justify-center flex-wrap gap-3 pt-2"}
          style={{ color: "#a82927" }}
        >
          {userLinks.map(({ name, url }, i) => (
            <UserLink key={i} name={name} href={url} />
          ))}
        </div>
        <Separator />
        <div className={"flex justify-around flex-wrap gap-3 pt-2"}>
          {bookmarksQuery.data &&
            bookmarksQuery.data
              .filter((x) => x.children === undefined)
              .map((bookmark, i) => (
                <UserLink key={i} name={bookmark.title} href={bookmark.url} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default App
