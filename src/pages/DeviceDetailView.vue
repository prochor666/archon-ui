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
                                {{ t('deviceBasics') }}
                            </h2>

                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-2">
                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="device-name"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceName') }}
                                    </label>
                                    <input
                                        id="device-name"
                                        v-model="device.data.name"
                                        type="text"
                                        name="device-name"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                        :class="
                                            ark(device.data, 'name', '').length === 0
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        "
                                    />
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="mac-address"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceMAC') }}
                                    </label>
                                    <input
                                        id="mac-address"
                                        v-model="device.data.mac"
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
                                        for="device-ip"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceIp') }}
                                    </label>
                                    <input
                                        id="device-ip"
                                        v-model="device.data.ip"
                                        type="text"
                                        name="device-ip"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="device-description"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceDescription') }}
                                    </label>
                                    <input
                                        id="device-description"
                                        v-model="device.data.description"
                                        type="text"
                                        name="device-description"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="device-content"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceContent') }}
                                    </label>
                                    <input
                                        id="device-content"
                                        v-model="device.data.content"
                                        type="text"
                                        name="device-content"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div class="block py-4 sm:py-0">
                                    <div class="www py-2 px-1 sm:p-4">
                                        <label
                                            for="role"
                                            class="block text-sm font-medium text-gray-700 select-none"
                                        >
                                            {{ t('deviceType') }}
                                        </label>
                                        <select
                                            id="role"
                                            v-model="device.data.type"
                                            name="role"
                                            class="mt-1 block w-full bg-white border border-gray-300 rounded py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                                        >
                                            <option
                                                v-for="deviceType in deviceTypes"
                                                :key="deviceType"
                                            >
                                                {{ deviceType }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="device.data._id.length > 1" class="space-y-2">
                            <h2 class="pt-4 font-medium px-1 sm:p-4 select-none">
                                {{ t('deviceSettings') }}
                            </h2>

                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-2">
                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="device-settings-content-path"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceSettingsContentPath') }}
                                    </label>
                                    <input
                                        id="device-settings-content-path"
                                        v-model="device.data.settings.contentPath"
                                        type="text"
                                        name="device-settings-content-path"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                        :class="
                                            ark(device.data.settings, 'contentPath', '').length ===
                                            0
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        "
                                    />
                                </div>
                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="device-settings-pin"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceSettingsPIN') }}
                                    </label>
                                    <input
                                        id="device-settings-pin"
                                        v-model="device.data.settings.pin"
                                        type="text"
                                        name="device-settings-pin"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                        :class="
                                            ark(device.data.settings, 'pin', '').length === 0
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        "
                                    />
                                </div>
                                <div class="www py-2 px-1 sm:p-4">
                                    <SwitchGroup as="div" class="flex items-center mt-6">
                                        <Switch
                                            v-model="device.data.active"
                                            :class="[
                                                device.data.active
                                                    ? 'bg-indigo-600 focus:ring-indigo-600'
                                                    : 'bg-gray-200 focus:ring-gray-300',
                                                'select-none relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                                            ]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                :class="[
                                                    device.data.active
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
                                                {{ t('deviceActive') }} &#10150;
                                            </div>
                                            <div v-if="!device.data.active" class="text-gray-500">
                                                {{ t('deviceSettingsPINShow') }}
                                            </div>
                                            <div v-if="device.data.active" class="text-gray-500">
                                                {{ t('deviceSettingsContentShow') }}
                                            </div>
                                        </SwitchLabel>
                                    </SwitchGroup>
                                </div>
                                <div class="www py-2 px-1 sm:p-4">
                                    <SwitchGroup as="div" class="flex items-center mt-6">
                                        <Switch
                                            v-model="device.data.settings.master"
                                            :class="[
                                                device.data.settings.master
                                                    ? 'bg-indigo-600 focus:ring-indigo-600'
                                                    : 'bg-gray-200 focus:ring-gray-300',
                                                'select-none relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                                            ]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                :class="[
                                                    device.data.settings.master
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
                                                {{ t('deviceSettingsMaster') }} &#10150;
                                            </div>
                                            <div
                                                v-if="!device.data.settings.master"
                                                class="text-gray-500"
                                            >
                                                {{ t('deviceSettingsMasterSlave') }}
                                            </div>
                                            <div
                                                v-if="device.data.settings.master"
                                                class="text-gray-500"
                                            >
                                                {{ t('deviceSettingsMasterShow') }}
                                            </div>
                                        </SwitchLabel>
                                    </SwitchGroup>
                                </div>

                                <div class="www py-2 px-1 sm:p-4">
                                    <label
                                        for="role"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceMetaLastUpdate') }}
                                    </label>
                                    <p
                                        class="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                                    >
                                        <time :datetime="device.data.meta.last_update">
                                            {{
                                                $dayjs(device.data.meta.last_update).format(
                                                    'D. M. YYYY HH:mm',
                                                ) || '&#128752;'
                                            }}
                                        </time>
                                    </p>
                                </div>
                                <div class="www py-2 px-1 sm:p-4 col-span-2">
                                    <label
                                        for="role"
                                        class="block text-sm font-medium text-gray-700 select-none"
                                    >
                                        {{ t('deviceMetaOsStats') }}
                                    </label>
                                    <p
                                        class="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm text-sm sm:text-sm"
                                    >
                                        <CodeBlock
                                            v-if="
                                                ark(device.data.meta, 'os_stats', false) !== false
                                            "
                                            :code="JSON.stringify(device.data.meta.os_stats)"
                                            :highlightjs="true"
                                            lang="json"
                                            code-block-radius="0.25rem"
                                            theme="obsidian"
                                        />
                                        <span v-if="!device.data.meta.os_stats">&#128752;</span>
                                    </p>
                                </div>
                                <!-- <div class="www py-2 px-1 sm:p-4">
                                    <label for="first-name" class="block text-sm font-medium text-gray-700 select-none">
                                        {{ t('deviceMeta') }}[widgets]
                                    </label>
                                    <input
                                        id="device-name"
                                        v-model="device.data.meta.widgets"
                                        type="text"
                                        name="device-name"
                                        autocomplete="off"
                                        class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm"
                                        :class="
                                            ark(device.data, 'name', '').length === 0
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        "
                                    />
                                </div> -->
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
                                v-if="device.data._id.length > 1"
                                class="border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-white"
                                :class="
                                    result.canSave === true
                                        ? 'bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                                        : 'bg-gray-400 hover:bg-gray-400 focus:outline-none cursor-not-allowed'
                                "
                                :disabled="result.canSave === false"
                                @click="getDeviceData()"
                            >
                                <MdiRefresh class="w-6 h-6 mr-2" />
                                {{ t('buttonRefresh') }}
                            </button>

                            <button
                                v-if="device.data._id.length > 1"
                                class="border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-white"
                                :class="
                                    result.canSave === true
                                        ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        : 'bg-gray-400 hover:bg-gray-400 focus:outline-none cursor-not-allowed'
                                "
                                :disabled="result.canSave === false"
                                @click="
                                    saving.active = true;
                                    sendDeviceData();
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
                                    sendDeviceData(true);
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
import { getDevice, saveDevice } from '../composables/useDevices';
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

const deviceid = route.params.deviceid || '';

const device = reactive({
    data: {
        _id: '0',
        name: 'RPI test',
        mac: '9c:fc:e8:81:b4:5a',
        ip: '127.0.0.1',
        ip_type: 'ipv4',
        description: 'Mock device',
        content: 'Some text',
        type: 'arm',
        active: false,
        ref: '',
        meta: {},
        settings: {},
    },
});

const result = reactive({
    loading: true,
    canSave: false,
    isValidMACAddress: false,
});

const deviceTypes = ['arm', 'x86'];

if (!route.params.deviceid) {
    result.loading = false;
} else {
    setTimeout(async () => {
        await getDeviceData();
    }, 400);
}

const getDeviceData = async () => {
    saving.active = true;
    device.data = await getDevice(deviceid);
    result.loading = false;
    saving.active = false;
    //console.log('DeviceDetailView.vue device', device);
    if (typeof device.data !== 'object' || Object.keys(device.data).length === 0) {
        router.push({ name: 'page-404' });
    }
};

const sendDeviceData = async (andClose = false) => {
    saving.active = true;

    const deviceData = cloneData(device.data);
    delete deviceData['meta'];
    const result = await saveDevice(deviceData, saving);

    if (ark(result, 'status') === true) {
        notify(
            {
                group: 'success',
                title: t('Device'),
                text: `Device "${deviceData.name}" updated`,
            },
            2500,
        );
        //console.log('DeviceDetailView.vue ok save result', result);
        saving.active = false;
        if (andClose === true) {
            router.push({ name: 'devices' });
        }
    } else {
        // Notify problem
        // let note = ark(result, 'message', 'Error logging in');
        let note = 'Device';
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

watch(device, () => {
    validateDeviceData();
    //console.log('DeviceDetailView.vue watch result', r);
});

const validateDeviceData = () => {
    result.canSave = false;
    if (ark(device.data, 'mac') !== false && isMACAddress(device.data.mac)) {
        result.isValidMACAddress = true;
    }

    if (result.isValidMACAddress && ark(device.data, 'name', '').length > 0) {
        result.canSave = true;
    }
};

validateDeviceData();

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'devices',
        title: t('Devices'),
    },
    {
        name: 'device',
        title: t('Device'),
        final: true,
    },
];

const headMeta = metaFind(route.name);
</script>
