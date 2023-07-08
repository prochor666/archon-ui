<template>
    <Headify :data="headMeta" />

    <div class="bg-white select-none bg-cover" style="background-image: url('/images/lgbg.jpg')">
        <main class="w-full mx-auto flex items-center justify-center min-h-screen">
            <div class="max-w-md w-full space-y-4 p-6 bg-white rounded shadow-xl shadow-blue-600/50">
                <div class="text-center text-3xl">
                    <MdiAccount class="mx-auto text-indigo-600 w-10 h-10" aria-hidden="true" />
                </div>
                <div>
                    <h1 class="mt-6 text-center text-2xl font-bold text-gray-900">
                        {{ t('Activation') }}
                    </h1>
                </div>
                <form class="mt-8 space-y-6" method="POST">
                    <div class="shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">
                                {{ t('ulcPlaceholder') }}
                            </label>
                            <input
                                id="username"
                                v-model="ulc"
                                type="text"
                                name="ulc"
                                autocomplete="off"
                                required=""
                                class="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                :placeholder="t('loginPlaceholder')"
                                @keyup.enter="sendActivation()"
                            />
                        </div>
                    </div>
                    <div class="shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">
                                {{ t('pinPlaceholder') }}
                            </label>
                            <input
                                id="pin"
                                v-model="pin"
                                type="text"
                                name="pin"
                                autocomplete="off"
                                required=""
                                class="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                :placeholder="t('loginPlaceholder')"
                                @keyup.enter="sendActivation()"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            class="w-full items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                            @click="sendActivation()"
                        >
                            <MdiLock class="inline-block mr-2 w-4 h-4" aria-hidden="true" />
                            <span>{{ t('buttonActivate') }}</span>
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
import { useRoute, useRouter } from 'vue-router';
import Headify from '../components/HeadifyComponent.vue';
import Spinner from '../components/SpinnerComponent.vue';
import navs from '../composables/navs';
import { activate, getLoggedUser } from '../composables/useAuth';
import { ark, asleep, keeper } from '../composables/utils';
import { notify } from 'notiwind';
import { t } from '../composables/i18n';

import { MdiAccount, MdiLock } from 'materialdesignicons-vue3/icons/';

const ulc = ref('');
const pin = ref('');
const route = useRoute();
const router = useRouter();
const headMeta = navs().metaFind(route.name);
const user = await getLoggedUser();

if (user.role !== 'none') {
    router.push(keeper('returnUrl') || { name: 'dashboard' });
}

pin.value = route.query.pin || '';
ulc.value = route.query.ulc || '';

const saving = reactive({
    active: false,
    text: `${t('loading')}`,
});

const sendActivation = async () => {
    saving.active = true;
    const result = await activate(ulc.value, pin.value);

    if (ark(result, 'status') === true) {
        saving.active = false;
        notify(
            {
                group: 'success',
                title: t('Activation'),
                text: `Activated user "${result.username}"`,
            },
            2500,
        );

        asleep(400);
        router.push(keeper('returnUrl') || { name: 'dashboard' });
    } else {
        // Notify problem
        // let note = ark(result, 'message', 'Error logging in');
        let note = 'Error logging in';
        let group = 'warning';

        if (!!result.error && !!result.error.response && !!result.error.response.data && !!result.error.response.data.message) {
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

if (ulc.value.length > 0 && pin.value.length > 0) {
    sendActivation();
}
</script>
