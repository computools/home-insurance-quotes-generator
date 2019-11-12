import * as React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {ButtonProps} from '@material-ui/core/Button';
import {Button as ButtonComponent} from '@material-ui/core/';
import {Typography} from '@material-ui/core';
import {withStyles, WithStyles} from 'ui/withStyles';
import {styles} from './styles';
import {Icon} from 'ui/Components/Icon/Icon';

export type CustomButtonProps = WithStyles<typeof styles> &
  ButtonProps & {
    gray?: boolean;
    gradient?: boolean;
    label: any;
    subLabel?: string;
    to?: string;
    linkStyles?: string;
    answer?: boolean;
    isLoading?: boolean;
    iconName?: string;
    disabled?: boolean;
    allowClicking?: boolean;
    onClick?: any;
    companyColor?: string;
    loaderclass?: string;
  };

@withStyles(styles)
export class Button extends React.Component<CustomButtonProps> {
  state = {
    disabled: false,
  };

  onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const {onClick, allowClicking} = this.props;
    if (typeof onClick === 'function') {
      !allowClicking && this.setState({disabled: true});
      onClick(event);
    }
  };

  renderLoading = () => {
    const {classes, loaderclass} = this.props;
    return (
      <span className={classnames(classes.buttonLoadingState, loaderclass)}>
        <i />
        <i />
        <i />
        <i />
      </span>
    );
  };

  renderChildren = () => {
    const {
      classes,
      label,
      subLabel,
      variant,
      gray,
      gradient,
      answer,
      isLoading,
      iconName,
      className,
      onClick,
      allowClicking,
      companyColor,
      ...rest
    } = this.props;
    const {disabled} = this.state;
    return (
      <ButtonComponent
        variant={variant}
        className={classnames(classes.default, className, {
          [classes.primary]: variant === 'contained',
          [classes.withIcon]: !!iconName,
          [classes.gray]: gray && variant === 'contained',
          [classes.grayOutlined]: gray && variant === 'outlined',
          [classes.gradientOutlined]: variant === 'outlined',
          [classes.answer]: !!answer,
          [classes.withSubLabel]: !!subLabel,
        })}
        disabled={disabled}
        onClick={this.onClickHandler}
        {...rest}
      >
        {isLoading ? (
          this.renderLoading()
        ) : (
          <>
            <div
              className={classnames({
                [classes.labelWithIconContainer]: !!iconName,
              })}
            >
              {iconName && answer && <Icon name={iconName} className={classes.icon} />}
              <Typography style={!!companyColor ? {color: companyColor} : {}} variant="body1">
                {label}
              </Typography>
            </div>
            {subLabel && (
              <div className={classes.subLabel}>
                <Typography variant="body1">{subLabel}</Typography>
              </div>
            )}
            {answer && <Icon name="arrowLeft" />}
          </>
        )}
      </ButtonComponent>
    );
  };

  render() {
    const {to, classes} = this.props;
    return (
      <>
        {to ? (
          <Link className={classnames(classes.link)} to={to}>
            {this.renderChildren()}
          </Link>
        ) : (
          <>{this.renderChildren()}</>
        )}
      </>
    );
  }
}
