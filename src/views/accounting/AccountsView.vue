<script setup lang="ts">
import { reactive, computed } from "vue";

import { useBalanceStore } from "@/stores/balance";

import { uuid } from "@/utils/data";
import { Account } from "@/models/accounting";

const accountingStore = useBalanceStore();

const accounts = computed(() =>
  accountingStore.db.Accounts.map((a) => a.export())
);

const newAccount = reactive({
  name: "",
});

const addAccount = () => {
  accountingStore.db.addAccount(new Account(uuid(), newAccount.name));
};
</script>

<template>
  <div class="accounts-view">
    <div class="card add-account">
      <input
        type="text"
        placeholder="Nombre de la cuenta"
        v-model="newAccount.name"
      />
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="addAccount"
      >
        Agregar cuenta
      </el-button>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Cuentas</h3>
      </div>
      <div class="card-body">
        <el-table :data="accounts" stripe>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="Nombre"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
