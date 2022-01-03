import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'

export default function NotionHeader({ page }: { page: GetPageResponse }) {
  return (
    <>
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
