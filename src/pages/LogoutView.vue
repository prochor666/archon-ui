<template>
    <Headify :data="headMeta" />

    <div class="bg-white">
        <main class="w-full mx-auto max-w-7xl">
            <div class="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
                <h1 class="text-xl font-medium text-indigo-600 py-2">
                    {{ t('Logout') }}
                </h1>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Headify from '../components/HeadifyComponent.vue';
import navs from '../composables/navs';
import { logout } from '../composables/useAuth';

await logout();

const route = useRoute();
const router = useRouter();
const headMeta = navs().metaFind(route.name);

router.push('/login');
</script>
