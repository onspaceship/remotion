import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import { CSSProperties } from 'react'

export default function NotionBlockParagraph({ block }: { block: GetBlockResponse }) {
  if (block.type != 'paragraph') return null

  return (
    <p>
      {block.paragraph.text.map((text, i) => {
        const styles: CSSProperties = {}

        if (text.annotations.bold) styles.fontWeight = 'bold'
        if (text.annotations.italic) styles.fontStyle = 'italic'
        if (text.annotations.strikethrough) styles.textDecoration = 'line-through'
        if (text.annotations.underline) styles.textDecoration = 'underline'

        return (
          <span key={i} style={styles}>
            {text.plain_text}
          </span>
        )
      })}
    </p>
  )
}
