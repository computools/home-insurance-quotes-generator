import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import classnames from 'classnames';
import {withStyles, WithStyles} from 'ui/withStyles';
import {ExpandMore} from '@material-ui/icons';
import {AppStoreProps} from 'content/app/App';
import {Typography, Paper, Collapse} from '@material-ui/core';
import {styles} from './styles';
import {ProviderAgreement} from 'types/ProviderAgreement';

type AgreementCardInfoProps = WithStyles<typeof styles> &
  AppStoreProps & {
    provider: ProviderAgreement;
  };

@inject('intl')
@withStyles(styles)
@observer
export class AgreementCardInfo extends React.Component<AgreementCardInfoProps> {
  render() {
    const {
      classes,
      intl,
      provider: {title, terms, privacy, cookie},
    } = this.props;
    return (
      <Paper className={classes.agreementCardItem} elevation={2} key={`${title}-agreement`}>
        <Typography className={classes.title} variant="body1">
          {intl.get(`provider.${title}`)}
        </Typography>
        <Typography>
          {intl.get(`agreement.${title}.first-part`)}
          <a href={`${terms}`} target="_blank">
            {intl.get('common.terms')}
          </a>
          {intl.get('common.and')}
          <a href={`${privacy}`} target="_blank">
            {intl.get('common.privacy')}
          </a>
          {intl.get(`agreement.${title}.second-part`)}
          {!!cookie && (
            <span>
              <a href={`${cookie}`} target="_blank">
                {intl.get('common.cookie')}
              </a>
              {intl.get(`agreement.${title}.third-part`)}
            </span>
          )}
        </Typography>
      </Paper>
    );
  }
}
