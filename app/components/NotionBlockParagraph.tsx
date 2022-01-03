import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'

export default function NotionBlockParagraph({ block }: { block: GetBlockResponse }) {
  let text

  if (block.type == 'paragraph') {
    text = block.paragraph.text
  } else if (block.type == 'quote') {
    text = block.quote.text
  } else if (block.type == 'callout') {
    text = block.callout.text
  } else return null

  return (
    <p
      className={clsx(
        'min-h-[1px] relative',
        block.type == 'quote' && 'pl-3 border-l-[3px] border-black',
        block.type == 'callout' && 'p-4 pl-12 bg-neutral-100'
      )}
    >
      {block.type == 'callout' && (
        <div className="absolute top-4 left-4">{block.callout.icon?.type == 'emoji' && block.callout.icon.emoji}</div>
      )}
      {text.map((text, i) => {
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
