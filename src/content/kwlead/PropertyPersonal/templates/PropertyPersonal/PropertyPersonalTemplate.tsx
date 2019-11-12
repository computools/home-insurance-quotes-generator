import * as React from 'react';
import classnames from 'classnames';
import {Typography} from '@material-ui/core';
import {withStyles, WithStyles} from 'ui/withStyles';
import {inject, observer} from 'mobx-react';
import {AppStoreProps} from 'content/app/App';
import {Button} from 'ui/Components/Button/Button';
import {DialogState} from 'ui/Elements/Dialogs/BaseDialog';
import {Row, Column} from 'ui/Components/Layout/Flex';
import {HelperDialog} from 'ui/Elements/Dialogs/HelperDialog';
import {Link} from 'ui/Components/Typography/Typography';
import {BackgroundWrapper} from 'ui/Components/BackgroundWrapper/BackgroundWrapper';
import {setCorrectPath} from 'lib/utils';
import {styles} from './styles';

export type PropertyPersonalTemplateProps = WithStyles<typeof styles> &
  AppStoreProps & {
    nextStep?: () => void;
    title?: string;
    subheading?: string;
    url?: string;
    urlTarget?: '_blank' | '_self' | '_parent' | '_top';
    sublink?: string;
    description?: string;
    className?: string;
    buttonLabel?: string;
    buttonDescription?: string;
    hideButton?: boolean;
    helperTitle?: string;
    step?: number;
    background?: string;
    linkDescription?: boolean;
    desktopBackground?: string;
    isDialogOpened?: boolean;
    helperRenderer?: (close: () => void) => React.ReactNode;
    disabledButton?: boolean;
  };

@withStyles(styles)
@inject('intl')
@observer
export class PropertyPersonalTemplate extends React.Component<PropertyPersonalTemplateProps> {
  helperDialogState = new DialogState();
  get isHelperExist() {
    const {helperRenderer} = this.props;
    return !!helperRenderer;
  }

  componentDidMount() {
    this.checkIfOpenHelperDialog();
  }

  componentDidUpdate() {
    this.checkIfOpenHelperDialog();
  }

  checkIfOpenHelperDialog() {
    const {isDialogOpened} = this.props;
    if (isDialogOpened) this.helperDialogState.open();
  }

  render() {
    const {
      classes,
      className,
      children,
      nextStep,
      title,
      sublink,
      url,
      urlTarget = '_self',
      subheading,
      hideButton,
      buttonDescription,
      helperTitle,
      helperRenderer,
      background,
      desktopBackground,
      linkDescription,
      intl,
      step,
      disabledButton,
    } = this.props;
    return (
      <>
        {background && <BackgroundWrapper desktopBackground={desktopBackground} background={background} />}
        <Column className={classes.wrapper}>
          <Column className={classnames(classes.container, className)}>
            {title && (
              <Typography gutterBottom className={classes.title} variant="h5" data-test-id="header">
                {title}
              </Typography>
            )}
            {subheading && (
              <Typography gutterBottom className={classes.description} variant="body1">
                {subheading}
                {sublink ? (
                  <Link
                    className={classnames(classes.sublink, classes.helperMobile, linkDescription ? classes.sublinkDescr : '')}
                    data-test-id="helperLink"
                    target={urlTarget}
                    href={url}
                    onClick={this.helperDialogState.open}
                  >
                    {sublink}
                  </Link>
                ) : null}
              </Typography>
            )}
            {children}
            {this.isHelperExist && (
              <Row valign="center" className={classnames(classes.helperRow, classes.helperDesk)}>
                <Typography>
                  <Link onClick={() => this.helperDialogState.open()}>{helperTitle}</Link>
                </Typography>
              </Row>
            )}
            {this.isHelperExist && (
              <HelperDialog dialogstate={this.helperDialogState}>{helperRenderer(this.helperDialogState.close)}</HelperDialog>
            )}
          </Column>
          <div className={classes.buttonContainer}>
            {!!hideButton ||
              (step ? (
                <Button
                  onClick={nextStep}
                  fullWidth
                  to={setCorrectPath(`loading-page/${step}`)}
                  label={intl.get('kwlead.property.button')}
                  className={disabledButton ? classes.disabledButton : ''}
                  disabled={disabledButton}
                />
              ) : (
                <Button
                  onClick={nextStep}
                  fullWidth
                  label={intl.get('kwlead.property.button')}
                  className={disabledButton ? classes.disabledButton : ''}
                  disabled={disabledButton}
                  subLabel={buttonDescription}
                />
              ))}
          </div>
        </Column>
      </>
    );
  }
}
