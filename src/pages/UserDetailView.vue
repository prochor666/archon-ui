<template>
    <Headify :data="headMeta" />

    <div>
        <!-- Navbar -->
        <KeepAlive>
            <NavigationMain />
        </KeepAlive>

        <div class="lg:pl-72">
            <main>
                <div class="w-full pt-20">
                    <!-- Your content -->
                    <Breadcrumbs :links="breadcrumbsLinks" class="pl-2 lg:pl-6 xl:pl-10 pr-4" />

                    <div
                        v-if="result.loading === false"
                        class="mx-auto max-w-2xl px-2 py-4 space-y-6"
                    >
                        <div class="sm:grid sm:grid-cols-2 sm:gap-x-2">
                            <div class="www py-2 px-1 sm:p-4">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    {{ t('username') }}
                                </label>
                                <input
                                    id="user-name"
                                    v-model="user.data.username"
                                    type="text"
                                    name="first-name"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                    :class="
                                        ark(user.data, 'username', '').length === 0
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                    "
                                />
                            </div>

                            <div class="www py-2 px-1 sm:p-4">
                                <label
                                    for="email-address"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    {{ t('email') }}
                                </label>
                                <input
                                    id="email-address"
                                    v-model="user.data.email"
                                    type="text"
                                    name="email-address"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                    :class="
                                        result.emailIsValid === false
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                    "
                                />
                            </div>

                            <div class="www py-2 px-1 sm:p-4">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    {{ t('firstname') }}
                                </label>
                                <input
                                    id="first-name"
                                    v-model="user.data.firstname"
                                    type="text"
                                    name="first-name"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                    :class="
                                        ark(user.data, 'firstname', '').length === 0
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                    "
                                />
                            </div>

                            <div class="www py-2 px-1 sm:p-4">
                                <label
                                    for="last-name"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    {{ t('lastname') }}
                                </label>
                                <input
                                    id="last-name"
                                    v-model="user.data.lastname"
                                    type="text"
                                    name="last-name"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                    :class="
                                        ark(user.data, 'lastname', '').length === 0
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                    "
                                />
                            </div>

                            <div class="block py-4 sm:py-0">
                                <div v-if="result.canSetRole">
                                    <div class="www py-2 px-1 sm:p-4">
                                        <label
                                            for="role"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            {{ t('role') }}
                                        </label>
                                        <select
                                            id="role"
                                            v-model="user.data.role"
                                            name="role"
                                            class="mt-1 block w-full bg-white border border-gray-300 rounded py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                                            :disabled="loggedUser.role !== 'admin'"
                                        >
                                            <option v-for="r in config.roles.all" :key="r">
                                                {{ r.length === 0 ? 'none' : r }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div v-if="result.canSetRole === false">
                                    <div class="www py-2 px-1 sm:p-4 select-none">
                                        <label
                                            for="role"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            {{ t('role') }}
                                        </label>
                                        <p
                                            class="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                                        >
                                            {{ user.data.role }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="fixed bottom-0 w-full md:static sm:col-span-2 select-none">
                                <div class="www py-2 px-1 sm:p-4 text-center">
                                    <button
                                        class="bg-gray-200 border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                                        @click="router.push({ name: 'users' })"
                                    >
                                        <MdiChevronLeft class="w-6 h-6 mr-2" />
                                        {{ t('buttonBack') }}
                                    </button>

                                    <button
                                        class="border border-transparent rounded shadow-sm py-2 px-4 inline-flex justify-center text-base font-medium text-white"
                                        :class="
                                            result.canSave === true
                                                ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                : 'bg-gray-400 hover:bg-gray-400 focus:outline-none cursor-not-allowed'
                                        "
                                        :disabled="result.canSave === false"
                                        @click="
                                            saving.active = true;
                                            saveUser(user.data, saving);
                                        "
                                    >
                                        <MdiContentSave class="w-6 h-6 mr-2" />
                                        {{ t('buttonSave') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <Spinner
        v-if="saving.active || result.loading"
        type="dots"
        :color="`text-indigo-600`"
        :color2="`text-emerald-600`"
        :text-color="`text-emerald-400`"
        :overlay="true"
        :speed="1000"
        :dots="true"
        :dot-char="'.'"
        :dot-dual="false"
        :dot-reverse="false"
        :text="saving.text"
        :inline="false"
        :pulse="true"
    />
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { metaFind } from '../composables/navs';
import { getLoggedUser } from '../composables/useAuth';
import { getUser, saveUser } from '../composables/useUsers';
//import { notify } from 'notiwind';
import { load } from '../composables/useConfig';
import { ark, validateEmail } from '../composables/utils';
import { t } from '../composables/i18n';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Spinner from '../components/SpinnerComponent.vue';
import { MdiContentSave, MdiChevronLeft } from 'materialdesignicons-vue3/icons/';

const loggedUser = await getLoggedUser();

const route = useRoute(),
    router = useRouter(),
    saving = reactive({
        active: false,
        text: `${t('loading')}`,
    }),
    config = load();

const userid = route.params.userid || '';

const user = reactive({
    data: {
        _id: '0',
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        role: 'none',
    },
});

const result = reactive({
    loading: true,
    canSave: false,
    canSetRole: false,
    emailIsValid: false,
});

if (!route.params.userid) {
    result.loading = false;
} else {
    setTimeout(async () => {
        user.data = (await getUser(userid)) || {};
        result.loading = false;
        if (typeof user.data !== 'object' || Object.keys(user.data).length === 0) {
            router.push({ name: 'page-404' });
        }
    }, 400);
}

watch(user, (r) => {
    validateUserData();
    if (user.data._id === '0' && loggedUser.role !== 'admin') {
        router.push('/');
    }
    console.log('UserDetailView.vue watch result', r);
});

const validateUserData = () => {
    result.emailIsValid = validateEmail(user.data.email);
    result.canSetRole =
        user.data._id !== '0' && user.data._id !== loggedUser.id && loggedUser.role === 'admin'
            ? true
            : false;
    result.canSave =
        result.emailIsValid === true &&
        user.data.firstname.length > 0 &&
        user.data.lastname.length > 0 &&
        user.data.username.length > 0;
};

validateUserData();

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'users',
        title: t('Users'),
    },
    {
        title: userid === '0' ? t('new') : t('edit'),
        final: true,
    },
];

const headMeta = metaFind(route.name);
</script>
