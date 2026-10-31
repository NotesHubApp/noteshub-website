import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { JssProvider, SheetsRegistry, createGenerateId } from 'react-jss'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry()
    const generateId = createGenerateId()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <JssProvider registry={registry} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        ),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en" data-color-scheme="light">
        <Head>
          <link rel="shortcut icon" href="/images/app/favicon.ico"></link>
          <link rel="icon" type="image/png" sizes="512x512" href="/images/app/icon-512.png"></link>
          <meta property="artykul:site_name" content="NotesHub"></meta>
          <meta property="artykul:site_description" content="The latest news about NotesHub app"></meta>
          <meta property="artykul:site_icon" content="/images/app/artykul-icon.png"></meta>

          {/* Umami analytics. data-domains keeps local development out of the numbers. */}
          <script
            defer
            src={ process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL }
            data-website-id={ process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID }
            data-domains={ new URL(process.env.NEXT_PUBLIC_LANDING_PAGE_URL!).hostname }></script>

          <script dangerouslySetInnerHTML={{__html: `
            (function () {
              const setTheme = (prefersDark) => {
                const AppThemeStorageKey = 'appTheme';
                const currentTheme = localStorage.getItem(AppThemeStorageKey) ?? 'system';
                const systemTheme = prefersDark ? 'dark' : 'light';
                const colorScheme = currentTheme === 'system' ? systemTheme : currentTheme;
                document.documentElement.setAttribute('data-color-scheme', colorScheme);
              }

              const prefersDark = matchMedia('(prefers-color-scheme: dark)');
              setTheme(prefersDark.matches);

              prefersDark.addEventListener('change', (event) => {
                setTheme(event.matches);
              });
            })();
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
