<template>
    <Headify :data="headMeta" />

    <div>
        <!-- Navbar -->
        <NavigationMain />

        <div class="lg:pl-72">
            <main>
                <div class="w-full pt-20">
                    <!-- Your content -->
                    <Breadcrumbs :links="breadcrumbsLinks" class="pl-2 lg:pl-6 xl:pl-10 pr-4" />

                    <div class="mx-auto max-w-2xl py-4 space-y-6 px-2">
                        <div class="max-w-7xl mx-auto w-full space-y-6">
                            <div class="text-left">
                                <h2 class="mt-6 text-xl font-bold text-emerald-600">Icons</h2>
                                <p class="my-4 text-base">7000+ Material design icons.</p>
                                <p class="my-4 text-base">
                                    Inline icons example
                                    <MdiCog class="-mt-1 w-4 h-4 inline text-emerald-600" />
                                    Cog and
                                    <MdiCloudLock class="-mt-1 w-4 h-4 inline text-emerald-600" />
                                    Cloud Lock
                                </p>
                            </div>

                            <div class="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-6 text-3xl md:text-4xl">
                                <MdiAccount class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiLock class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiFilePdfBox class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiClose class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiHome class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiMagnify class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiMenu class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiCog class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiContentSave class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiEmail class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiKeyboard class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                                <MdiCloudLock class="mx-auto text-indigo-600 w-10 h-10 p-1 rounded border border-emerald-600" />
                            </div>
                        </div>
                        <div class="max-w-7xl mx-auto w-full space-y-6">
                            <div class="text-left">
                                <h2 class="mt-6 text-xl font-bold text-emerald-600">Colors</h2>
                            </div>

                            <div class="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
                                <div class="rounded text-center border border-black bg-white h-10">white</div>
                                <div class="rounded text-center border border-black bg-slate-400 h-10">slate</div>
                                <div class="rounded text-center border border-black bg-gray-400 h-10">gray</div>
                                <div class="rounded text-center border border-black bg-zinc-400 h-10">zinc</div>
                                <div class="rounded text-center border border-black bg-neutral-400 h-10">neutral</div>
                                <div class="rounded text-center border border-black bg-stone-400 h-10">stone</div>
                                <div class="rounded text-center border border-black bg-red-400 h-10">red</div>
                                <div class="rounded text-center border border-black bg-orange-400 h-10">orange</div>
                                <div class="rounded text-center border border-black bg-amber-400 h-10">amber</div>
                                <div class="rounded text-center border border-black bg-yellow-400 h-10">yellow</div>
                                <div class="rounded text-center border border-black bg-lime-400 h-10">lime</div>
                                <div class="rounded text-center border border-black bg-green-400 h-10">green</div>
                                <div class="rounded text-center border border-black bg-emerald-400 h-10">emerald</div>
                                <div class="rounded text-center border border-black bg-teal-400 h-10">teal</div>
                                <div class="rounded text-center border border-black bg-cyan-400 h-10">cyan</div>
                                <div class="rounded text-center border border-black bg-sky-400 h-10">sky</div>
                                <div class="rounded text-center border border-black bg-blue-400 h-10">blue</div>
                                <div class="rounded text-center border border-black bg-indigo-400 h-10">indigo</div>
                                <div class="rounded text-center border border-black bg-violet-400 h-10">violet</div>
                                <div class="rounded text-center border border-black bg-purple-400 h-10">purple</div>
                                <div class="rounded text-center border border-black bg-violet-400 h-10">violet</div>
                                <div class="rounded text-center border border-black bg-fuchsia-400 h-10">fuchsia</div>
                                <div class="rounded text-center border border-black bg-pink-400 h-10">pink</div>
                                <div class="rounded text-center border border-black bg-rose-400 h-10">rose</div>
                                <div class="rounded text-center border border-black bg-black h-10">black</div>
                            </div>
                        </div>
                        <div class="max-w-7xl mx-auto w-full space-y-6">
                            <div class="text-left">
                                <h2 class="mt-6 text-xl font-bold text-emerald-600">Spinners</h2>
                            </div>

                            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 text-3xl md:text-4xl py-4">
                                <div>
                                    <Spinner
                                        type="complex"
                                        :color="`my-4 text-indigo-600`"
                                        :color2="`text-emerald-600`"
                                        :text-color="`text-indigo-600`"
                                        :overlay="false"
                                        :speed="1000"
                                        :dots="true"
                                        :dot-char="'>'"
                                        :dot-dual="true"
                                        :dot-reverse="true"
                                        :text="
                                            t('loadingExt', {
                                                ext: `${percent}%`,
                                            })
                                        "
                                        :inline="true"
                                        :pulse="false"
                                    />
                                </div>
                                <div>
                                    <Spinner
                                        type="bars"
                                        :color="`my-4 text-indigo-600`"
                                        :color2="`text-emerald-600`"
                                        :text-color="`text-indigo-600`"
                                        :overlay="false"
                                        :speed="1000"
                                        :dots="false"
                                        :dot-char="'>'"
                                        :dot-dual="true"
                                        :dot-reverse="true"
                                        :text="
                                            t('sendingExt', {
                                                ext: `${percent}%`,
                                            })
                                        "
                                        :inline="true"
                                        :pulse="false"
                                    />
                                </div>
                                <div>
                                    <Spinner
                                        type="dots"
                                        :color="`my-4 text-indigo-600`"
                                        :color2="`text-emerald-600`"
                                        :text-color="`text-indigo-600`"
                                        :overlay="false"
                                        :speed="1000"
                                        :dots="true"
                                        :dot-char="'.'"
                                        :dot-dual="false"
                                        :dot-reverse="false"
                                        :text="t('loading')"
                                        :inline="true"
                                        :pulse="true"
                                    />
                                </div>
                                <div>
                                    <Spinner
                                        type="clock"
                                        :color="`my-4 text-indigo-600`"
                                        :color2="`text-emerald-600`"
                                        :text-color="`text-indigo-600`"
                                        :overlay="false"
                                        :speed="2600"
                                        :dots="true"
                                        :dot-char="'/'"
                                        :dot-dual="true"
                                        :dot-reverse="false"
                                        :text="t('loading')"
                                        :inline="true"
                                        :pulse="false"
                                    />
                                </div>
                                <div>
                                    <Spinner
                                        type="circle"
                                        :color="`my-4 text-indigo-600`"
                                        :color2="`text-emerald-600`"
                                        :text-color="`text-indigo-600`"
                                        :overlay="false"
                                        :speed="1000"
                                        :dots="true"
                                        :dot-char="'>'"
                                        :dot-dual="true"
                                        :dot-reverse="false"
                                        :text="t('loading')"
                                        :inline="true"
                                        :pulse="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { t } from '../composables/i18n';
