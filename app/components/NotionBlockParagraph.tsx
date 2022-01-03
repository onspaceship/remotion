import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'

export default function NotionBlockParagraph({ block }: { block: GetBlockResponse }) {
  if (block.type != 'paragraph') return null

  return (
    <p className="min-h-[1px]">
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
            {text.plain_text
              .split(/(\r\n|\r|\n)/g)
              .map((line, i) => (line.match(/(\r\n|\r|\n)/g) ? <br key={i} /> : line))}
          </Comp>
        )
      })}
    </p>
  )
}
