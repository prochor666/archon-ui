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
                                <li v-for="server in result.servers" :key="server.name">
                                    <router-link
                                        :to="{
                                            name: 'server',
                                            params: {
                                                serverid: server._id,
                                            },
                                        }"
                                        class="block hover:bg-gray-50"
                                    >
                                        <div class="flex items-center py-4">
                                            <div class="min-w-0 flex-1 flex items-start">
                                                <div
                                                    class="font-medium text-sm pl-3 lg:pl-7 xl:pl-11 text-gray-600"
                                                    :title="server._id"
                                                >
                                                    <MdiServerNetwork
                                                        class="h-6 w-6 text-gray-400"
                                                    />
                                                </div>
                                                <div
                                                    class="min-w-0 flex-1 px-4 md:grid md:grid-cols-4 md:gap-4"
                                                >
                                                    <div
                                                        class="text-base font-medium text-indigo-600 truncate"
                                                    >
                                                        {{ server.name }}
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="mt-2 flex items-center text-sm text-gray-500"
                                                        >
                                                            <MdiFolderKeyNetwork
                                                                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                            />
                                                            <span class="truncate">
                                                                {{ server.ipv4 }}
                                                            </span>
                                                        </p>
                                                        <p
                                                            class="mt-2 flex items-center text-sm text-gray-500"
                                                        >
                                                            <MdiFolderKeyNetwork
                                                                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                            />
                                                            <span class="truncate">
                                                                {{ server.ipv6 }}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="hidden md:block">
                                                        <div>
                                                            <p class="text-xs text-gray-900">
                                                                {{ t('created') }}:
                                                                <strong class="mx-1">
                                                                    {{ server.creator }}
                                                                </strong>
                                                                <time :datetime="server.created_at">
                                                                    {{
                                                                        $dayjs(
                                                                            server.created_at,
                                                                        ).format('D. M. YYYY HH:mm')
                                                                    }}
                                                                </time>
                                                            </p>
                                                            <p
                                                                v-if="
                                                                    server.updater &&
                                                                    server.updater.length > 0
                                                                "
                                                                class="text-xs text-gray-900"
                                                            >
                                                                {{ t('updated') }}:
                                                                <strong class="mx-1">
                                                                    {{ server.updater }}
                                                                </strong>
                                                                <time :datetime="server.updated_at">
                                                                    {{
                                                                        $dayjs(
                                                                            server.updated_at,
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
                                                                v-if="server.publish"
                                                                class="flex-shrink-0 mr-2 h-5 w-5 text-emerald-400"
                                                            />
                                                            <MdiClock
                                                                v-if="!server.publish"
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
        @click="router.push({ name: 'server' })"
    >
        <MdiPlus class="w-10 h-10" />
    </button>

    <Spinner
        v-if="result.loading && result.servers.length === 0"
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
import { listServers } from '../composables/useServers';
import { t } from '../composables/i18n';
import Spinner from '../components/SpinnerComponent.vue';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';

import {
    MdiServerNetwork,
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
        name: 'servers',
        title: t('Servers'),
        final: true,
    },
];

const result = reactive({
    servers: [],
    loading: true,
});

setTimeout(async () => {
    result.servers = (await listServers()) || [];
    result.loading = false;
}, 300);

const headMeta = metaFind(route.name);
</script>
