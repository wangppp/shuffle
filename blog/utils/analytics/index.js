import ReactGA from 'react-ga'

function isLocalhost() {
    return window && window.location.hostname === 'localhost'
}

export const initGA = () => {
    console.log('GA init')
    ReactGA.initialize('UA-114916529-1')
}

export const logPageView = () => {
    if (isLocalhost()) return
    console.log(`Logging pageview for ${window.location.pathname}`)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action && !isLocalhost()) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description && !isLocalhost()) {
    ReactGA.exception({ description, fatal })
  }
}