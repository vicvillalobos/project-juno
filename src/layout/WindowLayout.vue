<template>
    <div id="windowFrame">
        <Titlebar title="Project Juno" />
        <div class="windowContent">
            <div class="windowContentLeft">
                <Sidemenu />
            </div>
            <div class="windowContentMain">
                <router-view />
            </div>
        </div>
        <Statusbar />
    </div>
</template>

<script setup lang="ts">
import Titlebar from "@/components/windowframe/Titlebar.vue";
import Sidemenu from "@/components/windowframe/Sidemenu.vue";
import Statusbar from "@/components/windowframe/Statusbar.vue";

</script>

<style lang="scss">
.windowContent {
    display: flex;

    .windowContentLeft {
        width: 87px;
        height: calc(100vh - 68px);
        color: #fff;
        padding: 10px 0;
        box-sizing: border-box;
    }

    .windowContentMain {
        flex: 1;
        height: calc(100vh - 68px);
        box-sizing: border-box;
        background-color: var(--app-color-background);
        border-top-left-radius: 8px;
    }
}
</style>