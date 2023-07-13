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

                    <div class="mx-auto max-w-lg px-2 py-4 space-y-6">
                        <div class="www py-2 sm:p-4">
                            <label for="language" class="mb-4 block text-base font-medium text-gray-600">
                                {{ t('language') }}
                            </label>
                            <select
                                id="role"
                                v-model="localSettings.language"
                                name="role"
                                class="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm"
                            >
                                <option v-for="code in langsAvailable" :key="code" :value="code">
                                    {{ t(code) }}
                                </option>
                            </select>
                        </div>

                        <div class="www py-2 sm:py-4 sm:px-4 text-right select-none">
                            <button
                                class="border border-transparent rounded shadow-sm py-2 px-4 inline-flex justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700"
                                @click="saveSettings(localSettings)"
                            >
                                <MdiContentSave class="w-6 h-6 mr-2" />
                                {{ t('buttonSave') }}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { t, lang } from '../composables/i18n';
import { keeper } from '../composables/utils';
import Headify from '../components/HeadifyComponent.vue';
import { metaFind } from '../composables/navs';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';
import { MdiContentSave } from 'materialdesignicons-vue3/icons/';

const route = useRoute();
const langsAvailable = ['cs', 'en'];
const localSettings = {
    language: lang,
};

const saveSettings = (localSettings) => {
    for (let setting in localSettings) {
        keeper(setting, localSettings[setting]);
    }
    document.location.href = route.path;
};

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'settings',
        title: t('Settings'),
        final: true,
    },
];

const headMeta = metaFind(route.name);
</script>
