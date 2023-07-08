import axios from 'axios';
import { reactive } from 'vue';
import { objectToQueryString, mergeObject } from './utils';

export const r = async (input) => {
    const requestHeaders = {
        'Content-Type': 'application/json',
        //Accept: 'text/html,application/json,application/xhtml+xml,application/xml; q=0.9,*/*;q=0.8',
        //Accept: 'application/json',
        Accept: '*/*',
    };

    let { endpoint: endpoint = '', method: method = 'get', data: data = {}, headers: headers = {}, authToken: authToken = '' } = input;

    if (typeof authToken === 'string' && authToken.length > 0) {
        requestHeaders.Authorization = `Bearer ${authToken}`;
    }

    headers = mergeObject(requestHeaders, headers);
    let responseObj = reactive({});

    let result = {
        init: true,
    };

    try {
        if (method === 'get') {
            const sendDataUrl = Object.keys(data).length > 0 ? `?${objectToQueryString(data)}` : '';
            result = await axios.get(`${endpoint}${sendDataUrl}`, {
                headers: headers,
            });
        } else if (method === 'delete') {
            result = await axios.delete(`${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
        } else {
            result = await axios[method](`${endpoint}`, data, {
                headers: headers,
            });
        }

        responseObj = reactive(await result.data);
        responseObj.responseStatus = await result.status;
        /*
        const allowedResponseStatuses = {
            200: 'OK',
            201: 'Created',
            202: 'Accepted',
            204: 'No Content',
        };
 */
        //console.log('useApi.js: responseObj.responseStatus ', responseObj.responseStatus);
    } catch (e) {
        console.log(`useApi.js: request error, method ${method}, url ${endpoint}`, e);
        responseObj.error = e;
    }

    return responseObj;
};

export const useApi = () => {
    return {
        r: r,
    };
};

export default useApi;
