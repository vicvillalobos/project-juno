import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export enum SyncState {
    Downloading, Uploading, Synced, Error, Warning, LocalMode
}

export const useSyncStateStore = defineStore('syncState', () => {

    const syncState = ref(SyncState.LocalMode);
    const syncMessage = ref("Not logged in. Using local storage");

    function setDownloadingState(msg: string = "Downloading latest data from server...") {
        syncState.value = SyncState.Downloading;
        syncMessage.value = msg;
    }

    function setUploadingState(msg: string = "Uploading latest data to server...") {
        syncState.value = SyncState.Uploading;
        syncMessage.value = msg;
    }

    function setSyncedState(msg: string = "Synced with server") {
        syncState.value = SyncState.Synced;
        syncMessage.value = msg;
    }

    function setErrorState(msg: string = "Error syncing with server") {
        syncState.value = SyncState.Error;
        syncMessage.value = msg;
    }

    function setWarningState(msg: string = "Warning syncing with server") {
        syncState.value = SyncState.Warning;
        syncMessage.value = msg;
    }

    function setDiskModeState(msg: string = "Not logged in. Using local storage.") {
        syncState.value = SyncState.LocalMode;
        syncMessage.value = msg;
    }

    function setState(state: SyncState, msg: string = "") {
        syncState.value = state;
        syncMessage.value = msg;
    }

    return { setState, setDownloadingState, setUploadingState, setSyncedState, setErrorState, setWarningState, setDiskModeState, syncState, syncMessage };
})
