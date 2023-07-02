import { describe, it, expect } from 'vitest';
import { IBalanceMovement } from '@/models/interfaces/balance';
import { AccumulativeMonth } from '@/models/accumulativemonth';

describe("AccumulativeMonth", () => {

    it("should separate movements and group by day", () => {

        const movements = [
            {
                amount: 100,
                date: new Date(2021, 0, 1),
            },
            {
                amount: 200,
                date: new Date(2021, 0, 1),
            },
            {
                amount: 400,
                date: new Date(2021, 0, 3),
            },
            {
                amount: 100,
                date: new Date(2021, 0, 3),
            },
        ] as IBalanceMovement[];

        const accumulatedMonth = new AccumulativeMonth(new Date(2021, 0, 1), movements);

        expect(accumulatedMonth.Incomes.filter(x => x.date.getDate() < 4)).toStrictEqual(
            [
                {
                    amount: 300,
                    date: new Date(2021, 0, 1),
                },
                {
                    amount: 0,
                    date: new Date(2021, 0, 2),
                },
                {
                    amount: 500,
                    date: new Date(2021, 0, 3),
                },
            ]
        );

    });

    it("should accumulate movements", () => {

        const movements = [
            {
                amount: 100,
                date: new Date(2021, 0, 1),
            },
            {
                amount: 200,
                date: new Date(2021, 0, 1),
            },
            {
                amount: 400,
                date: new Date(2021, 0, 3),
            },
            {
                amount: 100,
                date: new Date(2021, 0, 3),
            },
        ] as IBalanceMovement[];

        const accumulatedMonth = new AccumulativeMonth(new Date(2021, 0, 1), movements);

        expect(accumulatedMonth.IncomesAccumulated.filter(x => x.date.getDate() < 4)).toStrictEqual(
            [
                {
                    amount: 300,
                    date: new Date(2021, 0, 1),
                },
                {
                    amount: 300,
                    date: new Date(2021, 0, 2),
                },
                {
                    amount: 800,
                    date: new Date(2021, 0, 3),
                },
            ]
        );

    });

});