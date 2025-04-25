// pages/_app.js
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <FormDataProvider>
      <Component {...pageProps} />
    </FormDataProvider>
  )
}

export default MyApp
