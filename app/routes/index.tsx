import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Client } from '@notionhq/client'
import { GetPageResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import NotionBlocks from '~/components/NotionBlocks'

interface LoaderData {
  page: GetPageResponse
  blocks: ListBlockChildrenResponse
}

export const loader: LoaderFunction = async () => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  // return await notion.search({})
  // return await notion.search({ query: '01f1029409dd41448ad4d2d83c2e2077' })

  return {
    page: await notion.pages.retrieve({
      page_id: process.env.NOTION_ENTRY_PAGE_ID!,
    }),

    blocks: await notion.blocks.children.list({
      block_id: process.env.NOTION_ENTRY_PAGE_ID!,
    }),
  }
}

export const meta: MetaFunction = ({ data: { page } }: { data: LoaderData }) => {
  return {
    title: page.properties.title.type == 'title' ? page.properties.title.title[0].plain_text : '',
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()

  return <NotionBlocks blocks={data.blocks.results} />
}
