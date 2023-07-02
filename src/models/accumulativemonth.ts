import type { IBalanceMovement } from "./interfaces/balance";
import { moneyValueFormatter } from "../utils/formatters";
import { formatDate } from "../utils/dates";

export class AccumulativeMonth {

    month: Date;
    movements: IBalanceMovement[];

    constructor(month: Date, movements: IBalanceMovement[] = []) {
        this.month = month;
        this.movements = movements;
    }

    get Incomes(): IBalanceMovement[] {
        return this.getMovements(this.movements).filter(x => x.amount >= 0);
    }

    get Expenses(): IBalanceMovement[] {
        return this.getMovements(this.movements).filter(x => x.amount < 0);
    }

    get IncomesAccumulated(): IBalanceMovement[] {
        return this.getAccumulatedMovements(this.Incomes);
    }

    get ExpensesAccumulated(): IBalanceMovement[] {
        return this.getAccumulatedMovements(this.Expenses);
    }

    getAccumulatedMovements(movements: IBalanceMovement[]): IBalanceMovement[] {

        const result = [] as IBalanceMovement[];

        let accumulatedAmount = 0;
        for (let i = 0; i < movements.length; i++) {
            const movement = movements[i];
            accumulatedAmount += movement.amount;
            result.push({
                date: movement.date,
                amount: accumulatedAmount
            });
        }

        return result;
    }


    getMovements(movements: IBalanceMovement[]): IBalanceMovement[] {
        // group movements by date
        // fill missing dates with 0

        const daysInMonth = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0).getDate();

        const result = [] as IBalanceMovement[];

        const movementsAux = movements.slice(0);

        // iterate over movements
        for (let i = 0; i < movementsAux.length; i++) {

            const movement = movementsAux[i];

            // check if date already exists in result
            const existingDate = result.find(x => {
                if (typeof x.date === 'string' || typeof movement.date === 'string') {
                    return x.date === movement.date;
                }
                return x.date.getTime() === movement.date.getTime()
            });

            if (existingDate) {
                // if date exists, sum the amounts
                existingDate.amount += movement.amount;
            } else {
                // if date doesn't exist, add it
                result.push(movement);
            }

        }

        // fill missing dates with 0
        for (let i = 1; i <= daysInMonth; i++) {

            const date = new Date(this.month.getFullYear(), this.month.getMonth(), i);

            const existingDate = result.find(x => {
                if (typeof x.date === 'string' || typeof date === 'string') {
                    return x.date === date;
                }
                return x.date.getTime() === date.getTime()
            });

            if (!existingDate) {
                result.push({
                    date,
                    amount: 0
                });
            }

        }

        // sort by date ascending
        result.sort((a, b) => {
            if (typeof a.date === 'string' || typeof b.date === 'string') {
                return 0;
            }
            return a.date.getTime() - b.date.getTime()
        });

        return result;
    }



}