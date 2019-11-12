import {observable, action} from 'mobx';
import {StepperStore} from 'state/basic/StepperStore';
import {Address} from 'state/models/property/Address';
import {Discounts} from 'state/models/property/Discounts';
import {Usage} from 'state/models/property/Usage';
import {HomeDetails} from 'state/models/property/HomeDetails';
import {BedBath} from 'state/models/property/BedBath';
import {Construction} from 'state/models/property/Construction';
import {PetsPool} from 'state/models/property/PetsPool';
import {PersonalDetails} from 'state/models/property/PersonalDetail';
import {PropertyDetailsApi} from 'api';
import {
  PropertyDetailsDataType,
  FireStationDistanceType,
  FireHydrantDistanceType,
  ExteriorType,
  RoofType,
  MaritalStatusType,
  EditedAddressType,
} from 'types/Properties';
import {filteredAddressObject, validateExteriorType, validateRoofType, getValueFromArray, getNamesWithPrefix} from 'lib/utils';
import moment from 'moment';
import {firehydrantTypes, firestationTypes} from 'lib/consts';
import {currentAddressProperties, addressProperties} from 'lib/googleMapProperties';
import {uniqBy} from 'lodash';

import {Quote} from 'csstype';

export class PropertyStore extends StepperStore {
  @observable
  address: Address = new Address();

  @observable
  currentAddress: Address = new Address();

  @observable
  usage: Usage = new Usage();

  @observable
  homeDetails: HomeDetails = new HomeDetails();

  @observable
  bedBath: BedBath = new BedBath();

  @observable
  fireplaces: number = 0;

  @observable
  construction: Construction = new Construction();

  @observable
  fireStationDistance: FireStationDistanceType = 'NO_ANSWER';

  @observable
  fireHydrantDistance: FireHydrantDistanceType = 'NO_ANSWER';

  @observable
  petsPool: PetsPool = new PetsPool();

  @observable
  flaggedBreed: boolean = false;

  @observable
  bitingHistory: boolean = false;

  @observable
  valuables: boolean = false;

  @observable
  personalDetails: PersonalDetails = new PersonalDetails();

  @observable
  maritalStatus: MaritalStatusType = 'SINGLE';

  @observable
  discounts: Discounts = new Discounts();

  @observable
  editedAddress: EditedAddressType = null;

  @action
  getPropertyAddress() {
    const address = JSON.parse(localStorage.getItem('address'));

    if (address) {
      const {addressComponent} = address;
      this.address = addressComponent;
      return addressComponent;
    }
  }

  @action
  update(props: Partial<PropertyStore>) {
    Object.assign(this, props);
  }

  @action
  reset() {
    this.address = new Address();
    this.currentAddress = new Address();
    this.usage = new Usage();
    this.homeDetails = new HomeDetails();
    this.bedBath = new BedBath();
    this.fireplaces = 0;
    this.construction = new Construction();
    this.fireStationDistance = 'NO_ANSWER';
    this.fireHydrantDistance = 'NO_ANSWER';
    this.petsPool = new PetsPool();
    this.flaggedBreed = false;
    this.bitingHistory = false;
    this.valuables = false;
    this.personalDetails = new PersonalDetails();
    this.maritalStatus = 'SINGLE';
    this.discounts = new Discounts();
    this.editedAddress = null;
  }

