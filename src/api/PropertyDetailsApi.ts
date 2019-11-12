import {apiClient} from 'api/ApiClient';
import {API_BASE_ENDPOINT} from 'config/vars';
import {companyThemeColors} from 'lib/consts';

import {filteredAddressObject} from 'lib/utils';
import {staticAddressProperties} from 'lib/googleMapProperties';
import {errorStoreInstance} from 'state/ErrorStore';

export class PropertyDetailsClass {
  async getContactDetails(contactId: number) {
    const contact = JSON.parse(localStorage.getItem('propertyDetails'));
    let id = 0;
    if (!contactId) {
      id = contact.id;
    } else {
      id = contactId;
    }
    const response = await apiClient(`${API_BASE_ENDPOINT}/quotes-mgr-contact-details/api/v1/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      itemKey: 'contactDetails',
      saveToLocalStorage: true,
    });
    return response;
  }

  async getPropertyDetailsByAddress(address: string, adressObject?: any) {
    const {session_id} = JSON.parse(localStorage.getItem('propertyDetails'));
    const addressComponent = !adressObject.postalCode ? adressObject.addressComponent : adressObject;
    const insuringAddressPayload = !addressComponent.postalCode
      ? filteredAddressObject(addressComponent, staticAddressProperties)
      : adressObject;
    const {streetNumber, postalCode, street, city, state} = insuringAddressPayload;

    const addressToPost = `${streetNumber} ${street}`;

    const response = await apiClient(`${API_BASE_ENDPOINT}/quotes-proxy-get-property-details/api/v1/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id,
        address: addressToPost,
        zipcode: postalCode,
      }),
      saveToLocalStorage: true,
    });

    localStorage.setItem(
      'address',
      JSON.stringify({
        ...(!adressObject.postalCode ? {...adressObject} : {addressComponent: adressObject}),
        formattedAddress: address,
      })
    );
    return response;
  }

  async updatePropertyDetails(details: any) {
    const {session_id} = JSON.parse(localStorage.getItem('propertyDetails')) || {session_id: null};

    const {id} = JSON.parse(localStorage.getItem('agentProfile')) || {id: null};

    const response = await apiClient(`${API_BASE_ENDPOINT}/quotes-mgr-contact/api/v1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...details,
        ...(session_id && {
          session_id,
        }),
        ...(id && {
          agent_id: id,
        }),
      }),
      itemKey: 'propertyDetails',
      saveToLocalStorage: true,
    });
    return response;
  }

  async createQuotes(details: any) {
    const {session_id} = JSON.parse(localStorage.getItem('propertyDetails'));
    const {construction_type} = JSON.parse(localStorage.getItem('fetchedPropertyDetails'));

    const {
      response: {quote_request_id},
    } = await apiClient(`${API_BASE_ENDPOINT}/quotes-svc-quotes-make-quote-request/api/v1/create_quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id,
        request: {
          ...details,
          construction_type: construction_type.toUpperCase(),
        },
      }),
      saveToLocalStorage: false,
    });
    localStorage.setItem('requestInfo', JSON.stringify({request_id: quote_request_id}));
  }

  getQuotes = async (): Promise<any> => {
    const {request_id: quote_request_id} = JSON.parse(localStorage.getItem('requestInfo'));
    const {session_id} = JSON.parse(localStorage.getItem('propertyDetails'));
    const {
      response,
      response: {rates},
    } = await apiClient(
      `${API_BASE_ENDPOINT}/quotes-svc-quotes-make-quote-request/api/v1/?quote_request_id=${quote_request_id}&session_id=${session_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        saveToLocalStorage: false,
      }
    );

    const checkIfAnyRateIsReturned = !!rates.filter((rate: any) => rate.status === 'succeeded')[0];

    if (response.status === 'succeeded' && !checkIfAnyRateIsReturned) {
      errorStoreInstance.handleError({error: {errorCode: 401}});
      return;
    }

    localStorage.setItem('loadingStatus', JSON.stringify(response.status));

    if (checkIfAnyRateIsReturned) {
      const updatedQuotesWithCorrectStatus = rates.filter(
        (quote: any) => quote.status.toLowerCase() === 'succeeded' && quote.payment_form_options.length > 0
      );

      const filteredQuotes = updatedQuotesWithCorrectStatus.filter(
        (rate: any) => !!companyThemeColors.filter(itemToFilter => itemToFilter.name === rate.carrier_name.split(' ').join(''))[0]
      );

      const updateQuoteCoverageProperties = filteredQuotes.map((quote: any) => {
        const {coverage} = quote;
        const coverageKeys = Object.keys(coverage);
        const coverageValues = Object.values(coverage);
        const coverageHasOptions = coverageValues.filter(
          (coverageItem: {options: number[]; value: string | number}) => !!coverageItem.options
        );

        if (!!coverageHasOptions.length) {
          const newCoverageProperties = coverageKeys.reduce((acc: any, coverageKey: any) => {
            const currentCoverage = coverage[coverageKey];
            const currentValueIndex = currentCoverage.options.indexOf(currentCoverage.value);
            const lastValueIndex = currentCoverage.options.length - 1;
            const payloadForProperty = {
              ...currentCoverage,
              cannotUpdateMinus: currentValueIndex === 0,
              cannotUpdatePlus: currentValueIndex >= lastValueIndex,
            };

            acc[coverageKey] = payloadForProperty;

            return acc;
          }, {});
          return {
            ...quote,
            coverage: {
              ...newCoverageProperties,
            },
          };
        }
        return quote;
      });

      const quotesWithUpdatedCompanyColors = updateQuoteCoverageProperties.map((quote: any) => {
        const correctCompany = companyThemeColors.filter(
          (company: {name: string; color: string; carrier_name: string}) => company.name === quote.carrier_name.split(' ').join('')
        )[0];

        return {
          ...quote,
          companyColor: correctCompany.color,
          logoName: quote.carrier_name.replace(/(\(([^]+)\)|\s)/g, '').toLowerCase(),
        };
      });

      return quotesWithUpdatedCompanyColors;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    return this.getQuotes();
  };

  async updateQuote(quoteId: string, details: any) {
    const {session_id} = JSON.parse(localStorage.getItem('propertyDetails'));
    const {request_id} = JSON.parse(localStorage.getItem('requestInfo'));
    const {response, rate_id} = await apiClient(`${API_BASE_ENDPOINT}/quotes-svc-quotes-make-quote-request/api/v1/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id,
        request: {
          quote_id: quoteId,
          ...details,
        },
      }),
      saveToLocalStorage: false,
    });
    localStorage.setItem('requestInfo', JSON.stringify({request_id, session_id}));
    return {response, rateId: rate_id};
  }
}
