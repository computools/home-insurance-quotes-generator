import * as React from 'react';
import {Theme, Typography, Button, SwipeableDrawer} from '@material-ui/core';
import {Column, Row} from 'ui/Components/Layout/Flex';
import {withStyles, CSSProperties, WithStyles} from 'ui/withStyles';
import {Close} from '@material-ui/icons';
import {IntlProps} from 'content/app/App';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import {MARKETING_BASE_LINK} from 'config/vars';

const cloudIcon = require('assets/images/cloud-icon.svg');

const styles = (theme: Theme) => ({
  root: {
    '& div': {
      width: '100%',
    },
  } as CSSProperties,
  container: {
    height: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    '& a': {
      textDecoration: 'none',
    },
  } as CSSProperties,
  menuContent: {
    minHeight: '48vh',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      fontSize: 19,
      fontWeight: 600,
      color: '#1ea3d4',
    },
  } as CSSProperties,
  saveProgressButton: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3.75,
    paddingRight: theme.spacing.unit * 3.75,
  } as CSSProperties,
  terms: {
    fontSize: 14,
    color: '#1ea3d4',
    fontWeight: 500,
  } as CSSProperties,
  linksContainer: {
    position: 'relative',
    minHeight: '35vh',
  } as CSSProperties,
  disabled: {
    pointerEvents: 'none',
    '& p': {
      color: '#CACACB',
    },
  } as CSSProperties,
  cloudIcon: {
    marginLeft: theme.spacing.unit * 2,
  } as CSSProperties,
});

export type MenuProps = WithStyles<typeof styles> & {
  isOpen: boolean;
  toggle: any;
  intl: IntlProps;
  id?: string;
  disabledLinks?: boolean;
  saveProgress?: () => void;
  hidePopUp?: boolean;
};

const CloudIcon = ({className, onClick}: {className?: string; onClick?: any}) => (
  <img src={cloudIcon} className={className} onClick={onClick} />
);

@inject('intl')
@withStyles(styles)
@observer
export class Menu extends React.Component<MenuProps> {
  render() {
    const {intl, classes, toggle, isOpen, id, disabledLinks, saveProgress, hidePopUp} = this.props;
    return (
      <SwipeableDrawer id={id} anchor="right" open={isOpen} onClose={toggle} onOpen={toggle} className={classes.root}>
        <Column className={classes.container} valign="space-between">
          <Row align="flex-end">
            <Close onClick={toggle} />
          </Row>
          <Column className={classes.menuContent}>
            <Column align="center" valign="space-between" className={classes.linksContainer}>
              <Link to={disabledLinks ? '/home' : '/quotes'} className={hidePopUp ? classes.disabled : ''}>
                <Typography onClick={toggle}>{intl.get('kwlead.quotes.menu.your-quotes')}</Typography>
              </Link>
              <a href={`${MARKETING_BASE_LINK}about/`} target="_blank">
                <Typography onClick={toggle}>{intl.get('kwlead.quotes.menu.about')}</Typography>
              </a>
              <a href="https://intercom.help/quotes-generator/faq" target="_blank">
                <Typography onClick={toggle}>{intl.get('kwlead.quotes.menu.faq')}</Typography>
              </a>
              <Link to="/edit-property-details" className={disabledLinks ? classes.disabled : ''}>
                <Typography>{intl.get('kwlead.quotes.menu.edit')}</Typography>
              </Link>
            </Column>
            <Button data-test-id="saveProgressButton" className={classes.saveProgressButton} onClick={saveProgress}>
              <Typography variant="caption">{intl.get('kwlead.quotes.menu.progress')}</Typography>
              <CloudIcon className={classes.cloudIcon} />
            </Button>
          </Column>
          <a href={`${MARKETING_BASE_LINK}legal/#terms`} target="_blank">
            <Row align="center">
              <Typography className={classes.terms}>{intl.get('kwlead.quotes.menu.terms')}</Typography>
            </Row>
          </a>
        </Column>
      </SwipeableDrawer>
    );
  }
}
