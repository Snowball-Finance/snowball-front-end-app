import MatomoTracker from '@datapunt/matomo-tracker-js'
import { env } from "environment"

const urlBase = (() => {
  if (env.ANALYTICS_ENDPOINT) {
    return env.ANALYTICS_ENDPOINT
  }
  throw new Error("No analytics endpoint defined in environment variables, please define REACT_APP_ANALYTICS_ENDPOINT")
})()

const siteId = (() => {
  if (env.ANALYTICS_SITE_ID) {
    return Number(env.ANALYTICS_SITE_ID)
  }
  throw new Error("No analytics site id defined in environment variables, please define REACT_APP_ANALYTICS_SITE_ID")
})()

export const analytics = new MatomoTracker({
  urlBase,
  siteId,
})