import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss'

import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import Link from 'next/link'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../services/prismic'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicProvider
        internalLinkComponent={({href, children, ...props}) => (
          <Link href={href}>
            <a {...props}>
              {children}
            </a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Header/>
          <Component {...pageProps} />
        </PrismicPreview>

      </PrismicProvider>
    </NextAuthProvider>
  )
}

export default MyApp
