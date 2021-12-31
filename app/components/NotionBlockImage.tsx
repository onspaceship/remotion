import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'

export default function NotionBlockImage({ block }: { block: GetBlockResponse }) {
  if (block.type != 'image') return null

  return (
    <div>
      <img
        src={
          block.image.type == 'file'
            ? block.image.file.url
            : block.image.type == 'external'
            ? block.image.external.url
            : ''
        }
      />
    </div>
  )
}
