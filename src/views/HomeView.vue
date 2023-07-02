<script setup lang="ts">
import { ref } from "vue";
import CardChart from "@/components/dashboard/CardChart.vue";
import CardIndicator from "@/components/dashboard/CardIndicator.vue";
import { moneyValueFormatter } from "@/utils/formatters";
// State
const activeName = ref("first");

const numbers = ref({
  income: Math.random() * 3000000,
  expenses: Math.floor(Math.random() * 20) * 100000,
  balance: 0
})

numbers.value.balance = numbers.value.income - numbers.value.expenses;

const indicators = ref([
  {
    title: "Ingresos del mes",
    value: moneyValueFormatter(numbers.value.income),
    color: "#fff",
    bgColor: "#00c853",
  },
  {
    title: "Gastos del mes",
    value: moneyValueFormatter(numbers.value.expenses),
    color: "#fff",
    bgColor: "#d50000",
  },
  {
    title: "Balance actual",
    value: moneyValueFormatter(numbers.value.balance),
    color: "#fff",
    bgColor: "#ff6d00",
  },
]);

// Methods

const handleClick = (tab: any, event: any) => {
  console.log(tab, event);
};
</script>

<template>
  <main>
    <el-row class="vertical-spacing" :gutter="20">
      <el-col>
        <CardChart />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" v-for="i in indicators">
        <CardIndicator :title="i.title" :value="i.value" />
      </el-col>
    </el-row>
  </main>
</template>

<style lang="scss">
main {
  padding: 20px;
}
</style>