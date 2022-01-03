import { useLoaderData } from 'remix'

import NotionHeader from '~/components/NotionHeader'
import NotionBlocks from '~/components/NotionBlocks'
import { LoaderData } from './index'

export { meta, loader } from './index'

export default function Page() {
  const data = useLoaderData<LoaderData>()

  return (
    <>
      <NotionHeader page={data.page} child={data.page.id != data.entryPageId} />
      <NotionBlocks blocks={data.blocks.results} />
    </>
  )
}
