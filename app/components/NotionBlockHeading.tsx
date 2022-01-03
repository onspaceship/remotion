import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'

export default function NotionBlockHeading({ block }: { block: GetBlockResponse }) {
  let Comp: keyof JSX.IntrinsicElements, heading

  if (block.type == 'heading_1') {
    Comp = 'h1'
    heading = block.heading_1
  } else if (block.type == 'heading_2') {
    Comp = 'h2'
    heading = block.heading_2
  } else if (block.type == 'heading_3') {
    Comp = 'h3'
    heading = block.heading_3
  } else {
    return null
  }

  return (
    <Comp>
      {heading.text.map((text, i) => {
        return (
          <span
            key={i}
            className={clsx(
              text.annotations.bold && 'font-bold',
              text.annotations.italic && 'italic',
              text.annotations.strikethrough && 'line-through',
              text.annotations.underline && 'underline',
              text.annotations.code && 'font-mono'
            )}
          >
            {text.plain_text}
          </span>
        )
      })}
    </Comp>
  )
}
