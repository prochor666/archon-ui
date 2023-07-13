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
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { t } from '../composables/i18n';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';
import { metaFind } from '../composables/navs';

const route = useRoute();

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'sites',
        title: t('Sites'),
        final: true,
    },
];
const headMeta = metaFind(route.name);
</script>