  @action
  async fetchPropertyFromAPI(address: string, adressObject?: any) {
    try {
      const property: PropertyDetailsDataType = await PropertyDetailsApi.getPropertyDetailsByAddress(address, adressObject);
      const {
        number_of_bedrooms,
        total_bath_count,
        year_built,
        building_area_sq_ft,
        no_of_stories,
        exterior_walls,
        roof_cover,
        fireplace,
        construction_type,
      } = property;

      this.bedBath.update({
        bathrooms: Math.round(total_bath_count) || 1,
        bedrooms: number_of_bedrooms || 0,
      });
      this.homeDetails.update({
        yearBuilt: year_built || 0,
        squareFeet: building_area_sq_ft || 0,
        stories: no_of_stories || 1,
      });
      this.update({
        fireplaces: fireplace ? 1 : 0,
      });
      this.construction.update({
        exteriorType: (!!exterior_walls && (validateExteriorType(exterior_walls) as ExteriorType)) || '',
        roofType: (!!roof_cover && (validateRoofType(roof_cover) as RoofType)) || '',
        foundationType: '',
      });
      localStorage.setItem(
        'fetchedPropertyDetails',
        JSON.stringify({
          construction_type: construction_type ? construction_type : 'frame',
          insuring_address: address,
          bathrooms: this.bedBath.bathrooms,
          bedrooms: this.bedBath.bedrooms,
          year_built: this.homeDetails.yearBuilt,
          square_feet: this.homeDetails.squareFeet,
          stories: this.homeDetails.stories,
          fireplaces: this.fireplaces,
          exterior_type: this.construction.exteriorType,
          roof_type: this.construction.roofType,
          foundation_type: this.construction.foundationType,
        })
      );
      return property;
    } catch (e) {
      this.handleError({
        error: {errorCode: e.name, errorBody: e.stack, hasError: true},
      });
      console.log('error', e);
    }
  }

  async getUserData() {
    try {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      const personalDetails = JSON.parse(localStorage.getItem('propertyDetails'));
      const profileData = !!personalDetails && personalDetails.first_name && personalDetails.date_of_birth ? personalDetails : userProfile;
      if (!!profileData && profileData.email) {
        this.personalDetails.update({
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          session_id: profileData.session_id,
          associatedKwuid: profileData.associated_kwuid,
          phone: profileData.phone,
          dateOfBirth: profileData.date_of_birth,
        });
      }
    } catch (error) {
      this.handleError({
        error: {errorCode: error.name, errorBody: error.stack, hasError: true},
      });
    }
  }

  @action
  async getContactDetails() {
    try {
      const currentAddress = JSON.parse(localStorage.getItem('currentAddress'));
      if (!!currentAddress) {
        const {placeId, photo, unit, addressComponent, formattedAddress, isInsuringAddress, location} = currentAddress;
        this.currentAddress.update({
          placeId,
          photo,
          unit,
          addressComponent,
          formattedAddress,
          isInsuringAddress,
          location,
        });
      }
    } catch (error) {
      this.handleError({
        error: {errorCode: error.name, errorBody: error.stack, hasError: true},
      });
    }
  }

  @action
  async getPropertyDetails() {
    try {
      const propertyDetails = JSON.parse(localStorage.getItem('propertyDetails'));
      const propertyUnitNumber = JSON.parse(localStorage.getItem('unitNumber'));
      const unitNumber = propertyUnitNumber ? propertyUnitNumber.unitNumber : '';
      const fetchedPropertyDetails = JSON.parse(localStorage.getItem('fetchedPropertyDetails'));
      if (!propertyDetails) {
        return;
      }
      const {
        /* tslint:disable */
        bathrooms,
        bedrooms,
        biting_history,
        burglar_alarm,
        exterior_type,
        extra_coverage_requested,
        fire_alarm,
        fire_hydrant_distance,
        fire_station_distance,
        fireplaces,
        flagged_breed,
        flood_zone,
        foundation_type,
        gas_leak,
        gated_community,
        hoa_member,
        pets,
        property_type,
        recent_renovations,
        roof_type,
        security_system,
        occupancy_type,
        smart_home,
        smoke_detector,
        sprinkler_system,
        square_feet,
        stories,
        usage_type,
        water_leak,
        year_built,
        pool,
      } = propertyDetails;
      /* tslint:enable */
      this.homeDetails.update({
        stories: stories || fetchedPropertyDetails.stories,
        yearBuilt: year_built || fetchedPropertyDetails.year_built,
        squareFeet: square_feet || fetchedPropertyDetails.square_feet,
      });
      this.usage.update({
        unitNumber,
        propertyType: property_type,
        usageType: usage_type,
        occupancyType: occupancy_type,
      });
      this.bedBath.update({
        bedrooms: bedrooms || fetchedPropertyDetails.bedrooms,
        bathrooms: bathrooms || fetchedPropertyDetails.bathrooms,
      });
      this.construction.update({
        exteriorType: exterior_type || fetchedPropertyDetails.exterior_type,
        roofType: roof_type || fetchedPropertyDetails.roof_type,
        foundationType: foundation_type || fetchedPropertyDetails.foundation_type,
      });
      this.petsPool.update({
        pool: pool || false,
        pets: pets || false,
      });
      this.discounts.update({
        smokeDetectors: smoke_detector || false,
        securitySystem: security_system || false,
        sprinklerSystem: sprinkler_system || false,
        gatedCommunity: gated_community || false,
        burglarAlarm: burglar_alarm || false,
        fireAlarm: fire_alarm || false,
        smartOrConnectedHome: smart_home || false,
        waterLeakDetection: water_leak || false,
        HOAMember: hoa_member || false,
        gasLeakDetection: gas_leak || false,
        recentRennovations: recent_renovations || false,
      });
      this.fireplaces = fireplaces || fetchedPropertyDetails.fireplaces;
      this.flaggedBreed = flagged_breed || false;
      this.bitingHistory = biting_history || false;
      (this.fireStationDistance = fire_station_distance),
        (this.fireHydrantDistance = fire_hydrant_distance),
        (this.valuables = extra_coverage_requested || false);
    } catch (error) {
      this.handleError({
        error: {errorCode: error.name, errorBody: error.stack, hasError: true},
      });
      console.log(error);
    }
  }

