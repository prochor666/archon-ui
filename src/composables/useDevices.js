import { r } from './useApi';
import { keeper } from './utils';

export const listDevices = async (filter = {}) => {
    const res =
        (await r({
            endpoint: `${keeper('apiUrl')}/v1/devices`,
            authToken: keeper('authToken'),
            method: 'get',
            data: filter,
        })) || [];

    if (!res.status || !res.devices) {
        return [];
    }
    //console.log('useDevices.js: listDevices', res);
    return res.devices;
};

export const getDevice = async (id) => {
    let res = {};

    if (id !== '0') {
        res =
            (await r({
                endpoint: `${keeper('apiUrl')}/v1/devices/${id}`,
                authToken: keeper('authToken'),
                method: 'get',
            })) || {};
    }
    //console.log('useDevices.js: getDevice', res.device);
    return res.device;
};

export const saveDevice = async (data, saving = {}) => {
    let method = 'put',
        endpoint = `${keeper('apiUrl')}/v1/devices/${data._id}`;

    if (data._id === '0') {
        method = 'post';
        endpoint = `${keeper('apiUrl')}/v1/devices`;
        delete data._id;
    }

    const res = await r({
        endpoint: endpoint,
        authToken: keeper('authToken'),
        method: method,
        data: data,
    });
    //console.log('useDevices.js: saveDevice', res);
    saving.active = false;
    return res;
};

export const useDevices = () => {
    return {
        listDevices: listDevices,
        getDevice: getDevice,
        saveDevice: saveDevice,
    };
};

export default useDevices;
