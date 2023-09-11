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
                        class="sm:grid sm:grid-cols-2 sm:gap-2 pl-1 lg:pl-4 xl:pl-8 pr-4"
                    >
                        <div class="space-y-2">
                            <h2 class="pt-4 font-medium px-1 sm:p-4 select-none">
                                {{ t('serverBasics') }}
                            </h2>

                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-2">
                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="server-name"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('serverName') }}
                                    </label>
                                    <input
                                        id="server-name"
                                        v-model="server.data.name"
                                        type="text"
                                        name="server-name"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                        :class="
                                            ark(server.data, 'name', '').length === 0
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        "
                                    />
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="role"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('serverOs') }}
                                    </label>
                                    <p
                                        class="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                                    >
                                        {{ server.data.os }}
                                    </p>
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="server-description"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('serverDescription') }}
                                    </label>
                                    <input
                                        id="server-owner"
                                        v-model="server.data.owner"
                                        type="text"
                                        name="server-owner"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="server-provider"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('serverContent') }}
                                    </label>
                                    <input
                                        id="server-provider"
                                        v-model="server.data.provider"
                                        type="text"
                                        name="server-provider"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div v-if="server.data._id.length > 1" class="space-y-2">
                            <h2 class="pt-4 font-medium px-1 sm:p-4 select-none">
                                {{ t('serverSettings') }}
                            </h2>

                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-2">
                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="mac-address"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('serverIp') }}
                                    </label>
                                    <input
                                        id="mac-address"
                                        v-model="server.data.ipv4"
                                        type="text"
                                        name="mac-address"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                        :class="
                                            result.isValidMACAddress === false
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        "
                                    />
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="server-ip"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('serverIp') }}
                                    </label>
                                    <input
                                        id="server-ip"
                                        v-model="server.data.ipv6"
                                        type="text"
                                        name="server-ip"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <SwitchGroup as="div" class="flex items-center mt-6">
                                        <Switch
                                            v-model="server.data.use"
                                            :class="[
                                                server.data.use
                                                    ? 'bg-indigo-600 focus:ring-indigo-600'
                                                    : 'bg-gray-200 focus:ring-gray-300',
                                                'select-none relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                                            ]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                :class="[
                                                    server.data.use
                                                        ? 'translate-x-4'
                                                        : 'translate-x-0',
                                                    'select-none pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                                ]"
                                            />
                                        </Switch>
                                        <SwitchLabel
                                            as="span"
                                            class="select-none cursor-pointer ml-3 text-sm"
                                        >
                                            <div class="font-medium text-gray-900">
                                                {{ t('serverActive') }} &#10150;
                                            </div>
                                            <div v-if="!server.data.use" class="text-gray-500">
                                                {{ t('serverSettingsPINShow') }}
                                            </div>
                                            <div v-if="server.data.use" class="text-gray-500">
                                                {{ t('serverSettingsContentShow') }}
                                            </div>
                                        </SwitchLabel>
                                    </SwitchGroup>
                                </div>
                                <div class="www py-2 px-1 sm:p-4">
                                    <SwitchGroup as="div" class="flex items-center mt-6">
                                        <Switch
                                            v-model="server.data.use"
                                            :class="[
                                                server.data.settings.master
                                                    ? 'bg-indigo-600 focus:ring-indigo-600'
                                                    : 'bg-gray-200 focus:ring-gray-300',
                                                'select-none relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                                            ]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                :class="[
                                                    server.data.publish
                                                        ? 'translate-x-4'
                                                        : 'translate-x-0',
                                                    'select-none pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                                ]"
                                            />
                                        </Switch>
                                        <SwitchLabel
                                            as="span"
                                            class="select-none cursor-pointer ml-3 text-sm"
                                        >
                                            <div class="font-medium text-gray-900">
                                                {{ t('serverSettingsMaster') }} &#10150;
                                            </div>
                                            <div v-if="!server.data.publish" class="text-gray-500">
                                                {{ t('serverSettingsMasterSlave') }}
                                            </div>
                                            <div v-if="server.data.publish" class="text-gray-500">
                                                {{ t('serverSettingsMasterShow') }}
                                            </div>
                                        </SwitchLabel>
                                    </SwitchGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="result.loading === false"
                        class="fixed bottom-0 w-full md:static sm:col-span-2 select-none"
                    >
                        <div class="www py-2 px-1 sm:p-4 text-center">
                            <button
                                class="bg-gray-200 border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                                @click="router.go(-1)"
                            >
                                <MdiChevronLeft class="w-6 h-6 mr-2" />
                                {{ t('buttonBack') }}
                            </button>

                            <button
                                v-if="server.data._id.length > 1"
                                class="border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-white"
                                :class="
                                    result.canSave === true
                                        ? 'bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                                        : 'bg-gray-400 hover:bg-gray-400 focus:outline-none cursor-not-allowed'
                                "
                                :disabled="result.canSave === false"
                                @click="getServerData()"
                            >
                                <MdiRefresh class="w-6 h-6 mr-2" />
                                {{ t('buttonRefresh') }}
                            </button>

                            <button
                                v-if="server.data._id.length > 1"
                                class="border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-white"
                                :class="
                                    result.canSave === true
                                        ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        : 'bg-gray-400 hover:bg-gray-400 focus:outline-none cursor-not-allowed'
                                "
                                :disabled="result.canSave === false"
                                @click="
                                    saving.active = true;
                                    sendServerData();
                                "
                            >
                                <MdiContentSave class="w-6 h-6 mr-2" />
                                {{ t('buttonSave') }}
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
                                    sendServerData(true);
                                "
                            >
                                <MdiContentSave class="w-6 h-6 mr-2" />
                                {{ t('buttonSaveAndClose') }}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <Spinner
        v-if="saving.active || result.loading"
        type="complex"
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
import { getServer, saveServer } from '../composables/useServers';
import { t } from '../composables/i18n';
import { notify } from 'notiwind';
import { ark, cloneData, isMACAddress } from '../composables/utils';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';
import Spinner from '../components/SpinnerComponent.vue';
import { metaFind } from '../composables/navs';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { MdiContentSave, MdiChevronLeft, MdiRefresh } from 'materialdesignicons-vue3/icons/';

