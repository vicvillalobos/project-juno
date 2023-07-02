import type { IBalanceMovement } from "../models/interfaces/balance";

export const groupMovementsByDate = (movements: IBalanceMovement[]) => {
    // We need to group movements by date, and sum the amounts for each date.
    // also need to fill in missing dates with 0 amount

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

    // sort by date ascending
    result.sort((a, b) => {
        if (typeof a.date === 'string' || typeof b.date === 'string') {
            return 0;
        }
        return a.date.getTime() - b.date.getTime()
    });

    return result;

};

export const getAccumulatedAmounts = (movements: IBalanceMovement[]) => {
    // Each movement amount must be the accumulated sum of all previous movements plus the current amount.
    // This is done by iterating over the movements array and adding the current amount to the previous accumulated amount.

    const result = movements.slice(0);

    for (let i = 0; i < result.length; i++) {

        result[i].amount = result[i].amount + (result[i - 1]?.amount || 0);

    }

    return result;

};