import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import { Link } from 'remix'

export default function NotionBlockChildPage({ block }: { block: GetBlockResponse }) {
  if (block.type != 'child_page') return null

  return (
    <div>
      <Link to={`/${block.id}`}>{block.child_page.title}</Link>
    </div>
  )
}
