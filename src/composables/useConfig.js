export const load = () => {
    const _config = {
        name: 'ARCHON UI',
        description: 'Archon server user interface',
        keeper: {
            safe: false,
        },
        logLevel: ['console'], // 'console', 'log'
        roles: {
            any: [],
            all: ['none', 'user', 'editor', 'admin'],
            logged: ['user', 'editor', 'admin'],
            editors: ['editor', 'admin'],
            admins: ['admin'],
        },
        overrideSecurity: {
            routes: [],
            ids: [],
        },
        rank: {
            none: 0,
            user: 100,
            editors: 500,
            admin: 1000,
        },
        image: {
            maxWidth: 1024,
            maxHeight: 1024,
        },
        paginator: {
            limit: 10,
        },
        environments: {
            prod: {
                hosts: ['admin.archon.net'],
                apiUrl: 'https://archon.warp.rocks/api',
                requiredComplexity: 3,
            },
            dev: {
                hosts: ['localhost', 'archon-ui.test'],
                apiUrl: 'http://archon-ui.test:7007/api',
                requiredComplexity: 1,
            },
        },
        env: {},
    };

    _config.env = startEnv(_config.environments, getHostname());

    return _config;
};

export const startEnv = (environments, hostname) => {
    let _last = '',
        _env = {};
    for (let index in environments) {
        if (environments[index].hosts.length > 0 && environments[index].hosts.includes(hostname)) {
            _env = environments[index];
            _env.name = index;
            _env.host = hostname;
            return _env;
        } else if (environments[index].hosts.length === 0) {
            _last = index;
        }
    }

    if (_last !== '') {
        _env = environments[_last];
        _env.name = _last;
        _env.host = _env.hosts[0];
    }

    return _env;
};

export const getHostname = () => {
    return window.location.hostname;
};

export const useConfig = () => {
    return {
        load: load,
        startEnv: startEnv,
        getHostname: getHostname,
    };
};

export default useConfig;
