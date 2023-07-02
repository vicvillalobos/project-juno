import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {

    const windowTitle = ref("Dashboard");

    const WindowTitle = computed(() => {
        let title = windowTitle.value + " - Project Juno"
            + (import.meta.env.VITE_APP_VERSION ? " v" + import.meta.env.VITE_APP_VERSION : "")
            + (import.meta.env.VITE_APP_DEBUG_MODE == 1 ? " (Debug)" : "");
        return title;
    });

    const SetWindowTitle = (title: string) => {
        windowTitle.value = title;
    };

    return { WindowTitle, SetWindowTitle }
});
