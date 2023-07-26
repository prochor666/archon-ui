import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import dayjs from 'dayjs';
import Notifications from 'notiwind';
import { notify } from 'notiwind';
import { t } from './composables/i18n';
import { load } from './composables/useConfig';
import { isLoggedIn, getLoggedUser } from './composables/useAuth';
import { keeper } from './composables/utils';

import App from './App.vue';
import Dashboard from './pages/DashboardView.vue';
import Users from './pages/UsersView.vue';
import Me from './pages/MeView.vue';
import UserDetail from './pages/UserDetailView.vue';
import Devices from './pages/DevicesView.vue';
import DeviceDetail from './pages/DeviceDetailView.vue';
import Sites from './pages/SitesView.vue';
//import SiteDetail from './pages/SiteDetailView.vue';
import PageNotFound from './pages/PageNotFoundView.vue';
import Settings from './pages/SettingsView.vue';
import Login from './pages/LoginView.vue';
import Activate from './pages/ActivateView.vue';
import UITest from './pages/UITestView.vue';
import CodeBlock from 'vue3-code-block';
import './index.css';

const config = load();

keeper('env', config.env.name);
keeper('apiUrl', config.env.apiUrl);
keeper('requiredComplexity', config.env.requiredComplexity);
keeper('safe', config.keeper.safe);
keeper('db', config.keeper.safe ? 'sessionStorage' : 'localStorage');
keeper('imageMaxWidth', config.image.maxWidth);
keeper('imageMaxHeight', config.image.maxHeight);

const routes = [
    {
        path: '/',
        component: Dashboard,
        name: 'dashboard',
        meta: { requiredRoles: config.roles.logged, transition: 'slide-left' },
    },
    {
        path: '/users',
        component: Users,
        name: 'users',
        meta: { requiredRoles: config.roles.admins },
    },
    {
        path: '/devices',
        component: Devices,
        name: 'devices',
        meta: { requiredRoles: config.roles.editors },
    },
    {
        path: '/device/:deviceid?',
        component: DeviceDetail,
        name: 'device',
        meta: { requiredRoles: config.roles.editors },
    },
    {
        path: '/sites',
        component: Sites,
        name: 'sites',
        meta: { requiredRoles: config.roles.admins },
    },
    {
        path: '/user/:userid?',
        component: UserDetail,
        name: 'user',
        meta: { requiredRoles: config.roles.admins },
    },
    {
        path: '/me',
        component: Me,
        name: 'me',
        meta: { requiredRoles: config.roles.logged },
    },
    {
        path: '/settings',
        component: Settings,
        name: 'settings',
        meta: { requiredRoles: config.roles.logged },
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: { requiredRoles: config.roles.all },
    },
    {
        path: '/activate',
        component: Activate,
        name: 'activate',
        meta: { requiredRoles: config.roles.all },
    },
    {
        path: '/ui-test',
        component: UITest,
        name: 'ui-test',
        meta: { requiredRoles: config.roles.logged },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'page-404',
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Avoid frame embedding
if (location !== parent.location) {
    //console.log('Frame detected & avoided');
    parent.location.href = 'https://www.google.com';
}

router.beforeEach(async (to) => {
    //console.clear();
    const requiredRoles = to.meta.requiredRoles || [];
    const loggedIn = await isLoggedIn();
    const loggedUser = await getLoggedUser();

    if (['login', 'activate'].includes(to.name)) {
        return true;
    }

    /* if (!!loggedIn.error && !!loggedIn.error.response && !!loggedIn.error.response.data && !!loggedIn.error.response.data) {
        console.log('main.js: route before: loggedIn error', loggedIn.error.response.data);
    } */

    let routeAllowed = false;

    if (typeof requiredRoles === 'object' && (requiredRoles.length === 0 || requiredRoles.includes(loggedUser.role))) {
        routeAllowed = true;
    }

    // Continue, when everything is ok
    if (loggedIn.status === true && loggedUser.role !== 'none') {
        if (routeAllowed === true) {
            keeper('returnUrl', to.path);
            return true;
        }

        notify(
            {
                group: 'warning',
                title: `${t('Sorry')}`,
                //text: `Sorry, you have no permission for ${to.path}`,
                text: `${t('NoPermission', { path: to.path })}`,
            },
            5000,
        );
        return false;
        //return false;
    }

    return '/login';
});

const app = createApp(App).component('CodeBlock', CodeBlock);

app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.t = t;
app.config.globalProperties.config = config;

app.use(router);
app.use(Notifications);

app.mount('#app');
