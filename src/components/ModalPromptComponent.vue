<template>
    <TransitionRoot as="template" :show="state.open">
        <Dialog as="div" class="relative z-2000" @close="state.open = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            :class="[
                                state.maxWidthMax === true > 0
                                    ? `sm:w-full sm:max-w-5xl`
                                    : 'sm:w-full sm:max-w-lg',
                                'relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6',
                            ]"
                        >
                            <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button
                                    type="button"
                                    class="rounded bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                    @click="state.open = false"
                                >
                                    <span class="sr-only">Close</span>
                                    <MdiClose class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10"
                                >
                                    <MdiBell class="h-6 w-6 text-gray-600" aria-hidden="true" />
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        class="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        {{ state.title }}
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            {{ state.text }}
                                        </p>
                                    </div>
                                    <div v-if="tpl.length > 10" class="mt-2" v-html="tpl"></div>
                                    <div v-if="state.image && state.image.length > 10" class="mt-2">
                                        <div class="result">
                                            <img
                                                v-if="state.image"
                                                :src="state.image"
                                                alt="Image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    v-for="(button, index) in buttons"
                                    :key="index"
                                    type="button"
                                    :class="`
                                        inline-flex
                                        w-full
                                        justify-center
                                        rounded
                                        px-3
                                        py-2
                                        text-sm
                                        font-semibold
                                        shadow-sm
                                        sm:ml-3
                                        sm:w-auto
                                        ${button.class}
                                    `"
                                    @click="button.action($event)"
                                >
                                    {{ button.title }}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

import { MdiBell, MdiClose } from 'materialdesignicons-vue3/icons/';

defineExpose({
    name: 'ModalPrompt',
});

const props = defineProps({
    buttons: {
        type: Object,
        default: () => {
            return [];
        },
    },
    tpl: {
        type: String,
        default: () => {
            return '';
        },
    },
    state: {
        type: Object,
        required: true,
        default: () => {
            return {
                open: false,
                title: '',
                text: '',
                maxWidthMax: false,
                data: {},
                image: '',
            };
        },
    },
});

const state = props.state;
const buttons = props.buttons;
const tpl = props.tpl;
</script>