  async updatePropertyDetails(details: any) {
    try {
      const {session_id} = JSON.parse(localStorage.getItem('propertyDetails')) || 0;
      const response = await PropertyDetailsApi.updatePropertyDetails({
        session_id,
        ...details,
      });
      this.personalDetails.session_id = response.session_id;
      localStorage.setItem('propertyDetails', JSON.stringify({...response}));
    } catch (error) {
      this.handleError({
        error: {errorCode: error.name, errorBody: error.stack, hasError: true},
      });
      console.log(error);
    }
  }

  async postDetailsForQuote(details: any) {
    try {
      const {
        date_of_birth,
        session_id,
        extra_coverage_requested,
        fire_station_distance,
        fire_hydrant_distance,
        agent_id,
        current_address,
        current_country,
        current_address_unit,
        insuring_address,
        country,
        ...payload
      } = details;
      const {unitNumber} = JSON.parse(localStorage.getItem('unitNumber'));
      const {addressComponent} = JSON.parse(localStorage.getItem('address'));
      const {currentAddressComponent} = JSON.parse(localStorage.getItem('currentAddress'));
      const insuringAddressPayload = Array.isArray(addressComponent)
        ? filteredAddressObject(addressComponent, addressProperties)
        : getNamesWithPrefix(addressComponent, addressProperties);
      const currentAdressPayload = Array.isArray(currentAddressComponent)
        ? filteredAddressObject(currentAddressComponent, currentAddressProperties)
        : getNamesWithPrefix(currentAddressComponent, currentAddressProperties, 'current_');
      const fireHydrantPayload = getValueFromArray(firehydrantTypes, fire_hydrant_distance);
      const fireStationPayload = getValueFromArray(firestationTypes, fire_station_distance);

      const data = {
        ...payload,
        ...insuringAddressPayload,
        ...currentAdressPayload,
        date_of_birth,
        fire_station_distance: fireStationPayload,
        fire_hydrant_distance: fireHydrantPayload,
        valuables: extra_coverage_requested,
      };

      const requestBody = unitNumber ? Object.assign(data, {unit_number: unitNumber}) : data;

      await PropertyDetailsApi.createQuotes(requestBody);
    } catch (error) {
      console.log(error);
    }
  }

