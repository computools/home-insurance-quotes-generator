import * as React from 'react';

import {Column, Row} from 'ui/Components/Layout/Flex';

import {observer, inject} from 'mobx-react';
import MobileDetect from 'mobile-detect';
import {Typography} from '@material-ui/core';
import {Button} from 'ui/Components/Button/Button';
import {Close} from '@material-ui/icons';
import {withStyles, WithStyles} from 'ui/withStyles';

import {AppStoreProps} from 'content/app/App';

import {styles} from './styles';

import {AgreementCardInfo} from './AgreementCardInfo/AgreementCardInfo';

import {ProviderAgreement} from 'types/ProviderAgreement';
import {MARKETING_BASE_LINK} from 'config/vars';
import {observable} from 'mobx';

type AgreementsListProps = WithStyles<typeof styles> &
  AppStoreProps & {
    nextStep: (values?: any) => void;
    close: () => void;
  };

const providerAgreements: ProviderAgreement[] = [
  {
    title: 'quotesgenerator',
    terms: `${MARKETING_BASE_LINK}legal/#terms`,
    privacy: `${MARKETING_BASE_LINK}legal/#privacy`,
    cookie: `${MARKETING_BASE_LINK}legal/#cookies`,
  },
  {
    title: 'lemonade',
    terms: 'https://www.lemonade.com/terms-of-service',
    privacy: 'https://www.lemonade.com/privacy-policy',
  },
  {
    title: 'gabi',
    terms: 'https://www.gabi.com/terms/',
    privacy: 'https://www.gabi.com/privacy.html',
  },
];

@inject('intl')
@withStyles(styles)
@observer
export class AgreementsList extends React.Component<AgreementsListProps> {
  @observable isIos: boolean = false;
  @observable isSafari: boolean = false;

  componentDidMount() {
    this.checkIfIphone();
    this.checkIfSafari();
  }

  checkIfIphone = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    const isIphone = md.is('iPhone');
    if (!!isIphone) {
      this.isIos = true;
    }
  };

  checkIfSafari = () => {
    if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      this.isSafari = true;
    }
  };

  render() {
    const {intl, classes, nextStep, close} = this.props;
    return (
      <Column className={classes.agreementDialogContainer}>
        <Column className={classes.agreementsHeader}>
          <Row align="flex-end">
            <Close
              onClick={!this.isIos ? close : () => {}}
              onTouchStart={this.isIos ? close : () => {}}
              onMouseDown={this.isSafari ? close : () => {}}
              className={classes.closeIcon}
            />
          </Row>
          <Row className={classes.agreementsTitle}>
            <Typography variant="h6" data-test-id="subtitle">
              {intl.get('agreement.dialog.title')}
            </Typography>
          </Row>
        </Column>
        <Column>
          {providerAgreements.map((provider: ProviderAgreement, index: number) => (
            <AgreementCardInfo provider={provider} key={`provider-${index}`} />
          ))}
        </Column>
        <Column className={classes.agreementButtonsContainer}>
          <Button
            data-test-id="agreeButton"
            onClick={!this.isIos ? nextStep : () => {}}
            onTouchStart={this.isIos ? nextStep : () => {}}
            onMouseDown={this.isSafari && !this.isIos ? nextStep : () => {}}
            className={classes.agreeButton}
            label={intl.get('kwlead.property.confirmaddress.agree')}
            allowClicking
          />
          <a href={MARKETING_BASE_LINK}>
            <Button
              data-test-id="disagreeButton"
              variant="outlined"
              onClick={close}
              label={intl.get('kwlead.property.confirmaddress.disagree')}
              allowClicking
            />
          </a>
        </Column>
      </Column>
    );
  }
}
