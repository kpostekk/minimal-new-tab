import { userLinks } from "../assets/links.json"

type UserLinkProps = {
  name: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export function UserLink(props: UserLinkProps) {
  const safeName =
    props.name.length > 24 ? props.name.slice(0, 24) + "..." : props.name

  return (
    <a {...props} className={"hover:underline-offset-1 hover:underline"}>
      {safeName}
    </a>
  )
}

export function PredefinedLinks() {
  return (
    <div
      className={"flex justify-center flex-wrap gap-3 pt-2"}
      style={{ color: "#a82927" }}
    >
      {userLinks.map(({ name, url }, i) => (
        <UserLink key={i} name={name} href={url} />
      ))}
    </div>
  )
}
