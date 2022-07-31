import { useQuery } from "@tanstack/react-query"
import ky from "ky"

type YourFuckingIp = {
  YourFuckingIPAddress: string
  YourFuckingLocation: string
}

async function getIp() {
  return await ky.get("https://myip.wtf/json").json<YourFuckingIp>()
}

export function UserIP() {
  const ipQuery = useQuery(["ip"], getIp)

  return (
    <>
      {ipQuery.data ? (
        <span className={"mt-2"}>
          <span className={'font-bold'}>{ipQuery.data.YourFuckingIPAddress}</span>, geolocation{" "}
          <span className={'font-bold'}>{ipQuery.data.YourFuckingLocation}</span>
        </span>
      ) : <span className={'italic'}>wait</span>}
    </>
  )
}
