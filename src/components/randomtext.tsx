import { useState } from "react"
import { niceText } from "../assets/niceText.json"
import { useEffectOnce } from "usehooks-ts"

export function RandomNiceText() {
  const [text, setText] = useState("")
  useEffectOnce(() => {
    setText(niceText[Math.floor(Math.random() * niceText.length)])
  })

  return <h2 className={"text-center font-bold"}>{text}</h2>
}
