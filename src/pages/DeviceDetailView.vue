<template>
    <Headify :data="headMeta" />

    <div>
        <!-- Navbar -->
        <NavigationMain />

        <div class="lg:pl-72">
            <main>
                <div class="w-full pt-20">
                    <!-- Your content -->
                    <Breadcrumbs :links="breadcrumbsLinks" class="pl-2 lg:pl-6 xl:pl-10 pr-4" />

                    <div v-if="result.loading === false" class="mx-auto max-w-2xl px-2 py-4 space-y-6">
                        <div class="sm:grid sm:grid-cols-2 sm:gap-x-2">
                            <div class="www py-2 px-1 sm:p-4">
                                <label for="first-name" class="block text-sm font-medium text-gray-700">
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
                                        device.data.name.length === 0
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                    "
                                />
                            </div>

                            <div class="www py-2 px-1 sm:p-4">
                                <label for="email-address" class="block text-sm font-medium text-gray-700">
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
                                <label for="first-name" class="block text-sm font-medium text-gray-700">
                                    {{ t('deviceIp') }}
                                </label>
                                <input
                                    id="first-name"
                                    v-model="device.data.ip"
                                    type="text"
                                    name="first-name"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div class="www py-2 px-1 sm:p-4">
                                <label for="last-name" class="block text-sm font-medium text-gray-700">
                                    {{ t('deviceDescription') }}
                                </label>
                                <input
                                    id="last-name"
                                    v-model="device.data.description"
                                    type="text"
                                    name="last-name"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div class="www py-2 px-1 sm:p-4">
                                <label for="last-name" class="block text-sm font-medium text-gray-700">
                                    {{ t('deviceContent') }}
                                </label>
                                <input
                                    id="last-name"
                                    v-model="device.data.content"
                                    type="text"
                                    name="last-name"
                                    autocomplete="off"
                                    class="mt-1 block w-full border rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none text-sm sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div class="block py-4 sm:py-0">
                                <div class="www py-2 px-1 sm:p-4">
                                    <label for="role" class="block text-sm font-medium text-gray-700">
                                        {{ t('deviceType') }}
                                    </label>
                                    <select
                                        id="role"
                                        v-model="device.data.type"
                                        name="role"
                                        class="mt-1 block w-full bg-white border border-gray-300 rounded py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                                    >
                                        <option v-for="deviceType in deviceTypes" :key="deviceType">
                                            {{ deviceType }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="fixed bottom-0 w-full md:static sm:col-span-2 select-none">
                                <div class="www py-2 px-1 sm:p-4 text-center">
                                    <button
                                        class="bg-gray-200 border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        @click="router.go(-1)"
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
                                            saveDevice(device.data, saving);
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
import { getDevice, saveDevice } from '../composables/useDevices';
import { t } from '../composables/i18n';
import { ark, isMACAddress } from '../composables/utils';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';
import Spinner from '../components/SpinnerComponent.vue';
import { metaFind } from '../composables/navs';
import { MdiContentSave, MdiChevronLeft } from 'materialdesignicons-vue3/icons/';

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
        device.data = (await getDevice(deviceid)) || {};
        result.loading = false;
    }, 400);
}

watch(device, (r) => {
    validateDeviceData();
    console.log('DeviceDetailView.vue watch result', r);
});

const validateDeviceData = () => {
    result.canSave = false;
    if (ark(device.data, 'mac') !== false && isMACAddress(device.data.mac)) {
        result.isValidMACAddress = true;
    }

    if (result.isValidMACAddress && device.data.name.length > 0) {
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
