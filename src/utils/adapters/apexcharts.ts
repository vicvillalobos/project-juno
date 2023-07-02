
interface IApexDataLabels {
    enabled: boolean;
}

interface IApexStroke {
    curve: string;
}

interface IApexTitle {
    text: string;
    align: string;
}

interface IApexGrid {
    borderColor: string;
    row: {
        colors: string[];
        opacity: number;
    }
}

export interface IApexSeries {
    name: string;
    data: number[] | string[] | Date[];
}

export class ApexChart {
    chartHeight: number;
    type: string;
    zoom: boolean;
    dataLabels: IApexDataLabels;
    stroke: IApexStroke;
    title: IApexTitle;
    grid: IApexGrid;
    series: IApexSeries[];
    categories: string[] | number[] | Date[];

    constructor(xAxis: IApexSeries[], categories: string[] | number[] | Date[], type: string = 'line', chartHeight: number = 350) {

        this.series = xAxis;
        this.categories = categories;
        this.chartHeight = chartHeight;
        this.type = type;

        // Default options        
        this.zoom = true;
        this.dataLabels = {
            enabled: false
        };
        this.stroke = {
            curve: 'straight'
        };
        this.title = {
            text: 'Product Trends by Month',
            align: 'left'
        };
        this.grid = {
            borderColor: '#1f1f1f',
            row: {
                colors: ['#18181a', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        };


    }

    get Series(): IApexSeries[] {
        return this.series;
    }

    get ChartOptions() {
        return {
            chart: {
                height: this.chartHeight,
                type: this.type,
                zoom: {
                    enabled: this.zoom
                }
            },
            dataLabels: this.dataLabels,
            stroke: this.stroke,
            title: this.title,
            grid: this.grid,
            theme: { mode: 'dark' },
            xaxis: {
                categories: this.categories,
            }
        }
    }
}