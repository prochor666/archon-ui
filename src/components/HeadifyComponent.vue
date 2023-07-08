<template>
    <Teleport v-if="data.length > 0" to="head">
        <component :is="tag" v-for="(tag, index) in nodes" :key="index"></component>
    </Teleport>
</template>

<script setup>
import { h } from 'vue';

defineExpose({
    name: 'headify',
});

const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const data = props.data;
const nodes = [];

for (let i in data) {
    /* if (data[i].tag === 'title') {
        data[i].params.innerHTML = ` ${data[i].params.innerHTML}`;
    } */
    nodes.push(h(data[i].tag, data[i].params));
}
</script>
