import { ark, keeper } from './utils';
import { r } from './useApi';
import { load } from './useConfig';

const config = load();

export const recover = async (login) => {
    const result = await r({
        endpoint: `${keeper('apiUrl')}/v1/auth/recover`,
        method: 'post', // use get/delete/patch/put for debugging
        data: {
            login: login,
        },
    });

    return result;
};

export const activate = async (ulc, pin) => {
    const result = await r({
        endpoint: `${keeper('apiUrl')}/v1/auth/activate`,
        method: 'post',
        data: {
            ulc: ulc,
            pin: pin,
        },
    });

    if (ark(result, 'status') === true) {
        const roleRank = getUserRank(result.role);
        keeper('authToken', result.pwd || '');
        keeper('id', result.id);
        keeper('username', result.username);
        keeper('role', roleRank.role);
        keeper('rank', roleRank.rank);
        keeper('loginSource', 'login');
        //console.log('useAuth.js: activate result', result);
    } else {
        //console.log('useAuth.js: user activation failed', result);
    }
    return result;
};

export const isLoggedIn = async () => {
    const result = await r({
        endpoint: `${keeper('apiUrl')}/v1/auth`,
        authToken: keeper('authToken'),
    });

    if (
        result.status === true &&
        typeof result.data === 'object' &&
        Object.keys(result.data).length > 0
    ) {
        keeper('id', result.data.id);
        keeper('username', result.data.username);
        keeper('role', result.data.role);
        keeper('loginSource', 'logged');
        //console.log('useAuth.js: isLoggedIn ok result', result);
    } else {
        resetUser();
        //console.log('useAuth.js: isLoggedIn failed result', result);
    }

    return result;
};

export const getLoggedUser = async () => {
    return {
        id: keeper('id') || '',
        username: keeper('username') || '',
        role: keeper('role') || 'none',
        loginSource: keeper('loginSource') || 'preconfigured',
    };
};

export const refresh = async (apiUrl, authToken) => {
    return await r({
        endpoint: `${apiUrl}/v1/auth/login`,
        method: 'put',
        authToken: authToken,
    });
};

export const getUserRank = (role) => {
    let rank = 0;
    for (let _role in config.rank) {
        if (_role === role) {
            rank = config.rank[role];
        }
    }
    return {
        role,
        rank,
    };
};

export const resetUser = () => {
    const defaultUser = {
        id: '0',
        username: '',
        role: 'none',
        loginSource: 'preconfigured',
        authToken: '-FalseToken-',
    };
    keeper('id', defaultUser.id);
    keeper('username', defaultUser.username);
    keeper('role', defaultUser.role);
    keeper('authToken', defaultUser.authToken);
    keeper('loginSource', defaultUser.loginSource);
    return defaultUser;
};

export const logout = async () => {
    return resetUser();
};

export const useAuth = () => {
    return {
        isLoggedIn: isLoggedIn,
        recover: recover,
        activate: activate,
        refresh: refresh,
        logout: logout,
        getLoggedUser: getLoggedUser,
        getUserRank: getUserRank,
        resetUser: resetUser,
    };
};

export default useAuth;
