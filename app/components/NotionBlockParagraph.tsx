import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'

export default function NotionBlockParagraph({ block }: { block: GetBlockResponse }) {
  if (block.type != 'paragraph') return null

  return (
    <p>
      {block.paragraph.text.map((text, i) => {
        const Comp = text.href ? 'a' : 'span'

        return (
          <Comp
            key={i}
            className={clsx(
              text.annotations.bold && 'font-bold',
              text.annotations.italic && 'italic',
              text.annotations.strikethrough && 'line-through',
              text.annotations.underline && 'underline',
              text.annotations.code && 'font-mono'
            )}
            href={text.href ?? ''}
          >
            {text.plain_text}
          </Comp>
        )
      })}
    </p>
  )
}
