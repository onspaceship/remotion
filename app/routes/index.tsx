import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Client } from '@notionhq/client'
import { GetPageResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import cache from '~/utils/cache'

import NotionHeader from '~/components/NotionHeader'
import NotionBlocks from '~/components/NotionBlocks'

export interface LoaderData {
  page: GetPageResponse
  blocks: ListBlockChildrenResponse
  entryPageId?: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const page_id = params.id ?? process.env.NOTION_ENTRY_PAGE_ID!

  let cachedData = cache.get<LoaderData>(page_id)

  if (!cachedData) {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    })

    cachedData = {
      page: await notion.pages.retrieve({ page_id }),
      blocks: await notion.blocks.children.list({ block_id: page_id }),
      entryPageId: process.env.NOTION_ENTRY_PAGE_ID,
    }

    cache.set(page_id, cachedData)
  }

  return cachedData
}

export const meta: MetaFunction = ({ data: { page } }: { data: LoaderData }) => {
  return {
    title: page.properties.title.type == 'title' ? page.properties.title.title[0].plain_text : '',
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()

  return (
    <>
      <NotionHeader page={data.page} />
      <NotionBlocks blocks={data.blocks.results} />
    </>
  )
}
