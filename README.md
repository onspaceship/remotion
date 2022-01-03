<p align="center">
  <img src="https://static.onspaceship.com/FullColor.svg" width="100">
</p>

<p align="center">
  <em>Brought to you by <a href="https://spaceship.run/">Spaceship</a></em>
</p>

# Remotion

Power your [Remix](https://remix.run/) site with data from [Notion](https://www.notion.so/)

## Configuration

Remotion is configured by environment variables.

- `NOTION_TOKEN` - This is a token you'll get from the Notion developer site. Go [create an Integration](https://www.notion.so/my-integrations) (it can be internal) and a token will be generated for you.
- `NOTION_ENTRY_PAGE_ID` - This is the default page for the index of the site. This is the random set of characters at the end of any page's URL.

In development (`npm run dev`), you can create a `.env` file in the project root to set these values.

You'll also need to share your pages with the integration directly. You can do this from the Share button at the top of any page and you'll invite your integration to the page.
