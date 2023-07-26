<template>
    <div class="flex items-center text-sm text-gray-500 font-medium">
        <MdiClock v-if="user.role === 'none'" class="flex-shrink-0 mr-2 h-5 w-5 text-amber-400" />
        <MdiHeadRemove
            v-if="user.role === 'block'"
            class="flex-shrink-0 mr-2 h-5 w-5 text-rose-400"
        />
        <MdiAccountCheck
            v-if="user.role === 'user'"
            class="flex-shrink-0 mr-2 h-5 w-5 text-sky-400"
        />
        <MdiSchool
            v-if="user.role === 'editor'"
            class="flex-shrink-0 mr-2 h-5 w-5 text-indigo-400"
        />
        <MdiShieldKey
            v-if="user.role === 'admin'"
            class="flex-shrink-0 mr-2 h-5 w-5 text-emerald-400"
        />
        {{ user.role }}
    </div>
</template>

<script setup>
import {
    MdiClock,
    MdiHeadRemove,
    MdiAccountCheck,
    MdiSchool,
    MdiShieldKey,
} from 'materialdesignicons-vue3/icons/';

defineExpose({
    name: 'UserBadge',
});

const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: () => {
            return {
                role: 'none',
                class: '',
            };
        },
    },
});

const user = props.user;
</script>
