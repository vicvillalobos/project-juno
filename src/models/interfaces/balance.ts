export enum MovementType {
    Income = 1000,
    Salary = 1001,
    Gift = 1002,
    OtherIncome = 1003,
    Expense = 2000,
    Purchase = 2001,
    Health = 2002,
    Education = 2003,
    Entertainment = 2004,
    Transportation = 2005,
    Food = 2006,
    Housekeeping = 2007,
    Bills = 2008
}

export enum ICompanyType {
    Bank = 1,
    CreditCard = 2,
    Streaming = 3,
    Electricity = 4,
    Water = 5,
    Gas = 6,
    Phone = 7,
    Internet = 8,
    Insurance = 9,
    Other = 10
}

export interface ICompany {
    id: string;
    name: string;
    url?: string;
    logo?: string;
    description?: string;
    type: ICompanyType;
}

export interface IMovementSource {
    id: string;
    name: string;
    type: MovementType;
}

export interface ISubscription extends IMovementSource {
    url?: string;
    dueDate: Date;
    recurrentAmount?: number;
}

export interface IBillSource extends IMovementSource {
    url?: string;
    dueDate: Date;
    company: ICompany;
}

export interface IBalanceMovement {
    amount: number;
    date: Date;
    description?: string;
    type: MovementType;

}

export interface IAccount {
    id: string;
    name: string;
}