import { metaFind } from '../composables/navs';
import Headify from '../components/HeadifyComponent.vue';
import NavigationMain from '../components/NavigationMainComponent.vue';
import Breadcrumbs from '../components/BreadcrumbsComponent.vue';
import Spinner from '../components/SpinnerComponent.vue';
//import { html_beautify } from 'js-beautify';

import {
    MdiAccount,
    MdiClose,
    MdiCloudLock,
    MdiCog,
    MdiContentSave,
    MdiEmail,
    MdiFilePdfBox,
    MdiHome,
    MdiKeyboard,
    MdiLock,
    MdiMagnify,
    MdiMenu,
} from 'materialdesignicons-vue3/icons/';

const percent = ref(0);
const speed = ref(200);

setInterval(() => {
    let _p = parseInt(percent.value) >= 100 ? 0 : parseInt(percent.value) + 1;
    percent.value = _p.toString().padStart(3, '\xa0');
}, parseInt(speed.value));

const route = useRoute();

const breadcrumbsLinks = [
    {
        name: 'dashboard',
        title: t('Dashboard'),
    },
    {
        name: 'ui-test',
        title: t('UITest'),
        final: true,
    },
];

const headMeta = metaFind(route.name);

/*
const rawHTML = `<!DOCTYPE html>
<html lang="cs">
<head>
<style>
body {
margin-left: auto;
margin-right: auto;
font-family: 'Arial Unicode MS', Arial, Helvetica, sans-serif;
font-size: 14px;
}
</style>
</head>

<body><h1>Example document {{ prefix.Variable }}</h1>
<p>Aenean placerat. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Cum sociis natoque pris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Maecenas sollicitudin. Integer in sapien. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.</p>
<table>
<tr><th>TEST 1</th><td>utyut</td></tr>
<tr><th>TEST 2</th><td>tyutyu</td></tr>
<tr><th>TEST 3</th><td>tyutyutyut</td></tr>
</table>
</body>

</html>
`;

const html_beautifyConfig = {
    indent_size: '4',
    indent_char: ' ',
    max_preserve_newlines: '5',
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '160',
    indent_inner_html: true,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
};

const finalHTML = html_beautify(rawHTML, html_beautifyConfig);
console.log('Raw', rawHTML);
console.log('Final', finalHTML);
*/
</script>
