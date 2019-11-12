import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {Wrapper} from 'ui/Components/Layout/Flex';
import {withStyles, WithStyles} from 'ui/withStyles';
import {AppStoreProps} from 'content/app/App';
import {StepperStore} from 'state/basic/StepperStore';
import {History} from 'history';
import {Navigation} from 'ui/Elements/Navigation/Navigation';
import {ProgressBar} from 'ui/Components/ProgressBar/ProgressBar';
import {styles} from './styles';

export type StepperProps<T extends StepperStore> = WithStyles<typeof styles> &
  AppStoreProps & {
    store: T;
    history: History;
  };

export type Step<T> = {
  store?: T;
};

@withStyles(styles)
@inject('intl', 'user')
@observer
export class Stepper<Store extends StepperStore> extends React.Component<StepperProps<Store>> {
  prevStep = () => {
    const {store, history, user} = this.props;

    if (store.step > 1) {
      store.prevStep();
    } else if (user.getZeroResults()) {
      history.push('/organic/address-form');
    } else {
      history.push('/organic/confirm-address');
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
    const {classes, store, children} = this.props;
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
    const progress = Math.round((100 / steps.length) * store.step);
    localStorage.setItem('progress', JSON.stringify(progress));

    return (
      <Wrapper className={classes.wrapper}>
        <Navigation withBackButton backClick={this.prevStep} className={classes.mobileRow} disabledLinks />
        <ProgressBar progress={progress} />
        {steps}
      </Wrapper>
    );
  }
}
