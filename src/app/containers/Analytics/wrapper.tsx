import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import { FC } from "react"
import { env } from "utils/environment/variables"

const urlBase = env.ANALYTICS_ENDPOINT || 'implement_analytics_endpoint'

const instance = createInstance({
  urlBase,
  siteId: 3,
  // userId: 'UID76903202', // optional, default value: `undefined`.
  trackerUrl: `${urlBase}/tracking.php`, // optional, default value: `${urlBase}matomo.php`
  srcUrl: `${urlBase}/tracking.js`, // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  },
  // linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    // disableCookies: true,
    // setSecureCookie: true,
    // setRequestMethod: 'POST'
  }
})

export const MatomoWrapper: FC = ({ children }) => {

  return (
    <MatomoProvider value={instance}>
      {children}
    </MatomoProvider>
  )
}