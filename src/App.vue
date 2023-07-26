<template>
    <Suspense>
        <template #default>
            <router-view></router-view>
        </template>
        <template #fallback>
            <Spinner
                type="complex"
                :color="`text-indigo-600`"
                :color2="`text-indigo-400`"
                :text-color="`text-gray-200`"
                :overlay="true"
                :speed="1000"
                :dots="true"
                :dot-char="'>'"
                :dot-dual="true"
                :dot-reverse="true"
                :text="t('loading')"
                :inline="false"
                :pulse="true"
            />
        </template>
    </Suspense>

    <Toasts />

    <WorkerIndicator
        :key="domKey"
        class="beam fixed w-28 bottom-1 right-0.5 z-8000 flex place-content-center"
        :class="workerIndicator === true ? 'flex' : 'hidden'"
    />
</template>

<script setup>
import { ref } from 'vue';
import Spinner from './components/SpinnerComponent.vue';
import Toasts from './components/ToastsComponent.vue';
import WorkerIndicator from './components/WorkerIndicatorComponent.vue';
import { getRndKey } from './composables/utils';
//import refreshWorker from './refresh.worker.js?worker';

const workerIndicator = ref(false);
const domKey = ref(`a-${getRndKey()}`);
/*
const svc = new refreshWorker();

const workerIndicatorOn = () => {
    workerIndicator.value = true;
    domKey.value = `a-${getRndKey()}`;
};

const workerIndicatorOff = () => {
    workerIndicator.value = false;
    domKey.value = `a-${getRndKey()}`;
};

const workerIndicatorBlink = (timeout = 6000) => {
    workerIndicatorOn();
    setTimeout(async function () {
        workerIndicatorOff();
    }, timeout);
};

const refreshTokenSvc = () => {
    workerIndicatorBlink(3000);

    svc.postMessage({
        apiUrl: keeper('apiUrl'),
        authToken: keeper('authToken'),
        fileStorageApiUrl: keeper('fileStorageApiUrl'),
        sessionFsToken: keeper('sessionFsToken'),
    });
};

refreshTokenSvc();

svc.onmessage = async (e) => {
    const authToken = await e.data.authToken;
    const sessionFsToken = await e.data.sessionFsToken;
    //console.log('App.vue refresh worker response: ', authToken, sessionFsToken);
    keeper('authToken', authToken || '');
    keeper('sessionFsToken', sessionFsToken || '');

    setTimeout(async function () {
        if (authToken !== false) {
            refreshTokenSvc();
        }
    }, 5 * 60000);
}; */
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

input:autofill {
    filter: none;
    background: none; /* or any other */
}

:-moz-autofill,
:-moz-autofill-preview {
    filter: none;
    background: none;
}

* {
    --scrollbarBG: rgb(255, 255, 255);
    --thumbBG: rgb(160, 160, 160);
}
/*
*.dark,
html.dark * {
    --scrollbarBG: rgb(31, 31, 31);
    --thumbBG: rgb(80, 80, 80);
}
 */
*::-webkit-scrollbar {
    width: 12px;
}
* {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}

*::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
}

*::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 5px;
    border: 2px solid var(--scrollbarBG);
}

.v3dp__datepicker {
    --vdp-bg-color: #ffffff;
    --vdp-text-color: #000000;
    --vdp-box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1), 0 0 1px 0 rgba(128, 144, 160, 0.81);
    --vdp-border-radius: 3px;
    --vdp-heading-size: 2.5em;
    --vdp-heading-weight: bold;
    --vdp-heading-hover-color: #eeeeee;
    --vdp-arrow-color: #000000;
    --vdp-elem-color: #000000;
    --vdp-disabled-color: #d5d9e0;
    --vdp-hover-color: #ffffff;
    --vdp-hover-bg-color: #4338ca;
    --vdp-selected-color: #ffffff;
    --vdp-selected-bg-color: #4338ca;
    --vdp-elem-font-size: 0.8em;
    --vdp-elem-border-radius: 3px;
    --vdp-divider-color: #d5d9e;
}

/*
.dark .v3dp__datepicker {
    --vdp-bg-color: #111827;
    --vdp-text-color: #e5e7eb;
    --vdp-box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1),
        0 0 1px 0 rgba(128, 144, 160, 0.81);
    --vdp-border-radius: 5px;
    --vdp-heading-size: 2.5em;
    --vdp-heading-weight: bold;
    --vdp-heading-hover-color: rgba(31, 41, 55, 1);
    --vdp-arrow-color: #e5e7eb;
    --vdp-elem-color: #e5e7eb;
    --vdp-disabled-color: #6b7280;
    --vdp-hover-color: #ffffff;
    --vdp-hover-bg-color: #4338ca;
    --vdp-selected-color: #ffffff;
    --vdp-selected-bg-color: #4338ca;
    --vdp-elem-font-size: 0.8em;
    --vdp-elem-border-radius: 5px;
    --vdp-divider-color: #374151;
}
*/

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.child-view {
    position: absolute;
    width: 100%;
    left: 0;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
</style>
