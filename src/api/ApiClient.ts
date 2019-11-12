import {FetchOptions} from 'types/ApiClientTypes';
import {fetch as fetchWhatwg} from 'whatwg-fetch';
import {errorStoreInstance} from 'state/ErrorStore';

export const apiClient = async (url: string, options: FetchOptions, shouldnPopupError?: boolean) => {
  const {saveToLocalStorage, itemKey, ...rest} = options;
  if (!!saveToLocalStorage && rest.method === 'GET') {
    try {
      const response = await fetchWhatwg(url, rest);
      if ((response && !response.ok) || !response) {
        localStorage.setItem(itemKey, JSON.stringify({}));
        throw new Error(response.statusText);
      }
      const responseData = await response.json();
      localStorage.setItem(itemKey, JSON.stringify(responseData));
      return responseData;
    } catch (error) {
      console.log(error);
      return JSON.parse(localStorage.getItem(itemKey));
    }
  }
  const body = typeof rest.body === 'string' ? rest.body : JSON.stringify(rest.body);
  try {
    const response = await fetchWhatwg(url, {...rest, body});
    if ((response && !response.ok) || !response) {
      !!saveToLocalStorage && localStorage.setItem(itemKey, body);
      response.status === 400 && !shouldnPopupError
        ? errorStoreInstance.handleError({
            error: {errorCode: response.status, hasError: true},
          })
        : '';
      return response.status;
    }
    const responseData = await response.json();
    !!saveToLocalStorage && localStorage.setItem(itemKey, body);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};
