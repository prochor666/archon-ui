<template>
    <Headify :data="headMeta" />

    <div>
        <main>
            <div class="w-full text-center select-none">
                <div class="flex justify-center items-center text-gray-400 bg-gray-900 text-xl font-medium px-4 py-8">
                    <BrandLogo css-class="h-7 w-auto mr-2" />
                    {{ t('brand') }}
                </div>
                <div class="inline-block flex justify-center items-center text-gray-600 text-base font-medium">
                    <p class="p-6">
                        <MdiWebCancel class="-mt-1 mr-2 h-5 w-5 inline" />
                        {{ t('Page404') }}
                    </p>
                </div>
                <div class="inline-block flex justify-center items-center text-gray-600 text-base font-medium">
                    <p class="p-6">
                        <button
                            class="bg-gray-200 border border-transparent rounded shadow-sm py-2 px-4 mr-4 inline-flex justify-center text-base font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click="router.push({ name: 'dashboard' })"
                        >
                            <MdiChevronLeft class="w-6 h-6 mr-2" />
                            {{ t('buttonBack') }}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { t } from '../composables/i18n';
import Headify from '../components/HeadifyComponent.vue';
import BrandLogo from '../components/BrandLogoComponent.vue';
import { metaFind } from '../composables/navs';
import { MdiChevronLeft, MdiWebCancel } from 'materialdesignicons-vue3/icons/';

const route = useRoute();
const router = useRouter();

const headMeta = metaFind(route.name);
</script>
