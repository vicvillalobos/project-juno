import { formatDate } from "../dates";
import type { ChartData, Point, ChartDataset } from "chart.js";


export class ChartJS {

    datasets: ChartDataset<"line", (number | Point | null)[]>[];
    labels: Date[];

    constructor(data: ChartDataset<"line", (number | Point | null)[]>[], dates: Date[]) {

        this.datasets = data;
        this.labels = dates;

    }

    get Data(): ChartData<"line", (number | Point | null)[], unknown> {
        // transform IChartJSData to object literal
        return {
            datasets: this.datasets,
            labels: this.labels.map(date => formatDate(date))
        };
    }

}