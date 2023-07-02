<script setup lang="ts">
import type { FullScreen } from '@element-plus/icons-vue';
import { useMainStore } from '@/stores/main';
const props = defineProps<{
    title?: string,
}>();

const mainStore = useMainStore();

</script>

<template>
    <div id="windowTitlebar">
        <div id="windowTitlebarLeft">
            <div id="windowTitlebarIcon">
                <slot name="icon">
                    <el-icon>
                        <FolderOpened />
                    </el-icon>
                </slot>
            </div>
            <div id="windowTitlebarTitle">
                <slot name="title">{{ mainStore.WindowTitle }}</slot>
            </div>
        </div>
        <div id="windowTitlebarRight">
            <div id="windowTitlebarButtons">
                <slot name="buttons">
                    <div class="windowTitlebarButton">
                        <el-icon>
                            <Minus />
                        </el-icon>
                    </div>
                    <div class="windowTitlebarButton">
                        <el-icon>
                            <FullScreen />
                        </el-icon>
                    </div>
                    <div class="windowTitlebarButton">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#windowTitlebar {
    width: 100vw;
    height: 40px;
    -webkit-app-region: drag;
    display: flex;
}

#windowTitlebarLeft {
    display: flex;
    width: calc(100vw - 120px);
}

#windowTitlebarIcon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#windowTitlebarTitle {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    line-height: 40px;
}

#windowTitlebarRight {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;

    #windowTitlebarButtons {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        -webkit-app-region: no-drag;

        .windowTitlebarButton {
            height: 40px;
            width: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;

            &:hover {
                background-color: var(--app-color-background-darker);
            }
        }
    }
}
</style>