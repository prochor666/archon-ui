<template>
    <img src="/images/brand/apple-touch-icon-72x72.png" alt="~" :class="cssClass" />
</template>

<script setup>
import { toRef } from 'vue';

const props = defineProps({
    cssClass: {
        type: String,
        default: 'w-10',
    },
});

const cssClass = toRef(props, 'cssClass');
</script>
