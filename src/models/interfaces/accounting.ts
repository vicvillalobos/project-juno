export enum ITransactionType {
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

export enum IAgentType {
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

export enum IAccountingDueType {
    SameDayOfWeek,
    SameDayOfMonth,
    FirstLaborDayOfMonth,
    LastLaborDayOfMonth,
    FirstWeekdayOfMonth,
    LastWeekdayOfMonth
}

export interface IAccountingAccount {
    id: string;
    name: string;
}

export interface IAccountingAgent {
    id: string;
    name: string;
    imageUrl?: string;
    type: IAgentType;
}

export interface IAccountingSubscription {
    id: string;
    name: string;
    account: IAccountingAccount;
    agent: IAccountingAgent;
    dueDate: Date;
    dueType: IAccountingDueType;
    lastPaymentDate?: Date;
}

export interface IAccountingTransactionLog {
    id: string;
    description?: string;
    date: Date;
    account: IAccountingAccount;
    amount: number;
    type: ITransactionType;
    agent: IAccountingAgent;
    subscription?: IAccountingSubscription;
}

export interface IAccountingData {
    accounts: IAccountingAccount[];
    agents: IAccountingAgent[];
    subscriptions: IAccountingSubscription[];
    transactionLogs: IAccountingTransactionLog[];
}

export interface ITransactionLogQuery {
    account?: IAccountingAccount;
    agent?: IAccountingAgent;
    subscription?: IAccountingSubscription;
    type?: ITransactionType;
    dateFrom?: Date;
    dateTo?: Date;
}