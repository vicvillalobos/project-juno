<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { ChartJS } from "@/utils/adapters/chartjs";
import { CurrentMonth } from "@/utils/dates";

import { LineChart } from 'vue-chart-3';
import type { ChartOptions, ChartData } from "chart.js";
import { Chart, registerables } from "chart.js";
import { useBalanceStore } from "@/stores/balance";
import { getAccumulatedAmounts } from "@/utils/data";
import { formatDate } from "@/utils/dates";
import type { IBalanceMovement } from "@/models/interfaces/balance";
import { AccumulativeMonth } from "@/models/accumulativemonth";

Chart.register(...registerables);

// random data between 2000 and 100000
const balanceStore = useBalanceStore();

const options = ref<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
        },
    },
});

const month = reactive(new AccumulativeMonth(new Date(), balanceStore.Movements));

const movements = computed(() => {
    return {
        income: month.IncomesAccumulated.map((d) => d.amount),
        expenses: month.ExpensesAccumulated.map((d) => d.amount * -1),
    };
});

const chartData = computed<ChartData<'line'>>(() => ({
    labels: CurrentMonth().map((d) => formatDate(d)),
    datasets: [
        {
            label: 'Ingresos',
            data: movements.value.income,
            backgroundColor: ['#00c853'],
            borderColor: ['#00c853'],
        }, {
            label: 'Gastos',
            data: movements.value.expenses,
            backgroundColor: ['#d50000'],
            borderColor: ['#d50000'],
        }
    ],
}));

</script>

<template>
    <div class="card">
        <h2>Ingresos y gastos del mes</h2>
        <LineChart :chartData="chartData" :options="options"></LineChart>
    </div>
</template>