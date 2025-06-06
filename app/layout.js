import { Analytics } from '@vercel/analytics/react'

import '../styles/main.css'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>goodcore New Releases</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>

            <body>
                <header>
                    goo<span className="yellow">d</span>core
                </header>
                <section>                  
                    {children}
                    <Analytics />
                </section> 
            </body>
        </html>
    )
}