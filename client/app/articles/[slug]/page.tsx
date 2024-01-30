import { FC } from "react"

interface PageProps {
  params: {
    slug:string
  }
}



const page: FC<PageProps> = ({params}) => {
  return <div>page</div>
}

export default page