import * as React from 'react';
import reactIntlUniversal from 'react-intl-universal';
import {Provider, observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {CssBaseline} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
// tslint:disable-next-line:import-name
import MomentUtils from '@date-io/moment';
import {Router} from 'content/app/Router';
import {UIStore, uiStoreInstance} from 'state/UIStore';
import {UserStore, userStoreInstance} from 'state/UserStore';
import {propertyStoreInstance, PropertyStore} from 'state/PropertyStore';
import {errorStoreInstance, ErrorStore} from 'state/ErrorStore';
import {quotesStoreInstance, QuotesStore} from 'state/QuotesStore';
import {SaveDialog} from 'ui/Components/SaveDialog/SaveDialog';
import {ErrorBoundary} from 'ui/Components/ErrorBoundary/ErrorBoundary';
import ReactGA from 'react-ga';

const enUS = require('assets/i18n/en-US.json');

const locales = {
  'en-US': enUS,
};

export type IntlProps = {
  get: (key: string, params?: any) => string;
  getHTML: (key: string, params?: any) => string;
};

export type AppStoreProps = {
  intl?: IntlProps;
  ui?: UIStore;
  user?: UserStore;
  property?: PropertyStore;
  quotes?: QuotesStore;
  error?: ErrorStore;
};

@observer
export class App extends React.Component {
  @observable
  initDone = false;

  @observable
  isOpenSaveDialog = false;

  @observable
  isOpenErrorDialog = false;

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-130478593-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    this.loadLocales();
  }

  @action
  setDone() {
    this.initDone = true;
  }

  @action
  handleSaveDialog = () => {
    this.isOpenSaveDialog = !this.isOpenSaveDialog;
  };

  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    reactIntlUniversal
      .init({
        locales,
        currentLocale: 'en-US', // TODO: determine locale here
      })
      .then(() => this.setDone());
  }

  render() {
    if (!this.initDone) {
      return 'Loading...';
    }
    return (
      <Provider
        ui={uiStoreInstance}
        intl={reactIntlUniversal}
        user={userStoreInstance}
        property={propertyStoreInstance}
        quotes={quotesStoreInstance}
        error={errorStoreInstance}
        saveProgress={this.handleSaveDialog}
      >
        <MuiThemeProvider theme={uiStoreInstance.muiTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <CssBaseline />
            <Router />
            <ErrorBoundary />
            <SaveDialog isOpenSaveDialog={this.isOpenSaveDialog} step={propertyStoreInstance.step} />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
