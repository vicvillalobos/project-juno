<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, computed } from "vue";
import { SyncState, useSyncStateStore } from "@/stores/syncState";
import { useBalanceStore } from "@/stores/balance";

const syncStore = useSyncStateStore();
const balanceStore = useBalanceStore();

const startSyncStatePoll = () => {
  setInterval(() => {
    if (balanceStore.db.IsDataSaved) {
      syncStore.setState(
        SyncState.Synced,
        "Not logged in. Changes saved to local storage."
      );
    } else {
      syncStore.setState(SyncState.Warning, "Changes not saved.");
      // Save
      balanceStore.db.save();
    }
  }, 1000);
};

onMounted(() => {
  document.querySelector("html")?.classList.add("dark");
  startSyncStatePoll();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
