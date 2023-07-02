<script lang="ts" setup>
import { SyncState, useSyncStateStore } from '@/stores/syncState';

const syncState = useSyncStateStore();

const iconClass = {
    [SyncState.LocalMode]: 'icon-disabled',
    [SyncState.Warning]: 'icon-warning',
    [SyncState.Synced]: 'icon-success',
    [SyncState.Error]: 'icon-error',
    [SyncState.Downloading]: 'icon-loading',
    [SyncState.Uploading]: 'icon-loading',
}

</script>

<template>
    <div id="windowStatusbar">
        <div id="windowStatusbarLeft">
            <div id="windowStatusbarIcon">
                aa
            </div>
            <div id="windowStatusbarTitle">
                b
            </div>
        </div>
        <div id="windowStatusbarRight">
            <div id="windowStatusbarButtons">
                <el-tooltip class="box-item" :content="syncState.syncMessage" placement="top-end">
                    <el-icon class="sync-status__icon" :class="iconClass[syncState.syncState]">
                        <FolderOpened v-if="syncState.syncState == SyncState.LocalMode" />
                        <Warning v-if="syncState.syncState == SyncState.Warning" />
                        <CircleClose v-if="syncState.syncState == SyncState.Error" />
                        <CircleCheck v-if="syncState.syncState == SyncState.Synced" />
                        <Loading v-if="syncState.syncState in [SyncState.Downloading, SyncState.Uploading]" />
                    </el-icon>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#windowStatusbar {
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: space-between;
    color: #fff;

    #windowStatusbarLeft {
        display: flex;
        align-items: center;

        #windowStatusbarIcon {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        #windowStatusbarTitle {
            font-size: 14px;
            margin-left: 10px;
        }
    }

    #windowStatusbarRight {
        display: flex;
        align-items: center;

        #windowStatusbarButtons {
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;

            .sync-status__icon {
                height: 28px;
                width: 28px;
                cursor: pointer;

                &:hover {
                    background-color: var(--app-color-background-dark);
                }

                &.icon-success {
                    color: #4caf50;
                }

                &.icon-error {
                    color: #f44336;
                }

                &.icon-loading {
                    color: #2196f3;
                    animation: rotate 1s linear infinite;
                }

                &.icon-disabled {
                    color: #4e5a60;
                }

                &.icon-warning {
                    color: #ffc107;
                }
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}
</style>