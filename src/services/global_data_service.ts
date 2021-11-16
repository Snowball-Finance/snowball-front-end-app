import { apiService } from './api_service';
import { RequestTypes } from './constants';

export const GetCountriesAPI = () => {
  return apiService.fetchData({
    data: {},
    url: `main-data/country-list`,
    requestType: RequestTypes.GET,
  });
};
