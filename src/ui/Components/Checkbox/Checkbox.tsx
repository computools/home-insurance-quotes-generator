import * as React from 'react';
import classnames from 'classnames';
import {Checkbox, Typography} from '@material-ui/core';
import {Icon} from 'ui/Components/Icon/Icon';
import {WithStyles, withStyles} from 'ui/withStyles';

import {styles} from './styles';

export type CustomCheckboxProps = WithStyles<typeof styles> & {
  checked?: boolean;
  onChange: any;
  label?: string;
  className?: string;
  helper?: boolean;
  withoutBorder?: boolean;
};

@withStyles(styles)
export class CustomCheckbox extends React.Component<CustomCheckboxProps> {
  render() {
    const {classes, checked, label, onChange, className, helper, withoutBorder, ...rest} = this.props;
    return (
      <label className={classes.label}>
        <div
          className={classnames(className, {
            [classes.border]: !helper && !checked && !withoutBorder,
            [classes.checked]: !helper && checked && !withoutBorder,
            [classes.withoutBorder]: withoutBorder,
          })}
        >
          <div
            className={classnames(className, {
              [classes.wrapper]: !helper,
              [classes.helperWrapper]: helper,
            })}
          >
            {!helper && label && <Typography variant="body1">{label}</Typography>}
            <Checkbox
              icon={<Icon name="checkbox" />}
              checkedIcon={<Icon name="checkboxActive" />}
              checked={checked || false}
              onChange={onChange}
              className={classes.checkbox}
              {...rest}
            />
            {helper && label && <Typography variant="body1">{label}</Typography>}
          </div>
        </div>
      </label>
    );
  }
}
