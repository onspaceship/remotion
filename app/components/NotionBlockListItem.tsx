import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'

export default function NotionBlockListItem({
  block,
  mark = '•',
  checked = false,
}: {
  block: GetBlockResponse
  mark?: string
  checked?: boolean
}) {
  let item

  if (block.type == 'bulleted_list_item') {
    item = block.bulleted_list_item
  } else if (block.type == 'numbered_list_item') {
    item = block.numbered_list_item
  } else if (block.type == 'to_do') {
    item = block.to_do
  } else {
    return null
  }

  return (
    <div>
      <span className="inline-block w-4 mx-2 text-center">{mark}</span>
      {item.text.map((text, i) => {
        return (
          <span
            key={i}
            className={clsx(
              text.annotations.bold && 'font-bold',
              text.annotations.italic && 'italic',
              text.annotations.strikethrough && 'line-through',
              text.annotations.underline && 'underline',
              text.annotations.code && 'font-mono',
              checked && 'line-through text-gray-400'
            )}
          >
            {text.plain_text}
          </span>
        )
      })}
    </div>
  )
}
