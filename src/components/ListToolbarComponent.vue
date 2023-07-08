<template>
    <nav class="flex select-none py-2" aria-label="Filter">
        <input
            v-show="config.search.show"
            id="search"
            type="text"
            name="search"
            class="block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :placeholder="config.search.title"
        />
        <button
            v-show="config.search.show"
            type="button"
            class="relative inline-flex items-center bg-white px-2 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            :title="config.search.title"
        >
            <MdiMagnify class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">{{ config.search.title }}</span>
        </button>
        <button
            v-show="config.new.show"
            type="button"
            class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            :title="config.new.title"
            @click="config.new.value"
        >
            <MdiPlus class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">{{ config.new.title }}</span>
        </button>
    </nav>
</template>

<script setup>
import { MdiMagnify, MdiPlus } from 'materialdesignicons-vue3/icons/';
//import { t } from '../composables/i18n';

defineExpose({
    name: 'ListToolbar',
});

const props = defineProps({
    config: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const config = props.config || {};
</script>
