/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { AppPages } from './constants';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'utils/history';


import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Example } from "./containers/Example/Loadable";
import { IS_DEV } from "utils/sharedData";
import { Web3 } from "./containers/Web3";

export function App() {
  const { t } = useTranslation();
  return (
    <>
      <Web3 />
      <ConnectedRouter history={history}>
        <Helmet
          titleTemplate="%s - Snowball"
          defaultTitle={t(translations.HomePage.home())}
        >
          <meta name="description" content="Snowball" />
        </Helmet>
        <Switch>
          <Route exact path={AppPages.RootPage} component={HomePage} />
          {IS_DEV && <Route exact path={AppPages.Example} component={Example} />}
          <Route component={NotFoundPage} />
        </Switch>
      </ConnectedRouter>
    </>
  );
}
