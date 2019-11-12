import * as React from 'react';
import classnames from 'classnames';
import {MuiAutocomplete} from 'ui/Components/Autocomplete/MuiAutocomplete';
import {IntlProps} from 'content/app/App';
import {Column, Row} from 'ui/Components/Layout/Flex';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import {Typography, Theme, ClickAwayListener} from '@material-ui/core';
import {withStyles, WithStyles, CSSProperties} from 'ui/withStyles';
import {filteredAddressObject} from 'lib/utils';
import {staticAddressProperties} from 'lib/googleMapProperties';

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: 0,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    minHeight: theme.spacing.unit * 3,
    width: 'max-content',
    color: theme.palette.secondary.light,
  } as CSSProperties,
  titleContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: '10px',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3.8}px`,
    borderRadius: 20,
    backgroundColor: '#F6F6F7',
    minWidth: 190,
    minHeight: 40,
    '@media (min-width: 375px)': {
      marginTop: theme.spacing.unit * 4,
    },
    '@media (min-width: 768px) and (min-height: 380px)': {
      backgroundColor: '#fff',
      marginTop: theme.spacing.unit * 4,
    },
  } as CSSProperties,
  title: {
    fontSize: 16,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    '@media (min-width: 768px) and (min-height: 380px)': {
      fontSize: 32,
    },
  } as CSSProperties,
  subtitle: {
    fontSize: 16,
    color: '#676672',
    '@media (min-width: 768px) and (min-height: 380px)': {
      fontSize: 20,
    },
  } as CSSProperties,

  editLink: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    fontWeight: 400,
    width: 'auto',
    fontSize: 14,
    cursor: 'pointer',
    '@media (min-width: 375px)': {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
    },
    '@media (min-width: 768px) and (min-height: 380px)': {
      width: 'auto',
      position: 'absolute',
      bottom: 30,
      marginTop: 23,
      marginBottom: 45,
    },
  } as CSSProperties,

  autocomplete: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    width: '100%',
  } as CSSProperties,
});

export type MuiAutocompleteEditableProps = WithStyles<typeof styles> & {
  intl?: IntlProps;
} & {
  onSelect: (address: string) => void;
  label: string;
  value: string;
  name: string;
  setFieldValue: any;
  setFieldTouched: any;
  errorText: string;
  address: Array<any>;
  checkValidAddress?: (addressComponent: Array<any>) => void;
  onChange?: () => void;
  isValidAddress?: boolean;
  formattedAddress?: string;
  placeholder?: string;
};

type MuiAutocompleteEditableState = {
  value: string;
  isToggle: boolean;
};
@inject('intl')
@withStyles(styles)
@observer
export class MuiAutocompleteEditable extends React.Component<MuiAutocompleteEditableProps, MuiAutocompleteEditableState> {
  @observable isToggle = false;
  @observable isLoading = true;
  @action
  toggle() {
    const {setFieldValue, name, formattedAddress} = this.props;
    setFieldValue(name, formattedAddress);
    this.isToggle = !this.isToggle;
  }
  handleSelect = (value: any) => {
    const {setFieldValue, checkValidAddress, name, onSelect, isValidAddress} = this.props;

    checkValidAddress(value.addressComponent);
    if (isValidAddress) {
      setFieldValue(name, value);
      onSelect(value);
      this.toggle();
    }
  };
  handleClick = () => {
    this.props.isValidAddress && this.toggle();
  };

  handleEdit = () => {
    this.isToggle = true;
  };

  createTitle = (addressComponent: any, titleContainer: string, title: string, subtitle: string, onClick: () => void): any => {
    const {streetNumber, street, city, state} = !!addressComponent && filteredAddressObject(addressComponent, staticAddressProperties);
    return (
      <Column>
        <Row className={titleContainer} align="center" onClick={onClick} data-test-id="streetField">
          <Typography className={title}>
            {streetNumber ? streetNumber : ''} {street ? street : ''}
          </Typography>
        </Row>
        <Row align="center">
          <Typography className={subtitle}>{!!streetNumber && `in ${!!city ? `${city}, ` : ''} ${!!state ? `${state}` : ''}`}</Typography>
        </Row>
      </Column>
    );
  };

  render() {
    const {
      label,
      setFieldValue,
      setFieldTouched,
      errorText,
      value,
      onChange,
      name,
      classes: {autocomplete, titleContainer, title, subtitle, editLink, ...restClasses},
      intl,
      address,
      placeholder,
    } = this.props;
    return this.isToggle ? (
      <ClickAwayListener onClickAway={errorText ? this.handleEdit : this.handleClick}>
        <MuiAutocomplete
          className={autocomplete}
          name={name}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={value || ''}
          onChange={onChange}
          errorText={!this.props.isValidAddress ? intl.get('kwlead.property.confirmaddress.error-address') : errorText}
          onSelect={this.handleSelect}
          placeholder={placeholder}
        />
      </ClickAwayListener>
    ) : (
      <Column align="center">
        {this.createTitle(address, titleContainer, title, subtitle, this.handleEdit)}
        <Typography
          data-test-id="editAddressButton"
          variant="caption"
          className={editLink}
          classes={restClasses}
          onClick={this.handleClick}
        >
          {label}
        </Typography>
      </Column>
    );
  }
}
