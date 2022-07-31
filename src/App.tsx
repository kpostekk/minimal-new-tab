import { useQuery } from "@tanstack/react-query"
import "./App.css"
import {
  Bookmarks,
  RandomNiceText,
  RandomNumber,
  ReallyRandomString,
  SmallClock,
  UserIP,
} from "./components"
import { PredefinedLinks } from "./components/userlink"

function Separator() {
  return <hr className={"border-slate-800 my-4 mx-10"} />
}

function App() {
  return (
    <div
      className={
        "flex flex-col gap-2 conten justify-center bg-slate-800 text-slate-300 h-screen w-screen"
      }
    >
      <div
        className={
          "mx-auto max-w-2xl bg-slate-300 text-slate-800 p-8 rounded text-center"
        }
      >
        <RandomNiceText />
        <PredefinedLinks />
        {!!chrome.bookmarks && (
          <>
            <Separator />
            <Bookmarks />
          </>
        )}
      </div>
      <div
        className={
          "mx-auto max-w-2xl flex flex-wrap flex-row justify-center gap-2"
        }
      >
        <div className={"bg-slate-300 text-slate-800 p-4 rounded"}>
          <SmallClock />
        </div>
        <div className={" bg-slate-300 text-slate-800 p-4 rounded"}>
          <UserIP />
        </div>
        <div className={" bg-slate-300 text-slate-800 p-4 rounded"}>
          <RandomNumber />
        </div>
        <div className={" bg-slate-300 text-slate-800 p-4 rounded"}>
          <ReallyRandomString />
        </div>
      </div>
    </div>
  )
}

export default App
