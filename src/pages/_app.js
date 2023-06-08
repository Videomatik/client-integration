import PropTypes from 'prop-types'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
}
