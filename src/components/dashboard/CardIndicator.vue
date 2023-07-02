<script setup lang="ts">
const props = defineProps<{
    title: string
    icon?: string
    value: string
    color?: string
    bgColor?: string
}>()
</script>

<template>
    <div class="card-indicator-component card">
        <span class="title">{{ title }}</span>
        <div class="indicator">{{ value }}</div>
    </div>
</template>

<style lang="scss" scoped>
span.title {
    font-size: 14px;
    color: #fff;
}

div.indicator {
    font-size: 24px;
    color: #fff;
}
</style>