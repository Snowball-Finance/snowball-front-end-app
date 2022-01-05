/**
 *
 * App
 *
 * This component is the snowball around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation } from 'react-router-dom';

import { HomePage } from './containers/pages/Home/Loadable';
import { NotFoundPage } from './containers/pages/NotFound/Loadable';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Example } from "./containers/pages/Example/Loadable";
import { BlockChain } from "./containers/BlockChain/Loadable";
import { useEffect } from "react";
import { AppPages } from "./types";
import { IS_DEV } from "environment";
import { GovernancePage } from "./containers/pages/Governance/Loadable";
import { analytics } from "@snowball-finance/snowball-analytics";
import SNOWCONE_ABI from 'libs/abis/snowcone.json'
import { Governance } from "./containers/Governance";

export function App() {
  const { t } = useTranslation();
  const location = useLocation()

  useEffect(() => {
    analytics.trackPageView({
      href: location.pathname,
    })
  }, [location]);


  return (
    <>
      <BlockChain  />
      <Governance governanceTokenABI={SNOWCONE_ABI} />
      <Helmet
        titleTemplate="%s - Snowball"
        defaultTitle={t(translations.HomePage.home())}
      >
        <meta name="description" content="Snowball" />
      </Helmet>
      <Switch>
        <Route exact path={AppPages.RootPage} component={HomePage} />
        {IS_DEV && <Route exact path={AppPages.Example} component={Example} />}
        <Route path={AppPages.GovernancePage} >
          <GovernancePage />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
