import * as React from 'react';
import classnames from 'classnames';
import {observable, action, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import {MenuItem, Typography} from '@material-ui/core';
import {FormikProps} from 'types/Form';
import {PropertyPersonalTemplate} from '../templates/PropertyPersonal/PropertyPersonalTemplate';
import {History} from 'history';
import MobileDetect from 'mobile-detect';

import {PropertyStore} from 'state/PropertyStore';
import {Usage} from 'state/models/property/Usage';
import {setCorrectPath, updateInsuringAddress} from 'lib/utils';
import {SelectField} from 'ui/Components/SelectField/SelectField';
import {Button} from 'ui/Components/Button/Button';
import {Column, Row} from 'ui/Components/Layout/Flex';
import {withStyles, WithStyles} from 'ui/withStyles';
import {CustomForm} from 'ui/Components/Form/Form';
import {FieldControl} from 'ui/Components/FieldControl/FieldControl';
import {MuiImage} from 'ui/Components/MuiImage/MuiImage';
import {Step} from 'content/kwlead/PropertyPersonal/templates/Stepper/Stepper';
import {AppStoreProps} from 'content/app/App';
import {PropertyType, UsageType, OccupancyType} from 'types/Properties';
import {getUsageFields} from 'lib/formFields';
import {Icon} from 'ui/Components/Icon/Icon';
import {unitNumberValidateSheme} from 'lib/validateSheme';

import {styles} from './styles';
import {Close} from '@material-ui/icons';

const background = require('assets/images/property-bg-1.svg');
const houses = require('assets/images/BackgroundIllustrations.svg');
const mapIcon = require('assets/icons/noLandlordError.png');

export type LeadUsageProps = AppStoreProps & Step<PropertyStore> & WithStyles<typeof styles> & {history: History};

@withStyles(styles)
@inject('intl')
@observer
export class LeadUsage extends React.Component<LeadUsageProps> {
  @observable propertyType: PropertyType = 'SINGLE_FAMILY';
  @observable unitNumber: string = '';
  @observable usageType: UsageType = 'PRIMARY';
  @observable occupancyType: OccupancyType = 'OWNER';
  @observable numberOfBadSelections: number = 0;
  @observable isDialogVisible: boolean = false;
  @observable renterDialog: boolean = false;
  @observable email: string = '';
  @observable isUnitNumber: boolean = false;
  @action
  update(props: Partial<LeadUsage>) {
    Object.keys(props).forEach((propName: keyof Usage) => {
      if (props[propName]) {
        this[propName] = props[propName];

        if (this.propertyType === 'CONDO' || this.propertyType === 'TOWNHOME') {
          this.isUnitNumber = true;
        }
      }
    });
  }

  nextStep = async (values: LeadUsage) => {
    const {history, store} = this.props;

    const {propertyType, usageType, occupancyType, unitNumber} = values;
    const path = setCorrectPath('loading-page/2');
    history.push(path);
    let address = '';
    if (propertyType === 'CONDO' || propertyType === 'TOWNHOME') {
      address = updateInsuringAddress(unitNumber);
      this.unitNumber = unitNumber;
    } else {
      const {formattedAddress} = JSON.parse(localStorage.getItem('address'));
      address = formattedAddress;
      this.unitNumber = '';
    }

    store.usage.update({propertyType, usageType, occupancyType, unitNumber: this.unitNumber});
    localStorage.setItem('unitNumber', JSON.stringify({propertyType, unitNumber: this.unitNumber}));
    store.nextStep();
    store.updatePropertyDetails({
      property_type: propertyType,
      usage_type: usageType,
      occupancy_type: occupancyType,
      insuring_address: address,
    });
  };

  componentDidMount() {
    this.update(toJS(this.props.store.usage));
  }

  handleChange = (setFieldValueCallback: any, name: string, values: any) => ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      (value === 'RENTAL_PROPERTY' && values.occupancyType === 'OWNER') ||
      (values.usageType === 'RENTAL_PROPERTY' && value === 'OWNER')
    ) {
      this.renterDialog = true;
      this.isDialogVisible = true;
      setFieldValueCallback('usageType', 'PRIMARY');
    } else {
      this.renterDialog = false;
      setFieldValueCallback(name, value);
      this.isUnitNumber = value === 'CONDO' || value === 'TOWNHOME' || false;
    }
  };

  renderDialog = (confirm: () => void) => {
    const {intl, classes} = this.props;
    return (
      <Column align="center" className={classes.dialogContainer}>
        <Row align="flex-start">
          <Typography className={classes.title} variant="subheading" align="center">
            {intl.get('kwlead.property.usage.helper.title')}
          </Typography>
        </Row>
        <Typography className={(classes.text, classes.helperSubheading)} variant="caption" align="center" gutterBottom>
          {intl.get('kwlead.property.usage.helper.subheading')}
        </Typography>
        <Button
          onClick={() => {
            confirm();
            this.isDialogVisible = false;
          }}
          label={intl.get('kwlead.property.usage.helper.okay')}
        />
      </Column>
    );
  };

  renderDialogRenter = (confirm: () => void) => {
    const {intl, classes} = this.props;
    const md = new MobileDetect(window.navigator.userAgent);
    return (
      <>
        <Row className={classes.closeIconContainer} align="flex-end">
          <Close
            className={classes.closeIcon}
            onClick={() => {
              confirm();
              this.isDialogVisible = false;
            }}
          />
        </Row>
        <Column align="center" className={classes.dialogRenterContainer}>
          <Row className={classes.renterTitleContainer}>
            <Row className={classes.renterImageContainer}>
              <MuiImage src={mapIcon} classes={{root: classes.renterImage}} />
            </Row>
            <Row align="flex-start">
              <Typography className={classes.renterTitle} variant="subheading" align="center">
                {intl.get('kwlead.property.usage.helperRenter.title')}
              </Typography>
            </Row>
          </Row>
          <Column valign="space-between">
            <Button
              onClick={() => {
                confirm();
                this.isDialogVisible = false;
              }}
              className={classes.helperRenterButton}
              label={intl.get('kwlead.property.confirmaddress.error-button-alert')}
            />
          </Column>
        </Column>
      </>
    );
  };

  renderFormChildren = ({values, setFieldValue, errors, touched}: FormikProps) => {
    const {intl, classes} = this.props;
    return getUsageFields().map(({name, label, renderLabel, keys}) => {
      if (name === 'propertyType') {
        return (
          <span
            key={name}
            className={classnames(
              {[classes.propertyContainer]: !this.isUnitNumber},
              {[classes.propertyContainerWithUnit]: this.isUnitNumber}
            )}
          >
            <FieldControl
              name={name}
              type="select"
              renderCustomField={({field}) => (
                <SelectField
                  data-test-id={name}
                  field={field}
                  onChange={this.handleChange(setFieldValue, name, values)}
                  value={values[name]}
                  label={intl.get(label)}
                  renderValue={(value: string) => intl.get(`${renderLabel}${value}`)}
                >
                  {keys.map((item: string) => (
                    <MenuItem data-test-id={item} key={item} value={item}>
                      {intl.get(`${renderLabel}${item}`)}
                    </MenuItem>
                  ))}
                </SelectField>
              )}
            />
            {this.isUnitNumber && (
              <FieldControl
                data-test-id="unitNumber"
                name="unitNumber"
                type="string"
                placeholder={intl.get('kwlead.property.usage.unitNumber.label')}
                label={intl.get('kwlead.property.usage.unitNumber.placeholder')}
                editable={true}
                errors={errors}
                touched={touched}
                focused={true}
              />
            )}
          </span>
        );
      }
      return (
        <FieldControl
          key={name}
          name={name}
          type="select"
          renderCustomField={({field}) => (
            <SelectField
              data-test-id={name}
              field={field}
              onChange={this.handleChange(setFieldValue, name, values)}
              value={values[name]}
              label={intl.get(label)}
              renderValue={(value: string) => intl.get(`${renderLabel}${value}`)}
            >
              {keys.map((item: string) => (
                <MenuItem data-test-id={item} key={item} value={item}>
                  {intl.get(`${renderLabel}${item}`)}
                </MenuItem>
              ))}
            </SelectField>
          )}
        />
      );
    });
  };

  render() {
    const {intl, classes} = this.props;

    return (
      <PropertyPersonalTemplate
        className={classes.containerFix}
        title={intl.get('kwlead.property.usage.title')}
        subheading={intl.get('kwlead.property.usage.subheading')}
        description={intl.get('kwlead.property.usage.description')}
        helperRenderer={this.renterDialog ? this.renderDialogRenter : this.renderDialog}
        isDialogOpened={this.isDialogVisible}
        background={background}
        desktopBackground={houses}
        hideButton
      >
        <CustomForm
          className={classnames(
            classes.formFix,
            {[classes.formFixWithoutUnit]: !this.isUnitNumber},
            {[classes.formFixWithUnit]: this.isUnitNumber}
          )}
          initialValues={{
            propertyType: this.propertyType,
            usageType: this.usageType,
            occupancyType: this.occupancyType,
            unitNumber: this.unitNumber,
          }}
          isInitValid={this.propertyType === 'CONDO' || (this.propertyType === 'TOWNHOME' && this.isUnitNumber) ? true : !this.isUnitNumber}
          validateShema={this.isUnitNumber && unitNumberValidateSheme}
          onSubmit={this.nextStep}
          buttonLabel={intl.get('kwlead.property.button')}
          dataTestId="confirmButton"
        >
          {this.renderFormChildren}
        </CustomForm>
        <Icon className={classnames(classes.icon, classes.clouds)} name="clouds" />
      </PropertyPersonalTemplate>
    );
  }
}
