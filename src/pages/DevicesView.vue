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

                    <div class="w-full max-w-7xl pr-4">
                        <div class="block">
                            <ul
                                v-if="result.loading === false"
                                role="list"
                                class="divide-y divide-gray-200"
                            >
                                <li v-for="device in result.devices" :key="device.name">
                                    <router-link
                                        :to="{
                                            name: 'device',
                                            params: {
                                                deviceid: device._id,
                                            },
                                        }"
                                        class="block hover:bg-gray-50"
                                    >
                                        <div class="flex items-center py-4">
                                            <div class="min-w-0 flex-1 flex items-start">
                                                <div
                                                    class="font-medium text-sm pl-3 lg:pl-7 xl:pl-11 text-gray-600"
                                                    :title="device._id"
                                                >
                                                    <MdiChip class="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div
                                                    class="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4"
                                                >
                                                    <div>
                                                        <p
                                                            class="text-base font-medium text-indigo-600 truncate"
                                                        >
                                                            {{ device.name }} ({{ device.ip }})
                                                        </p>
                                                        <p
                                                            class="mt-2 flex items-center text-sm text-gray-500"
                                                        >
                                                            <MdiFolderKeyNetwork
                                                                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                            />
                                                            <span class="truncate">
                                                                {{ device.mac }}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="hidden md:block">
                                                        <div>
                                                            <p class="text-xs text-gray-900">
                                                                {{ t('created') }}:
                                                                <strong class="mx-1">
                                                                    {{ device.creator }}
                                                                </strong>
                                                                <time :datetime="device.created_at">
                                                                    {{
                                                                        $dayjs(
                                                                            device.created_at,
                                                                        ).format('D. M. YYYY HH:mm')
                                                                    }}
                                                                </time>
                                                            </p>
                                                            <p
                                                                v-if="
                                                                    device.updater &&
                                                                    device.updater.length > 0
                                                                "
                                                                class="text-xs text-gray-900"
                                                            >
                                                                {{ t('updated') }}:
                                                                <strong class="mx-1">
                                                                    {{ device.updater }}
                                                                </strong>
                                                                <time :datetime="device.updated_at">
                                                                    {{
                                                                        $dayjs(
                                                                            device.updated_at,
                                                                        ).format('D. M. YYYY HH:mm')
                                                                    }}
                                                                </time>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="block">
                                                        <p
                                                            class="mt-2 flex items-center text-sm text-gray-500 font-medium"
                                                        >
                                                            <MdiCheckCircle
                                                                v-if="device.active"
                                                                class="flex-shrink-0 mr-2 h-5 w-5 text-emerald-400"
                                                            />
                                                            <MdiClock
                                                                v-if="!device.active"
                                                                class="flex-shrink-0 mr-2 h-5 w-5 text-red-400"
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <MdiChevronRight
                                                    class="w-5 h-5 mr-2 text-gray-400"
                                                />
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <button
        class="fixed bottom-6 right-6 p-2 border border-transparent rounded-full shadow-sm flex items-center justify-center font-medium text-white focus:outline-none bg-indigo-600 hover:bg-indigo-700"
        :title="t('buttonNewDevice')"
        @click="router.push({ name: 'device' })"
    >
        <MdiPlus class="w-10 h-10" />
    </button>

    <Spinner
        v-if="result.loading && result.devices.length === 0"
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
        :text="t('loading')"
        :inline="false"
        :pulse="true"
    />
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { metaFind } from '../composables/navs';
import { listDevices } from '../composables/useDevices';
import { t } from '../composables/i18n';
import Spinner from '../components/SpinnerComponent.vue';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';

import {
    MdiChip,
    MdiClock,
    MdiFolderKeyNetwork,
    MdiCheckCircle,
    MdiChevronRight,
    MdiPlus,
} from 'materialdesignicons-vue3/icons/';

const route = useRoute();
const router = useRouter();

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'devices',
        title: t('Devices'),
        final: true,
    },
];

const result = reactive({
    devices: [],
    loading: true,
});

setTimeout(async () => {
    result.devices = (await listDevices()) || [];
    result.loading = false;
}, 400);

const headMeta = metaFind(route.name);
</script>
