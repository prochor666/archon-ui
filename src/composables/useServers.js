import { r } from './useApi';
import { keeper } from './utils';

export const listServers = async (filter = {}) => {
    const res =
        (await r({
            endpoint: `${keeper('apiUrl')}/v1/servers`,
            authToken: keeper('authToken'),
            method: 'get',
            data: filter,
        })) || [];

    if (!res.status || !res.servers) {
        return [];
    }
    console.log('useServers.js: listServers', res);
    return res.servers;
};

export const getServer = async (id) => {
    let res = {};

    if (id !== '0') {
        res =
            (await r({
                endpoint: `${keeper('apiUrl')}/v1/servers/${id}`,
                authToken: keeper('authToken'),
                method: 'get',
            })) || {};
    }
    //console.log('useServers.js: getServer', res.server);
    return res.server;
};

export const saveServer = async (data, saving = {}) => {
    let method = 'put',
        endpoint = `${keeper('apiUrl')}/v1/servers/${data._id}`;

    if (data._id === '0') {
        method = 'post';
        endpoint = `${keeper('apiUrl')}/v1/servers`;
        delete data._id;
    }

    const res = await r({
        endpoint: endpoint,
        authToken: keeper('authToken'),
        method: method,
        data: data,
    });
    //console.log('useServers.js: saveServer', res);
    saving.active = false;
    return res;
};

export const useServers = () => {
    return {
        listServers: listServers,
        getServer: getServer,
        saveServer: saveServer,
    };
};

export default useServers;
