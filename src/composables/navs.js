import { t } from './i18n';

export const currentRouteMatch = (matchRoutes, routeName) => {
    return matchRoutes.includes(routeName);
};

export const metaFind = (routeName) => {
    const t = meta.filter((item) => {
        return item.matchRoutes.includes(routeName);
    }, routeName);

    return t.length > 0 ? t[0].tags : [];
};

const addTitleSuffix = (str) => {
    return `${str} | Archon Galaxy &#127756;`;
};

export const meta = [
    {
        matchRoutes: ['page-404'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Page404')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'Page not found',
                },
            },
        ],
    },
    {
        matchRoutes: ['dashboard'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Dashboard')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'App dashboard and stats',
                },
            },
        ],
    },
    {
        matchRoutes: ['profile'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Profile')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'User profile',
                },
            },
        ],
    },
    {
        matchRoutes: ['me'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('MyProfile')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'My profile',
                },
            },
        ],
    },
    {
        matchRoutes: ['users'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Users')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'View all users',
                },
            },
        ],
    },
    {
        matchRoutes: ['user'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('User')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'Edit user',
                },
            },
        ],
    },
    {
        matchRoutes: ['devices'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Devices')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'View all devices',
                },
            },
        ],
    },
    {
        matchRoutes: ['device'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Device')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'Edit device',
                },
            },
        ],
    },
    {
        matchRoutes: ['servers'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Servers')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'View all servers',
                },
            },
        ],
    },
    {
        matchRoutes: ['server'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Server')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'Edit Server',
                },
            },
        ],
    },
    {
        matchRoutes: ['login'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Login')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'System login',
                },
            },
        ],
    },
    {
        matchRoutes: ['activate'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Login')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'System login',
                },
            },
        ],
    },
    {
        matchRoutes: ['settings'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('Settings')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'Client local settings',
                },
            },
        ],
    },
    {
        matchRoutes: ['ui-test'],
        tags: [
            {
                tag: 'title',
                params: {
                    innerHTML: addTitleSuffix(`${t('UITest')}`),
                },
            },
            {
                tag: 'meta',
                params: {
                    name: 'description',
                    content: 'Templating UI test',
                },
            },
        ],
    },
];

export const navs = () => {
    return {
        currentRouteMatch: currentRouteMatch,
        meta: meta,
        metaFind: metaFind,
    };
};

export default navs;
