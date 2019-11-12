import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {PropertyStore} from 'state/PropertyStore';
import {PropertyPersonalTemplate} from '../templates/PropertyPersonal/PropertyPersonalTemplate';
import {Button} from 'ui/Components/Button/Button';
import {Step} from 'content/kwlead/PropertyPersonal/templates/Stepper/Stepper';
import {RoofType} from 'types/Properties';
import {AppStoreProps} from 'content/app/App';
import {withStyles, WithStyles} from 'ui/withStyles';
import {styles} from './styles';
import classnames from 'classnames';
import {Icon} from 'ui/Components/Icon/Icon';

const background = require('assets/images/property-bg.svg');
const houses = require('assets/images/Background2.svg');

export type LeadUsageProps = AppStoreProps & Step<PropertyStore> & WithStyles<typeof styles>;

const roofTypeKeys: Array<RoofType> = [
  'ASPHALT_SHINGLES',
  'COMPOSITE_SHINGLE',
  'CONCRETE',
  'MIXED',
  'METAL',
  'SLATE_OR_IMITATION_SLATE',
  'TILE',
  'WOOD_SHINGLE',
  'CEDAR_OR_SHAKE',
  'OTHER',
];

const roofTypeImage = [
  'asphalt',
  'compositeShingle',
  'concrete',
  'mixed',
  'metal',
  'slateOrImitationSlate',
  'tile',
  'woodShingle',
  'cedarOrShake',
];

@withStyles(styles)
@inject('intl')
@observer
export class LeadRoofType extends React.Component<LeadUsageProps> {
  hangleClick = ({currentTarget: {value}}: React.MouseEvent<HTMLButtonElement>) => {
    const {store} = this.props;
    const roofType = value as RoofType;
    store.construction.update({roofType});
    store.updatePropertyDetails({roof_type: roofType});
    store.nextStep();
  };

  renderRoofType = (item: RoofType, index: number) => {
    const {intl} = this.props;
    return (
      <Button
        data-test-id={intl.get(`kwlead.property.construction.roofType.${item}`)}
        value={item}
        key={`${item}-KEY`}
        label={intl.get(`kwlead.property.construction.roofType.${item}`)}
        onClick={this.hangleClick}
        iconName={roofTypeImage[index]}
        answer
      />
    );
  };

  renderRoofTypes = () => roofTypeKeys.map(this.renderRoofType);

  render() {
    const {
      intl,
      store: {step},
      classes,
    } = this.props;

    return (
      <PropertyPersonalTemplate
        title={intl.get('organic.roofType.title')}
        subheading={intl.get('organic.roofType.subheading')}
        description={intl.get('kwlead.property.construction.description')}
        background={background}
        className={classes.container}
        desktopBackground={houses}
        hideButton
      >
        <div className={classes.buttonContainer}>{this.renderRoofTypes()}</div>
        <Icon className={classnames(classes.icon, classes.clouds)} name="clouds" />
      </PropertyPersonalTemplate>
    );
  }
}
