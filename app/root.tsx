import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'

import styles from './tailwind.css'

export const meta: MetaFunction = () => {
  return { title: 'Remotion' }
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="max-w-3xl mx-auto">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
