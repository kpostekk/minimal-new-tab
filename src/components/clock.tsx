import { DateTime } from "luxon"
import { useState } from "react"
import { useInterval } from "usehooks-ts"

function getHumanTime() {
  return DateTime.local().toLocaleString({ timeStyle: 'medium' })
}

export function SmallClock() {
  const [timeText, setTimeText] = useState(getHumanTime())
  const interval = useInterval(() => {
    setTimeText(getHumanTime())
  }, 100)

  return <span className={'font-bold'}>{timeText}</span>
}
