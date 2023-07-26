<template>
    <Headify :data="headMeta" />

    <div class="bg-white select-none bg-cover" style="background-image: url('/images/lgbg.jpg')">
        <main class="w-full mx-auto flex items-center justify-center min-h-screen">
            <div
                class="max-w-md w-full space-y-4 p-6 bg-white rounded shadow-xl shadow-blue-600/50"
            >
                <div class="text-center text-3xl">
                    <BrandLogo css-class="rounded-full mx-auto h-10 w-auto" />
                    <span class="mx-auto text-xl font-medium text-gray-800 uppercase">{{
                        t('brand')
                    }}</span>
                </div>
                <div>
                    <h1 class="mt-4 text-center text-xl font-medium text-indigo-600">
                        {{ t('Login') }}
                    </h1>
                </div>
                <form class="mt-8 space-y-6" method="POST">
                    <div class="shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">
                                {{ t('loginPlaceholder') }}
                            </label>
                            <input
                                id="login"
                                v-model="login"
                                type="text"
                                name="login"
                                autocomplete="off"
                                required=""
                                class="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                :placeholder="t('loginPlaceholder')"
                                @keyup.enter="sendRecovery()"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            class="w-full items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                            @click="sendRecovery()"
                        >
                            <MdiLock class="inline-block mr-2 w-4 h-4" aria-hidden="true" />
                            <span>{{ t('buttonLogin') }}</span>
                        </button>
                    </div>
                </form>

                <div>
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                            {{ t('cantLogin') }}
                        </a>
                    </div>
                </div>

                <Spinner
                    v-if="saving.active"
                    type="dots"
                    :color="`text-indigo-600`"
                    :color2="`text-indigo-400`"
                    :text-color="`text-gray-200`"
                    :overlay="true"
                    :speed="1000"
                    :dots="true"
                    :dot-char="'.'"
                    :dot-dual="false"
                    :dot-reverse="false"
                    :text="saving.text"
                    :inline="false"
                    :pulse="true"
                />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Headify from '../components/HeadifyComponent.vue';
import Spinner from '../components/SpinnerComponent.vue';
import BrandLogo from '../components/BrandLogoComponent.vue';
import navs from '../composables/navs';
import { recover } from '../composables/useAuth.js';
import { ark } from '../composables/utils';
import { notify } from 'notiwind';
import { t } from '../composables/i18n';

import { MdiLock } from 'materialdesignicons-vue3/icons/';

const login = ref('');
const route = useRoute();
const headMeta = navs().metaFind(route.name);

const saving = reactive({
    active: false,
    text: `${t('loading')}`,
});

const sendRecovery = async () => {
    saving.active = true;
    const result = await recover(login.value);

    if (ark(result, 'status') === true) {
        saving.active = false;
        notify(
            {
                group: 'success',
                title: t('Login'),
                text: ark(result, 'message', `Check user "${login.value}"`),
            },
            2500,
        );
        //router.push(keeper('returnUrl') || { name: 'dashboard' });
    } else {
        // Notify problem
        // let note = ark(result, 'message', `Error recovering user "${login.value}"`);
        let note = `Error recovering user "${login.value}"`;
        let group = 'warning';

        if (
            !!result.error &&
            !!result.error.response &&
            !!result.error.response.data &&
            !!result.error.response.data.message
        ) {
            note = `${result.error.response.data.message}`;
            group = 'error';
        }

        notify(
            {
                group: group,
                title: t('Error'),
                text: note,
            },
            5000,
        );
        saving.active = false;
    }
};
</script>
