import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IBalanceMovement } from '../models/interfaces/balance'
import { groupMovementsByDate } from '@/utils/data'
import { AccountingDatabase } from '@/models/accounting'

export const useBalanceStore = defineStore('balance', () => {

    const db = reactive(AccountingDatabase.load());

    return { db }

})