  async postNewDetailsForQuote(details: any) {
    try {
      const {
        date_of_birth,
        session_id,
        extra_coverage_requested,
        fire_station_distance,
        fire_hydrant_distance,
        agent_id,
        current_address,
        current_country,
        current_address_unit,
        insuring_address,
        country,
        ...payload
      } = details;

      localStorage.removeItem('quotes');
      localStorage.removeItem('activeQuote');
      localStorage.removeItem('updatedQuotes');
      const {unitNumber} = JSON.parse(localStorage.getItem('unitNumber'));
      const {addressComponent} = JSON.parse(localStorage.getItem('address'));
      const {currentAddressComponent} = JSON.parse(localStorage.getItem('currentAddress'));
      const insuringAddressPayload = Array.isArray(addressComponent)
        ? filteredAddressObject(addressComponent, addressProperties)
        : addressComponent;
      const currentAdressPayload = filteredAddressObject(currentAddressComponent, currentAddressProperties);
      const fireHydrantPayload = getValueFromArray(firehydrantTypes, fire_hydrant_distance);
      const fireStationPayload = getValueFromArray(firestationTypes, fire_station_distance);

      const {
        bathrooms,
        bedrooms,
        email,
        exterior_type,
        fireplaces,
        first_name,
        foundation_type,
        last_name,
        marital_status,
        occupancy_type,
        pets,
        pool,
        property_type,
        unit_number,
        roof_type,
        square_feet,
        stories,
        usage_type,
        year_built,
      } = payload;

      const data = {
        ...insuringAddressPayload,
        ...currentAdressPayload,
        bathrooms,
        bedrooms,
        email,
        exterior_type,
        fireplaces,
        first_name,
        foundation_type,
        last_name,
        marital_status,
        occupancy_type,
        pets,
        pool,
        property_type,
        unit_number,
        roof_type,
        square_feet,
        stories,
        usage_type,
        year_built,
        date_of_birth,
        fire_station_distance: fireHydrantPayload,
        fire_hydrant_distance: fireStationPayload,
        valuables: extra_coverage_requested,
        burglar_alarm: payload.burglarAlarm,
        smoke_detector: payload.smokeDetectors,
        security_system: payload.securitySystem,
        sprinkler_system: payload.sprinklerSystem,
        gated_community: payload.gatedCommunity,
        fire_alarm: payload.fireAlarm,
        smart_home: payload.smartOrConnectedHome,
        water_leak: payload.waterLeakDetection,
        hoa_member: payload.HOAMember,
        gas_leak: payload.gasLeakDetection,
        recent_renovations: payload.recentRennovations,
        flagged_breed: payload.flaggedBreed,
      };

      const requestBody = unitNumber ? Object.assign(data, {unit_number: unitNumber}) : data;

      await PropertyDetailsApi.createQuotes(requestBody);
      localStorage.setItem('phoneNumberGabi', '');
    } catch (error) {
      this.handleError({
        error: {errorCode: error.name, errorBody: error.stack, hasError: true},
      });
      return error;
    }
  }

  sortQuotes = (quotes: any) =>
    quotes.sort((a: any, b: any): any => {
      if (!a.annual_premium_quote) {
        return b.annual_premium_quote - a.annual_premium_quote;
      }
      return a.annual_premium_quote - b.annual_premium_quote;
    });

  getQuotes = async (): Promise<any> => {
    const paymentSent = JSON.parse(localStorage.getItem('paymentSent'));
    if (paymentSent) {
      return;
    }
    const response = await PropertyDetailsApi.getQuotes();
    const updatedQuotes = JSON.parse(localStorage.getItem('updatedQuotes'));
    const coverage = response && response[0].coverage;

    if (coverage) {
      const sortedQuotes = this.sortQuotes(response);
      localStorage.setItem('quote_date', JSON.stringify(moment()));
      localStorage.setItem('quotes', JSON.stringify(sortedQuotes));
    }

    if (!!updatedQuotes) {
      const uniqUpdatedQuotes = uniqBy([...updatedQuotes, ...response], (item: any) => item.carrier_name);
      const sortesQuotesUpdatedQuotes = this.sortQuotes(uniqUpdatedQuotes);
      localStorage.setItem('updatedQuotes', JSON.stringify(sortesQuotesUpdatedQuotes));
      return sortesQuotesUpdatedQuotes;
    }

    return response;
  };
}

export const propertyStoreInstance = new PropertyStore();
