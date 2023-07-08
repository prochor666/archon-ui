import { r } from './useApi';
import { keeper } from './utils';

export const listUsers = async (filter = {}) => {
    const res =
        (await r({
            endpoint: `${keeper('apiUrl')}/v1/users`,
            authToken: keeper('authToken'),
            method: 'get',
            data: filter,
        })) || [];

    if (!res.status || !res.users) {
        return [];
    }

    // /console.log('useUsers.js: listUsers', res);
    return res.users;
};

export const getUser = async (id) => {
    let res = {};

    if (id !== '0') {
        res =
            (await r({
                endpoint: `${keeper('apiUrl')}/v1/users/${id}`,
                authToken: keeper('authToken'),
                method: 'get',
            })) || {};
    }

    if (!res.user) {
        res.user = {
            id: '0',
            role: 'none',
        };
    }

    //console.log('useUsers.js: getUser', res.user);

    return res.user;
};

export const saveUser = async (data, saving = {}) => {
    let method = 'put',
        endpoint = `${keeper('apiUrl')}/v1/users/${data._id}`;

    if (data._id === '0') {
        method = 'post';
        endpoint = `${keeper('apiUrl')}/v1/users`;
        delete data._id;
    }

    const res = await r({
        endpoint: endpoint,
        authToken: keeper('authToken'),
        method: method,
        data: data,
    });

    //console.log('useUsers.js: saveUser', res);
    saving.active = false;
    return res;
};

export const useUsers = () => {
    return {
        listUsers: listUsers,
        getUser: getUser,
        saveUser: saveUser,
    };
};

export default useUsers;
