import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Link } from 'remix'

export default function NotionHeader({ page, child }: { page: GetPageResponse; child?: boolean }) {
  return (
    <>
      <div className="px-4 py-2 w-full flex justify-between">
        <div>
          {child && page.parent.type == 'page_id' && <Link to={`/${page.parent.page_id}`}>Back to parent page</Link>}
        </div>
        <a href={page.url} className="px-2 py-1 hover:bg-gray-100">
          <img src="/notion.svg" className="h-4 inline-block relative top-[-1px]" /> Open in Notion
        </a>
      </div>

      {page.cover ? (
        <div className="h-64 overflow-hidden relative">
          <img
            src={page.cover.type == 'file' ? page.cover.file.url : page.cover.external.url}
            className="object-cover object-[center_50%] h-full w-full"
          />
        </div>
      ) : (
        <div className="h-32"></div>
      )}

      <header className="max-w-3xl mx-auto prose py-10 prose-headings:mt-6 prose-headings:mb-2 relative">
        {page.icon && (
          <div className="h-20 w-20 absolute -top-16">
            {page.icon.type == 'emoji' ? (
              <div className="text-7xl">{page.icon.emoji}</div>
            ) : (
              <img src={page.icon.type == 'file' ? page.icon.file.url : page.icon.external.url} />
            )}
          </div>
        )}

        <h1>{page.properties.title.type == 'title' ? page.properties.title.title[0].plain_text : ''}</h1>
      </header>
    </>
  )
}
