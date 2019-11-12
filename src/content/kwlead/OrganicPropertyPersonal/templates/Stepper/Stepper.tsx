import * as React from 'react';
import {LinearProgress, Theme} from '@material-ui/core';
import {observer, inject} from 'mobx-react';
import {Wrapper} from 'ui/Components/Layout/Flex';
import {withStyles, WithStyles, CSSProperties} from 'ui/withStyles';
import {AppStoreProps} from 'content/app/App';
import {StepperStore} from 'state/basic/StepperStore';
import {History} from 'history';
import {Navigation} from 'ui/Elements/Navigation/Navigation';

export type StepperProps<T extends StepperStore> = WithStyles<typeof styles> &
  AppStoreProps & {
    store: T;
    history: History;
  };

export type Step<T> = {
  store?: T;
};

const styles = (theme: Theme) => ({
  root: {
    width: '38%',
    marginTop: '-6px',
    marginBottom: 0,
    minHeight: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    background: '#f6f6f7',
    zIndex: 1,
    borderRadius: 4,
    '& div': {
      background: '#33afd1',
      borderRadius: '10%',
    },
    '@media (min-width: 900px)': {
      width: '240px',
      marginTop: '-6px',
      minHeight: 5,
    },
  } as CSSProperties,

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,

  mobileRow: {
    zIndex: 1,
  } as CSSProperties,
});

@withStyles(styles)
@inject('intl', 'user')
@observer
export class Stepper<Store extends StepperStore> extends React.Component<StepperProps<Store>> {
  prevStep = () => {
    const {store, history, user} = this.props;

    if (store.step > 1) {
      store.prevStep();
    } else if (user.getZeroResults()) {
      history.push('/kwlead/address-form');
    } else {
      history.push('/kwlead/confirm-address');
    }
  };

  openSaveDialog(): any {
    return null;
  }

  componentDidMount() {
    const {number} = JSON.parse(localStorage.getItem('step'));
    this.props.store.setStep(Number(number));
  }

  render() {
    const {intl, classes, store, children} = this.props;
    const childrenArray = React.Children.toArray(children);
    const steps = childrenArray.map((step: React.ReactElement<any>, index) => {
      const controlProps = {
        index,
        last: index + 1 === childrenArray.length,
      };

      const state = {
        store,
      };

      if (store.step === index + 1) {
        return React.cloneElement(step, {
          ...controlProps,
          ...step.props,
          ...state,
        });
      }
      return null;
    });

    return (
      <Wrapper className={classes.wrapper}>
        <Navigation withBackButton backClick={this.prevStep} className={classes.mobileRow} disabledLinks />
        <LinearProgress variant="determinate" value={(100 / steps.length) * (store.step + 1)} classes={{root: classes.root}} />
        {steps}
      </Wrapper>
    );
  }
}
