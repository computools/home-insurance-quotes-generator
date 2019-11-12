import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import {Stepper} from 'content/kwlead/PropertyPersonal/templates/Stepper/Stepper';
import {AppStoreProps} from 'content/app/App';
import {RouteComponentProps} from 'react-router-dom';
import {PropertyStore} from 'state/PropertyStore';

import {LeadHomeType} from 'content/kwlead/OrganicPropertyPersonal/LeadHomeType/LeadHomeType';
import {LeadPropertyUsage} from 'content/kwlead/OrganicPropertyPersonal/LeadPropertyUsage/LeadPropertyUsage';
import {LeadHomeDetails} from 'content/kwlead/OrganicPropertyPersonal/LeadHomeDetails/LeadHomeDetails';
import {LeadBedrooms} from 'content/kwlead/OrganicPropertyPersonal/LeadBedrooms/LeadBedrooms';
import {LeadBathrooms} from 'content/kwlead/OrganicPropertyPersonal/LeadBathrooms/LeadBathrooms';
import {LeadFireplaces} from 'content/kwlead/OrganicPropertyPersonal/LeadFirePlaces/LeadFireplaces';
import {LeadExteriorType} from 'content/kwlead/OrganicPropertyPersonal/LeadExteriorType/LeadExteriorType';
import {LeadRoofType} from 'content/kwlead/OrganicPropertyPersonal/LeadRoofType/LeadRoofType';
import {LeadFoundationType} from 'content/kwlead/OrganicPropertyPersonal/LeadFoundationType/LeadFoundationType';
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
export class OrganicPropertyPersonal extends React.Component<AppStoreProps & RouteComponentProps> {
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
          <LeadHomeType />
          <LeadPropertyUsage history={history} />
          <LeadHomeDetails />
          <LeadBedrooms />
          <LeadBathrooms />
          <LeadFireplaces />
          <LeadExteriorType />
          <LeadRoofType />
          <LeadFoundationType />
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
