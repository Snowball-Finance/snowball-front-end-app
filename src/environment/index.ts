export const IS_DEV = process.env.NODE_ENV !== "production";

export const env = {
  ANALYTICS_ENDPOINT: process.env.REACT_APP_ANALYTICS_ENDPOINT,
  ANALYTICS_SITE_ID: process.env.REACT_APP_ANALYTICS_SITE_ID,
  APIADDR: process.env.REACT_APP_APIADDR,
  APPNAME: process.env.REACT_APP_APPNAME,
  DEVAPIADDR: process.env.REACT_APP_DEVAPIADDR,
  IPFS_API_URL: process.env.REACT_APP_IPFS_API_URL,
  LOCALNODE: process.env.REACT_APP_LOCALNODE,
  NETWORK: process.env.REACT_APP_NETWORK,
  PRIVATENODE: process.env.REACT_APP_PRIVATENODE,
  MINIMUM_TOKEN_FOR_VOTING: process.env.REACT_APP_MINIMUM_TOKEN_FOR_VOTING,
  MINIMUM_VOTING_PERIOD: process.env.REACT_APP_MINIMUM_VOTING_PERIOD,
  MAXIMUM_VOTING_PERIOD: process.env.REACT_APP_MAXIMUM_VOTING_PERIOD,
  MINIMUM_VOTING_PERIOD_UNIT: process.env.REACT_APP_MINIMUM_VOTING_PERIOD_UNIT,
  GOVERNANCE_INFO_LINK: process.env.REACT_APP_GOVERNANCE_INFO_LINK,
  GOVERNANCE_TOKEN_NAME: process.env.REACT_APP_GOVERNANCE_TOKEN_NAME,
  GOVERNANCE_TOKEN_CONTRACT_ADDRESS:
    process.env.REACT_APP_GOVERNANCE_TOKEN_CONTRACT_ADDRESS,
  GOVERNANCE_TOKEN_LOGO_ADDRESS:
    process.env.REACT_APP_GOVERNANCE_TOKEN_LOGO_ADDRESS,
  GAUGE_PROXY_ADDRESS: process.env.REACT_APP_GAUGE_PROXY_ADDRESS,
  MAIN_TOKEN_NAME: process.env.REACT_APP_MAIN_TOKEN_NAME,
};
