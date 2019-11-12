import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {PropertyStore} from 'state/PropertyStore';
import {PropertyPersonalTemplate} from '../templates/PropertyPersonal/PropertyPersonalTemplate';
import {Button} from 'ui/Components/Button/Button';
import {Step} from 'content/kwlead/PropertyPersonal/templates/Stepper/Stepper';
import {History} from 'history';
import {AppStoreProps} from 'content/app/App';
import {withStyles, WithStyles} from 'ui/withStyles';
import classnames from 'classnames';
import {Icon} from 'ui/Components/Icon/Icon';
import {UsageType} from 'types/Properties';
import {setCorrectPath} from 'lib/utils';
import {styles} from './styles';

const background = require('assets/images/property-bg-1.svg');
const houses = require('assets/images/BackgroundIllustrations.svg');

export type LeadUsageProps = AppStoreProps & Step<PropertyStore> & WithStyles<typeof styles> & {history: History};

@withStyles(styles)
@inject('intl')
@observer
export class LeadPropertyUsage extends React.Component<LeadUsageProps> {
  generateUsageTypeKeys = () => {
    const {intl} = this.props;
    return [
      {
        label: intl.get('kwlead.property.usage.useAs.PRIMARY'),
        value: 'PRIMARY',
      },
      {
        label: intl.get('kwlead.property.usage.useAs.SECONDARY'),
        value: 'SECONDARY',
      },
      {
        label: intl.get('kwlead.property.usage.useAs.RENTAL_PROPERTY'),
        value: 'RENTAL_PROPERTY',
      },
      {
        label: intl.get('kwlead.property.usage.useAs.SEASONAL'),
        value: 'SEASONAL',
      },
    ];
  };

  hangleClick = ({currentTarget: {value}}: React.MouseEvent<HTMLButtonElement>) => {
    const {store, history} = this.props;
    const path = setCorrectPath('loading-page/2');
    const usage = value as UsageType;
    store.usage.update({usageType: usage});
    store.updatePropertyDetails({usage_type: usage, occupancy_type: 'OWNER'});
    store.nextStep();
    history.push(path);
  };

  renderUsageTypeKey = (item: {label: string; value: string}) => (
    <Button data-test-id={item.label} value={item.value} key={item.label} label={item.label} onClick={this.hangleClick} answer />
  );

  renderUsageTypeKeys = () => this.generateUsageTypeKeys().map(this.renderUsageTypeKey);

  render() {
    const {
      intl,
      store: {step},
      classes,
    } = this.props;

    return (
      <PropertyPersonalTemplate
        title={intl.get('kwlead.property.usageType.title')}
        subheading={intl.get('kwlead.property.usageType.subheading')}
        description={intl.get('kwlead.property.usage.description')}
        background={background}
        desktopBackground={houses}
        hideButton
        step={2}
      >
        <div className={classes.buttonContainer}>{this.renderUsageTypeKeys()}</div>
        <Icon className={classnames(classes.icon, classes.clouds)} name="clouds" />
      </PropertyPersonalTemplate>
    );
  }
}
