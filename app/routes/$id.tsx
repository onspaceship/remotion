import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Client } from '@notionhq/client'
import { GetPageResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import NotionHeader from '~/components/NotionHeader'
import NotionBlocks from '~/components/NotionBlocks'

interface LoaderData {
  page: GetPageResponse
  blocks: ListBlockChildrenResponse
  entryPageId?: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  return {
    page: await notion.pages.retrieve({
      page_id: params.id ?? process.env.NOTION_ENTRY_PAGE_ID!,
    }),

    blocks: await notion.blocks.children.list({
      block_id: params.id ?? process.env.NOTION_ENTRY_PAGE_ID!,
    }),

    entryPageId: process.env.NOTION_ENTRY_PAGE_ID,
  }
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
      <NotionHeader page={data.page} child={data.page.id != data.entryPageId} />
      <NotionBlocks blocks={data.blocks.results} />
    </>
  )
}
