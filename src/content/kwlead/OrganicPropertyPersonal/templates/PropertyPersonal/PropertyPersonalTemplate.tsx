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
    description?: string;
    className?: string;
    buttonLabel?: string;
    buttonDescription?: string;
    hideButton?: boolean;
    helperTitle?: string;
    step?: number;
    background?: string;
    desktopBackground?: string;
    isDialogOpened?: boolean;
    helperRenderer?: (close: () => void) => React.ReactNode;
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
    this.scrollingTop();
  }

  componentDidUpdate() {
    this.checkIfOpenHelperDialog();
  }

  checkIfOpenHelperDialog() {
    const {isDialogOpened} = this.props;
    if (isDialogOpened) this.helperDialogState.open();
  }

  scrollingTop = () => {
    document.body.scrollTop = 0; // top For Safari
    document.documentElement.scrollTop = 0; // top For Chrome, Firefox, IE and Opera
  };

  render() {
    const {
      classes,
      className,
      children,
      nextStep,
      title,
      subheading,
      hideButton,
      buttonDescription,
      helperTitle,
      helperRenderer,
      background,
      desktopBackground,
      intl,
      step,
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
              </Typography>
            )}
            {this.isHelperExist && (
              <Row valign="center" className={classes.helperRow}>
                <Link onClick={() => this.helperDialogState.open()}>{helperTitle}</Link>
              </Row>
            )}
            {children}
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
                />
              ) : (
                <Button onClick={nextStep} fullWidth label={intl.get('kwlead.property.button')} subLabel={buttonDescription} />
              ))}
          </div>
        </Column>
      </>
    );
  }
}
