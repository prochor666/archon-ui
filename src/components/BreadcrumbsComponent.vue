<template>
    <nav class="flex select-none" aria-label="Breadcrumb">
        <ol role="list" class="pr-2 flex space-x-2 px-1 my-2">
            <li v-for="(link, index) in links" :key="`brd${index}`" class="flex">
                <div class="flex items-center">
                    <router-link
                        :to="{ name: link.name, params: link.params || {} }"
                        class="text-gray-400 hover:text-gray-500"
                    >
                        <MdiHome v-if="index === 0" class="w-6 h-6" />
                        <span v-if="index === 0" class="sr-only">Home</span>
                    </router-link>

                    <MdiChevronRight v-if="index > 0" class="w-6 h-6 text-gray-200" />
                    <router-link
                        v-if="index > 0 && !link.final"
                        :to="{ name: link.name, params: link.params || {} }"
                        class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        {{ link.title }}
                    </router-link>
                    <span
                        v-if="index > 0 && link.final"
                        aria-current="page"
                        class="ml-2 text-sm font-medium text-gray-400"
                    >
                        {{ link.title }}
                    </span>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { toRef } from 'vue';

import { MdiHome, MdiChevronRight } from 'materialdesignicons-vue3/icons/';
import { t } from '../composables/i18n';

const props = defineProps({
    links: {
        type: Object,
        default: () => {
            return {
                name: 'dashboard',
                title: t('Dashboard'),
                params: {},
                final: true,
            };
        },
    },
});

const links = toRef(props, 'links');
</script>
