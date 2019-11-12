import * as React from 'react';
import classnames from 'classnames';
import {Theme, MenuItem, Typography} from '@material-ui/core';
import debounce from 'lodash/debounce';

import {TextField} from 'ui/Components/TextField/TextField';
import {WithStyles, withStyles, CSSProperties} from 'ui/withStyles';
import {PaperBox} from 'ui/Components/PaperBox/PaperBox';

import {AppStoreProps} from 'content/app/App';
import {geocodeByAddress} from 'react-places-autocomplete';
const PlacesAutocomplete = require('react-places-autocomplete').default;

const styles = (theme: Theme) => ({
  input: {
    '& > div': {
      width: '100%',
      boxShadow: 'none',
      backgroundColor: '#efefef',
    },
    '& textarea': {
      paddingLeft: theme.spacing.unit,
      fontSize: 15,
      fontWeight: 400,
      overflow: 'hidden',
    },
  } as CSSProperties,
  paper: {
    padding: 0,
    marginTop: theme.spacing.unit,
    position: 'absolute',
    width: '100%',
    zIndex: 20,
    overflow: 'hidden',
  } as CSSProperties,
  autocomplete: {
    marginBottom: theme.spacing.unit,
    width: '100%',
    position: 'relative',
    '@media screen and (min-width: 800px)': {
      maxWidth: 405,
    },
  } as CSSProperties,
  description: {
    whiteSpace: 'pre-wrap',
  } as CSSProperties,
  menuItem: {
    height: '100%',
  } as CSSProperties,
});

export type MuiAutocompleteProps = WithStyles<typeof styles> &
  AppStoreProps & {
    className?: string;
    value: string;
    label?: string;
    readOnly?: boolean;
    onChange?: () => void;
    onSelect: (value: any) => void;
    setFieldTouched: any;
    setFieldValue: any;
    name?: string;
    errorText?: string;
    shouldCheckZeroResults?: boolean;
    placeholder?: string;
  };

@withStyles(styles)
export class MuiAutocomplete extends React.Component<MuiAutocompleteProps> {
  checkIfRealAddress = (addressesArray: any) =>
    addressesArray.length > 0 &&
    addressesArray.filter(
      (item: {types: string[]}) => !!item.types.filter(type => /(street_address|postal_code|premise)/.test(type)).length
    )[0];

  updateZeroResultsProperty = (response: any) => {
    const {setFieldValue} = this.props;
    const isZeroResults = !this.checkIfRealAddress(response);

    if (isZeroResults) {
      setFieldValue('zero_results', true);
    } else {
      setFieldValue('zero_results', false);
    }
  };

  onChangeHandler = async (value: string) => {
    const {setFieldValue, name, shouldCheckZeroResults, onChange} = this.props;
    setFieldValue(name, value);
    if (onChange) {
      onChange();
    }
    if (shouldCheckZeroResults) {
      try {
        const geocodeResponse = geocodeByAddress(value);
        const response = await geocodeResponse;
        this.updateZeroResultsProperty(response);
      } catch (err) {
        setFieldValue('zero_results', true);
      }
    }
  };

  onSelectHandler = async (address: string) => {
    const {setFieldValue, name} = this.props;
    try {
      const geocodeResponse = await geocodeByAddress(address);
      const properResult = this.checkIfRealAddress(geocodeResponse);
      this.updateZeroResultsProperty(geocodeResponse);

      if (!!properResult) {
        this.setAddressInfo(properResult);
      } else {
        setFieldValue(name, address);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  onBlurHandler = () => {
    const {setFieldTouched, name} = this.props;

    setFieldTouched(name, true);
  };

  setAddressInfo = (result: {place_id: string}) => {
    const {setFieldValue, name, onSelect} = this.props;
    const placeId = result.place_id;
    const request = {
      placeId,
      fields: ['name', 'photos', 'address_components', 'formatted_address', 'geometry', 'place_id'],
    };

    const callback = (place: any, status: google.maps.places.PlacesServiceStatus) => {
      // TODO remove any
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setFieldValue(name, place.formatted_address);
        onSelect({
          formattedAddress: place.formatted_address,
          addressComponent: place.address_components,
          location: place.geometry.location,
          placeId: place.place_id,
          photos: place.photos ? place.photos[0].getUrl() : '',
        });
      }
    };
    /* global google*/
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(request, callback);
  };

  render() {
    const {value} = this.props; // TODO: remove any
    return (
      <PlacesAutocomplete
        searchOptions={{
          types: ['address'],
          componentRestrictions: {
            country: ['us'],
          },
        }}
        value={value}
        onChange={this.onChangeHandler}
        onSelect={this.onSelectHandler}
        style={{color: 'red'}}
      >
        {(props: any) => {
          const {classes, readOnly, label, errorText, className, placeholder} = this.props;
          const {getInputProps, suggestions, getSuggestionItemProps} = props;

          return (
            <div className={classnames(classes.autocomplete, className)}>
              <TextField
                data-test-id="propertyAddressField"
                {...getInputProps({
                  readOnly,
                  label,
                  errorText,
                  disabled: readOnly,
                  type: 'text',
                  placeholder: !!placeholder ? placeholder : 'Enter your address',
                  onBlur: this.onBlurHandler,
                })}
              />
              {!!suggestions.length && (
                <PaperBox className={classes.paper}>
                  {suggestions.map((suggestion: any) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    return (
                      <MenuItem {...getSuggestionItemProps(suggestion, {className})} className={classes.menuItem}>
                        <Typography variant="body1" className={classes.description}>
                          {suggestion.description}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </PaperBox>
              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
    );
  }
}
