import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {observable, toJS} from 'mobx';
import {Stepper} from 'content/kwlead/PropertyPersonal/templates/Stepper/Stepper';
import {AppStoreProps} from 'content/app/App';
import {RouteComponentProps} from 'react-router-dom';
import {PropertyStore} from 'state/PropertyStore';
import {LeadUsage} from 'content/kwlead/PropertyPersonal/LeadUsage/LeadUsage';
import {LeadHomeDetails} from 'content/kwlead/PropertyPersonal/LeadHomeDetails/LeadHomeDetails';
import {LeadBedBath} from 'content/kwlead/PropertyPersonal/LeadBedBath/LeadBedBath';
import {LeadFireplaces} from 'content/kwlead/PropertyPersonal/LeadFirePlaces/LeadFireplaces';
import {LeadConstruction} from 'content/kwlead/PropertyPersonal/LeadConstruction/LeadConstruction';
import {LeadFireStations} from 'content/kwlead/PropertyPersonal/LeadFireStations/LeadFireStations';
import {LeadFireHydrant} from 'content/kwlead/PropertyPersonal/LeadFireHydrant/LeadFireHydrant';
import {LeadPetPool} from 'content/kwlead/PropertyPersonal/LeadPetPool/LeadPetPool';
import {LeadValuables} from 'content/kwlead/PropertyPersonal/LeadValuables/LeadValuables';
import {LeadDiscounts} from 'content/kwlead/PropertyPersonal/LeadDiscounts/LeadDiscounts';
import {LeadPersonalDetails} from 'content/kwlead/PropertyPersonal/LeadPersonalDetails/LeadPersonalDetails';
import {LeadCurrentAddress} from 'content/kwlead/PropertyPersonal/LeadCurrentAddress/LeadCurrentAddress';
import {LeadMaritalStatus} from 'content/kwlead/PropertyPersonal/LeadMaritialStatus/LeadMaritalStatus';
import {LeadBitingHistory} from 'content/kwlead/PropertyPersonal/LeadBitingHistory/LeadBitingHistory';
import {LeadFlaggedBreed} from 'content/kwlead/PropertyPersonal/LeadFlaggedBreed/LeadFlaggedBreed';

@inject('property', 'user')
@observer
export class PropertyPersonal extends React.Component<AppStoreProps & RouteComponentProps> {
  @observable
  dataFetched: boolean = false;
  async componentDidMount() {
    await this.props.property.getUserData();
    await this.props.property.getPropertyDetails();
    this.dataFetched = true;
  }
  render() {
    const {property, history} = this.props;
    return (
      this.dataFetched && (
        <Stepper<PropertyStore> history={history} store={property}>
          <LeadUsage history={history} />
          <LeadHomeDetails />
          <LeadBedBath />
          <LeadFireplaces />
          <LeadConstruction />
          <LeadFireStations />
          <LeadFireHydrant />
          <LeadPetPool history={history} />
          {property.petsPool.pets && <LeadFlaggedBreed />}
          {property.petsPool.pets && <LeadBitingHistory />}
          <LeadValuables history={history} />
          <LeadPersonalDetails />
          <LeadMaritalStatus />
          <LeadCurrentAddress history={history} />
          <LeadDiscounts history={history} />
        </Stepper>
      )
    );
  }
}
