<template>
    <TransitionRoot as="template" :show="state.open">
        <Dialog as="div" class="relative z-[7007] lg:hidden" @close="state.open = false">
            <TransitionChild
                as="template"
                enter="transition-opacity ease-linear duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div class="fixed inset-0 flex select-none">
                <TransitionChild
                    as="template"
                    enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                >
                    <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                        <TransitionChild
                            as="template"
                            enter="ease-in-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in-out duration-300"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button
                                    type="button"
                                    class="-m-2.5 p-2.5"
                                    @click="state.open = false"
                                >
                                    <span class="sr-only">Close sidebar</span>
                                    <MdiClose class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <!-- Sidebar component, swap this element with another sidebar if you like -->
                        <div
                            class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
                        >
                            <div
                                class="flex h-16 shrink-01 items-center text-gray-400 text-xl font-medium"
                            >
                                <BrandLogo css-class="h-7 w-auto mr-2" /> {{ t('brand') }}
                            </div>
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" class="-mx-2 space-y-1">
                                            <li v-for="item in navigation.main" :key="item.name">
                                                <a
                                                    :href="item.href"
                                                    :class="[
                                                        item.active
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                        'group flex gap-x-3 rounded p-2 text-sm leading-6 font-semibold',
                                                    ]"
                                                >
                                                    <component
                                                        :is="item.icon"
                                                        class="h-6 w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {{ t(item.title) }}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div class="text-xs font-semibold leading-6 text-gray-400">
                                            Your network
                                        </div>
                                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                                            <li v-for="item in navigation.user" :key="item.name">
                                                <a
                                                    :href="item.href"
                                                    :class="[
                                                        item.active
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                        'group flex gap-x-3 rounded p-2 text-sm leading-6 font-semibold',
                                                    ]"
                                                >
                                                    <component
                                                        :is="item.icon"
                                                        class="h-6 w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {{ t(item.title) }}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="mt-auto">
                                        <a
                                            href="#"
                                            class="group -mx-2 flex gap-x-3 rounded p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                            @click.prevent="logoutSession()"
                                        >
                                            <MdiLogout
                                                class="h-6 w-6 shrink-0"
                                                aria-hidden="true"
                                            />
                                            {{ t('Logout') }}
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col select-none">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div class="flex h-16 shrink-01 items-center text-gray-400 text-xl font-medium">
                <BrandLogo css-class="h-7 w-auto mr-2" /> {{ t('brand') }}
            </div>
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation.main" :key="item.name">
                                <router-link
                                    :to="item.href"
                                    :class="[
                                        item.active
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                        'group flex gap-x-3 rounded p-2 text-sm leading-6 font-semibold',
                                    ]"
                                >
                                    <component
                                        :is="item.icon"
                                        class="h-6 w-6 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {{ t(item.title) }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="text-xs font-semibold leading-6 text-gray-400">
                            {{ keeper('username') }}
                        </div>
                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                            <li v-for="item in navigation.user" :key="item.name">
                                <router-link
                                    :to="item.href"
                                    :class="[
                                        item.active
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                        'group flex gap-x-3 rounded p-2 text-sm leading-6 font-semibold',
                                    ]"
                                >
                                    <component
                                        :is="item.icon"
                                        class="h-6 w-6 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {{ t(item.title) }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="mt-auto">
                        <a
                            href="#"
                            class="group -mx-2 flex gap-x-3 rounded p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                            @click.prevent="logoutSession()"
                        >
                            <MdiLogout class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ t('Logout') }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <div v-if="state.toolbar === true" class="lg:pl-72">
        <div
            class="fixed top-0 left-0 lg:left-72 right-0 z-7000 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
        >
            <button
                type="button"
                class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                @click="state.open = true"
            >
                <span class="sr-only">Open sidebar</span>
                <MdiMenu class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 pl-0 xl:pl-4">
                <div class="relative flex flex-1">
                    <label for="search-field" class="sr-only">{{ t('Search') }}</label>
                    <MdiMagnify
                        class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    <input
                        id="search-field"
                        class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        :placeholder="`${t('Search')}...`"
                        type="search"
                        name="search"
                    />
                </div>
                <div class="flex items-center gap-x-4 lg:gap-x-6">
                    <!-- Separator -->
                    <div
                        class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                        aria-hidden="true"
                    />

                    <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">View notifications</span>
                        <MdiBellOutline class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentRouteMatch } from '../composables/navs';
import { notify } from 'notiwind';
import BrandLogo from './BrandLogoComponent.vue';
import { logout } from '../composables/useAuth';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { keeper } from '../composables/utils';
import {
    MdiLogout,
    MdiClose,
    MdiAccount,
    MdiAccountGroup,
    MdiHome,
    MdiCog,
    MdiFileDocumentOutline,
    MdiChip,
    MdiWeb,
    MdiMenu,
    MdiMagnify,
    MdiBellOutline,
    MdiServerNetwork,
} from 'materialdesignicons-vue3/icons/';

defineExpose({
    name: 'NavigationMain',
});

const state = reactive({
        open: false,
        toolbar: true,
        data: {},
    }),
    router = useRouter(),
    route = useRoute();

const navigation = reactive({
    main: [
        {
            title: 'Dashboard',
            name: 'dashboard',
            href: '/',
            icon: MdiHome,
            active: currentRouteMatch(['dashboard'], route.name),
        },
        {
            title: 'Users',
            name: 'users',
            href: '/users',
            icon: MdiAccountGroup,
            active: currentRouteMatch(['users', 'user'], route.name),
        },
        {
            title: 'UITest',
            name: 'ui-test',
            href: '/ui-test',
            icon: MdiFileDocumentOutline,
            active: currentRouteMatch(['ui-test'], route.name),
        },
    ],
    user: [
        {
            title: 'MyProfile',
            name: 'me',
            href: '/me',
            icon: MdiAccount,
            active: currentRouteMatch(['me'], route.name),
        },
        {
            title: 'Devices',
            name: 'devices',
            href: '/devices',
            icon: MdiChip,
            active: currentRouteMatch(['devices', 'device'], route.name),
        },
        {
            title: 'Servers',
            name: 'servers',
            href: '/servers',
            icon: MdiServerNetwork,
            active: currentRouteMatch(['servers', 'server'], route.name),
        },
        {
            title: 'Sites',
            name: 'sites',
            href: '/sites',
            icon: MdiWeb,
            active: currentRouteMatch(['sites'], route.name),
        },
        {
            title: 'Settings',
            name: 'settings',
            href: '/settings',
            icon: MdiCog,
            active: currentRouteMatch(['settings'], route.name),
        },
    ],
});

const logoutSession = async () => {
    const lg = await logout();
    //console.log('NavMainComponent.vue: logoutSession', lg);
    if (lg !== false) {
        router.push('/login');
    } else {
        notify(
            {
                group: 'error',
                title: 'Error',
                text: 'Logout error., see console for more information',
            },
            5000,
        );
    }
};
</script>