const route = useRoute(),
    router = useRouter(),
    saving = reactive({
        active: false,
        text: `${t('loading')}`,
    });

const serverid = route.params.serverid || '';

const server = reactive({
    data: {
        _id: '0',
        name: 'RPI test',
        ipv4: '127.0.0.1',
        ipv6: 'ff::',
        os: 'NO OS',
        owner: 'system',
        provider: 'Local',
        publish: false,
        use: false,
        ssh_key: '',
        ssh_port: '',
        ssh_user: '',
        ssh_pwd: '',
        meta: {},
        settings: {},
    },
});

const result = reactive({
    loading: true,
    canSave: false,
    isValidMACAddress: false,
});

//const serverTypes = ['arm', 'x86'];

if (!route.params.serverid) {
    result.loading = false;
} else {
    setTimeout(async () => {
        await getServerData();
    }, 400);
}

const getServerData = async () => {
    saving.active = true;
    server.data = await getServer(serverid);
    result.loading = false;
    saving.active = false;
    console.log('ServerDetailView.vue server', server.data);
    if (typeof server.data !== 'object' || Object.keys(server.data).length === 0) {
        router.push({ name: 'page-404' });
    }
};

const sendServerData = async (andClose = false) => {
    saving.active = true;

    const serverData = cloneData(server.data);
    delete serverData['meta'];
    const result = await saveServer(serverData, saving);

    if (ark(result, 'status') === true) {
        notify(
            {
                group: 'success',
                title: t('Device'),
                text: `Device "${serverData.name}" updated`,
            },
            2500,
        );
        //console.log('DeviceDetailView.vue ok save result', result);
        saving.active = false;
        if (andClose === true) {
            router.push({ name: 'servers' });
        }
    } else {
        // Notify problem
        // let note = ark(result, 'message', 'Error logging in');
        let note = 'Server';
        let group = 'warning';
        if (
            !!result.error &&
            !!result.error.response &&
            !!result.error.response.data &&
            !!result.error.response.data.message
        ) {
            note = `${result.error.response.data.message}`;
            group = 'error';
        }
        notify(
            {
                group: group,
                title: t('Error'),
                text: note,
            },
            5000,
        );
        saving.active = false;
    }
};

watch(server, () => {
    validateServerData();
    //console.log('DeviceDetailView.vue watch result', r);
});

const validateServerData = () => {
    result.canSave = false;
    if (ark(server.data, 'ipv4') !== false && isMACAddress(server.data.ipv4)) {
        result.isValidMACAddress = true;
    }

    if (result.isValidMACAddress && ark(server.data, 'name', '').length > 0) {
        result.canSave = true;
    }
};

validateServerData();

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'servers',
        title: t('Servers'),
    },
    {
        name: 'server',
        title: t('Server'),
        final: true,
    },
];

const headMeta = metaFind(route.name);
</script>
