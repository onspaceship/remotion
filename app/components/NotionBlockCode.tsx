import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsLight'

export default function NotionBlockCode({ block }: { block: GetBlockResponse }) {
  if (block.type != 'code') return null

  return (
    <Highlight
      {...defaultProps}
      code={block.code.text.map((text) => text.plain_text).join('')}
      language={block.code.language as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} !bg-neutral-100 whitespace-pre-wrap`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
