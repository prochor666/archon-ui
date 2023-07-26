<template>
    <div class="flex-none min-h-fit w-full select-none">
        <div class="max-w-7xl mx-auto py-4 h-20 text-center">
            <p class="text-sm text-gray-600 py-1">
                ©2023 {{ t('brand') }} with &#10084; Datagrid.
            </p>
            <p class="text-xs text-gray-500 py-1">
                {{ t('footerDenial') }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { t } from '../composables/i18n';
</script>
