<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { useBalanceStore } from "@/stores/balance";
import { Agent, TransactionLog } from "@/models/accounting";
import { ETransactionType } from "@/models/interfaces/accounting";

const accountingStore = useBalanceStore();

const accounts = computed(() => accountingStore.db.Accounts);

const selectedAccount = ref(accountingStore.db.Accounts[0].id);

const newTransaction = reactive({
  amount: 0,
  description: "",
  date: new Date(),
  type: ETransactionType.Expense,
  agent: "",
});

const addTransaction = () => {
  const account = accountingStore.db.getAccountById(selectedAccount.value);
  account.addTransactionLog(
    new TransactionLog(
      newTransaction.description,
      new Date(),
      account,
      newTransaction.amount,
      newTransaction.type,
      accountingStore.db.getAgentById(newTransaction.agent)
    )
  );
};
</script>

<template>
  <div class="accounting-home-view">
    <div class="section">
      <h3>Cuentas</h3>

      <el-tabs v-model="selectedAccount" class="demo-tabs">
        <el-tab-pane
          v-for="account in accounts"
          :name="account.id"
          :label="account.name"
        >
          <div class="card vertical-spacing">
            <h4>Agregar movimiento</h4>
            <div class="add-movement">
              <el-input
                placeholder="Monto"
                type="number"
                v-model="newTransaction.amount"
              />
              <el-input
                placeholder="Descripción"
                v-model="newTransaction.description"
              />
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="addTransaction"
              >
                Agregar movimiento
              </el-button>
            </div>
          </div>
          <div class="card">
            <h4>Movimientos</h4>
            <div class="add-movement"></div>
            <el-table :data="account.TransactionLogs" stripe>
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="amount" label="Monto"></el-table-column>
              <el-table-column
                prop="description"
                label="Descripción"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="list">
      <span></span>
    </div>
  </div>
</template>
