import * as React from 'react';
import classnames from 'classnames';
import {observer, inject} from 'mobx-react';
import {History} from 'history';
import {Typography} from '@material-ui/core';
import {AppStoreProps} from 'content/app/App';
import {MuiImage} from 'ui/Components/MuiImage/MuiImage';
import {PropertyStore} from 'state/PropertyStore';
import {Icon} from 'ui/Components/Icon/Icon';
import {DialogState} from 'ui/Elements/Dialogs/BaseDialog';
import {PropertyPersonalTemplate} from '../templates/PropertyPersonal/PropertyPersonalTemplate';
import {Step} from 'content/kwlead/PropertyPersonal/templates/Stepper/Stepper';
import {Column} from 'ui/Components/Layout/Flex';
import {Button} from 'ui/Components/Button/Button';
import {setCorrectPath} from 'lib/utils';
import {withStyles, WithStyles} from 'ui/withStyles';
import {styles} from './styles';

const valuables = require('assets/images/valuables.svg');
const background = require('assets/images/Backgrounds/leadValuables.svg');
const desktopBackground = require('assets/images/Backgrounds/bicycle.svg');

export type LeadValuablesProps = AppStoreProps & Step<PropertyStore> & {history: History} & WithStyles<typeof styles>;

@inject('intl', 'property')
@withStyles(styles)
@observer
export class LeadValuables extends React.Component<LeadValuablesProps> {
  helperDialogState = new DialogState();
  handleClick = ({currentTarget: {value}}: React.MouseEvent<HTMLButtonElement>) => {
    const {property, history} = this.props;
    const path = setCorrectPath('loading-page/3');
    const valuables = value === 'true';
    property.update({valuables});
    property.updatePropertyDetails({
      extra_coverage_requested: valuables,
    });
    history.push(path);
    property.nextStep();
  };

  renderDialog = (confirm: () => void) => {
    const {intl, classes} = this.props;
    return (
      <Column align="center" className={classes.dialogContainer}>
        <MuiImage className={classes.helperImage} src={valuables} />
        <Typography data-test-id="helperHeader" className={(classes.text, classes.helperHeader)} variant="subheading" align="center">
          {intl.get('kwlead.property.valuables.dialog.helper.title')}
        </Typography>
        <Typography className={(classes.text, classes.helperSubheading)} variant="body1" align="center" gutterBottom>
          {intl.get('kwlead.property.valuables.helper.subheading')}
        </Typography>
        <Button
          className={classes.helperButton}
          data-test-id="closeHelperButton"
          onClick={confirm}
          label={intl.get('kwlead.property.flaggedBreed.helper.confirm')}
        />
      </Column>
    );
  };

  render() {
    const {intl, classes} = this.props;
    return (
      <PropertyPersonalTemplate
        title={intl.get('kwlead.property.valuables.title')}
        subheading={intl.get('kwlead.property.valuables.subheading')}
        description={intl.get('kwlead.property.valuables.description')}
        helperTitle={intl.get('kwlead.property.valuables.helper.title')}
        className={classes.containerDesktop}
        helperRenderer={this.renderDialog}
        sublink={intl.get('kwlead.property.valuables.helper.title')}
        background={background}
        desktopBackground={desktopBackground}
        hideButton
      >
        <div className={classes.desktopForm}>
          <Column>
            <Button data-test-id="Yes" value="true" answer onClick={this.handleClick} label={intl.get('common.yes')} />
            <Button data-test-id="No" value="false" answer onClick={this.handleClick} label={intl.get('common.no')} />
          </Column>
        </div>
        <Icon className={classnames(classes.icon, classes.clouds)} name="clouds" />
      </PropertyPersonalTemplate>
    );
  }
}
