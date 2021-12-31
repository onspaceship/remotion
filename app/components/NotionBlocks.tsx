import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'

import NotionBlockChildPage from './NotionBlockChildPage'
import NotionBlockDivider from './NotionBlockDivider'
import NotionBlockImage from './NotionBlockImage'
import NotionBlockParagraph from './NotionBlockParagraph'

export default function NotionBlocks({ blocks }: { blocks: GetBlockResponse[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return <NotionBlockParagraph key={block.id} block={block} />
          case 'image':
            return <NotionBlockImage key={block.id} block={block} />
          case 'divider':
            return <NotionBlockDivider key={block.id} />
          case 'child_page':
            return <NotionBlockChildPage key={block.id} block={block} />
        }
      })}

      <pre className="whitespace-pre-wrap">{JSON.stringify(blocks, null, 2)}</pre>
    </>
  )
}
