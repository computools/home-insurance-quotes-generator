import * as React from 'react';
import {withStyles, WithStyles, CSSProperties} from 'ui/withStyles';
import {Paper, Typography, Collapse, Radio} from '@material-ui/core';
import {IntlProps} from 'content/app/App';
import {styles} from './styles';
import {observer, inject} from 'mobx-react';
import Switch from '@material-ui/core/Switch';
import {observable} from 'mobx';
import {Quote} from 'types/Quotes';
import classnames from 'classnames';

export type AdditionalQuoteCardsInfoProps = WithStyles<typeof styles> & {
  intl?: IntlProps;
  title: string;
  description: string;
  companyColor: CSSProperties;
  updateMinus?: any;
  updatePlus?: any;
  viewTitle?: string;
  disabledMinus?: boolean;
  disabledPlus?: boolean;
  hideCoverageUpdate?: boolean;
  mineCoverageHandler?: (ev: any, checked: any) => void;
  quote: Quote;
};

@withStyles(styles)
@inject('intl')
@observer
export class AdditionalQuoteCardsInfo extends React.Component<AdditionalQuoteCardsInfoProps> {
  @observable isReadOnly: boolean = false;

  componentDidMount() {
    const {
      quote: {endorsements},
    } = this.props;
    if (!!endorsements && !!endorsements.mine_subsidence && !!endorsements.mine_subsidence[0]) {
      this.isReadOnly = !endorsements.mine_subsidence[0].editable;
    }
  }

  render() {
    const {
      classes,
      title,
      description,
      mineCoverageHandler,
      quote: {endorsements},
    } = this.props;

    const checked = !!endorsements && !!endorsements.mine_subsidence;

    return (
      <Paper className={classes.root} elevation={2}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} variant="body1">
            {title}
          </Typography>
          <div>
            <Switch
              classes={{
                root: classes.rootButton,
                switchBase: classes.switchBase,
                bar: classes.bar,
                checked: classes.checked,
                icon: classes.icon,
              }}
              color="primary"
              onChange={mineCoverageHandler}
              checked={checked}
              readOnly={this.isReadOnly}
            />
          </div>
        </div>
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
      </Paper>
    );
  }
}
