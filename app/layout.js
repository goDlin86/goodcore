import { DateProvider } from './date-provider'
import Analytics from '../components/analytics'

import '../styles/main.css'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>goodcore Releases</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>

            <body>
                <header>
                    goo<span className="yellow">d</span>core
                </header>
                <section>
                    <h1>Releases</h1>
                    
                    <DateProvider>{children}</DateProvider>

                    <Analytics />
                </section> 
            </body>
        </html>
    )
}