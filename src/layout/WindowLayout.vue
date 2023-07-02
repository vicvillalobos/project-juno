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
import { onMounted } from "vue";
import { useBalanceStore } from "@/stores/balance";

const balanceStore = useBalanceStore();

onMounted(() => {
    console.log("Layout mounted")
    for (let i = 0; i < 28; i++) {

        // Add between 1 to 7 movements per day
        // with a random amount between -20000 and 0

        const movements = Math.floor(Math.random() * 7) + 1;

        for (let j = 0; j < movements; j++) {
            balanceStore.addMovement({
                // Amount between -20000 and 0
                amount: Math.floor(Math.random() * -20000),
                description: "Test movement",
                date: new Date(2021, 6, i + 1),
            });
        }
    }

    console.log(balanceStore.Movements.length, "Movements added")

    balanceStore.addMovement({
        // Amount between 0 and 100000
        amount: 2370000,
        description: "Test movement",
        date: new Date(2023, 5, 1),
    })
});
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