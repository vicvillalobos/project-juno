import type {
    IAccountingAccount, IAccountingAgent, IAgentType, IAccountingDueType,
    IAccountingSubscription, IAccountingTransactionLog, ITransactionType, IAccountingData, ITransactionLogQuery
} from "./interfaces/accounting";

abstract class Exportable {
    abstract export(): any;
}

export class Account extends Exportable {

    id: string;
    name: string;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this.name = name;
    }

    export(): IAccountingAccount {
        return {
            id: this.id,
            name: this.name
        };
    }

}

export class Agent extends Exportable {

    id: string;
    name: string;
    imageUrl?: string;
    type: IAgentType;

    constructor(id: string, name: string, type: IAgentType, imageUrl?: string) {
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.imageUrl = imageUrl;
    }

    export(): IAccountingAgent {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            imageUrl: this.imageUrl
        };
    }

}

export class Subscription extends Exportable {

    id: string;
    name: string;
    account: Account;
    agent: Agent;
    dueDate: Date;
    dueType: IAccountingDueType;
    lastPaymentDate?: Date;

    constructor(id: string, name: string, account: Account, agent: Agent, dueDate: Date, dueType: IAccountingDueType, lastPaymentDate?: Date) {
        super();
        this.id = id;
        this.name = name;
        this.account = account;
        this.agent = agent;
        this.dueDate = dueDate;
        this.dueType = dueType;
        this.lastPaymentDate = lastPaymentDate;
    }

    export(): IAccountingSubscription {
        return {
            id: this.id,
            name: this.name,
            account: this.account.export(),
            agent: this.agent.export(),
            dueDate: this.dueDate,
            dueType: this.dueType,
            lastPaymentDate: this.lastPaymentDate
        };
    }

}

export class TransactionLog extends Exportable {

    id: string;
    description?: string;
    date: Date;
    account: Account;
    amount: number;
    type: ITransactionType;
    agent: Agent;
    subscription?: Subscription;

    constructor(id: string, description: string | undefined, date: Date, account: Account, amount: number, type: ITransactionType, agent: Agent, subscription?: Subscription) {
        super();
        this.id = id;
        this.description = description;
        this.date = date;
        this.account = account;
        this.amount = amount;
        this.type = type;
        this.agent = agent;
        this.subscription = subscription;
    }

    export(): IAccountingTransactionLog {
        return {
            id: this.id,
            description: this.description,
            date: this.date,
            account: this.account.export(),
            amount: this.amount,
            type: this.type,
            agent: this.agent.export(),
            subscription: this.subscription?.export()
        };
    }

}

export class AccountingDatabase {
    agents: Agent[];
    accounts: Account[];
    subscriptions: Subscription[];
    transactionLogs: TransactionLog[];

    constructor() {
        this.agents = [];
        this.accounts = [];
        this.subscriptions = [];
        this.transactionLogs = [];
    }

    serialize(): string {

        const data = {
            agents: this.agents.map(agent => agent.export()),
            accounts: this.accounts.map(account => account.export()),
            subscriptions: this.subscriptions.map(subscription => subscription.export()),
            transactionLogs: this.transactionLogs.map(transactionLog => transactionLog.export())
        };

        return JSON.stringify(data);
    }

    deserialize(data: string): void {

        const parsedData = JSON.parse(data);

        this.agents = parsedData.agents.map((agent: IAccountingAgent) => new Agent(agent.id, agent.name, agent.type, agent.imageUrl));
        this.accounts = parsedData.accounts.map((account: IAccountingAccount) => new Account(account.id, account.name));
        this.subscriptions = parsedData.subscriptions.map((subscription: IAccountingSubscription) => new Subscription(subscription.id, subscription.name, this.getAccountById(subscription.account.id), this.getAgentById(subscription.agent.id), subscription.dueDate, subscription.dueType, subscription.lastPaymentDate));
        this.transactionLogs = parsedData.transactionLogs.map((transactionLog: IAccountingTransactionLog) => new TransactionLog(transactionLog.id, transactionLog.description, transactionLog.date, this.getAccountById(transactionLog.account.id), transactionLog.amount, transactionLog.type, this.getAgentById(transactionLog.agent.id), transactionLog.subscription ? this.getSubscriptionById(transactionLog.subscription.id) : undefined));
    }

    save(): void {
        localStorage.setItem("accounting", this.serialize());
    }

    static load(): AccountingDatabase {
        const data = localStorage.getItem("accounting");

        const instance = new AccountingDatabase();

        if (data) {
            instance.deserialize(data);
        }

        return instance;
    }

    getAccountById(id: string): Account {
        return this.accounts.find(account => account.id === id) as Account;
    }

    getAgentById(id: string): Agent {
        return this.agents.find(agent => agent.id === id) as Agent;
    }

    getSubscriptionById(id: string): Subscription {
        return this.subscriptions.find(subscription => subscription.id === id) as Subscription;
    }

    getTransactionLogById(id: string): TransactionLog {
        return this.transactionLogs.find(transactionLog => transactionLog.id === id) as TransactionLog;
    }

    addAccount(account: Account): void {
        this.accounts.push(account);
    }

    addAgent(agent: Agent): void {
        this.agents.push(agent);
    }

    addSubscription(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    addTransactionLog(transactionLog: TransactionLog): void {
        this.transactionLogs.push(transactionLog);
    }

    removeAccount(account: Account): void {
        this.accounts = this.accounts.filter(acc => acc.id !== account.id);
    }

    removeAgent(agent: Agent): void {
        this.agents = this.agents.filter(ag => ag.id !== agent.id);
    }

    removeSubscription(subscription: Subscription): void {
        this.subscriptions = this.subscriptions.filter(sub => sub.id !== subscription.id);
    }

    removeTransactionLog(transactionLog: TransactionLog): void {
        this.transactionLogs = this.transactionLogs.filter(tl => tl.id !== transactionLog.id);
    }

    updateAccount(account: Account): void {
        const index = this.accounts.findIndex(acc => acc.id === account.id);
        this.accounts[index] = account;
    }

    updateAgent(agent: Agent): void {
        const index = this.agents.findIndex(ag => ag.id === agent.id);
        this.agents[index] = agent;
    }

    updateSubscription(subscription: Subscription): void {
        const index = this.subscriptions.findIndex(sub => sub.id === subscription.id);
        this.subscriptions[index] = subscription;
    }

    updateTransactionLog(transactionLog: TransactionLog): void {
        const index = this.transactionLogs.findIndex(tl => tl.id === transactionLog.id);
        this.transactionLogs[index] = transactionLog;
    }

    get Accounts(): Account[] {
        return this.accounts;
    }

    get Agents(): Agent[] {
        return this.agents;
    }

    get Subscriptions(): Subscription[] {
        return this.subscriptions;
    }

    get TransactionLogs(): TransactionLog[] {
        return this.transactionLogs;
    }

    get AccountingData(): IAccountingData {
        return {
            agents: this.agents.map(agent => agent.export()),
            accounts: this.accounts.map(account => account.export()),
            subscriptions: this.subscriptions.map(subscription => subscription.export()),
            transactionLogs: this.transactionLogs.map(transactionLog => transactionLog.export())
        };
    }

    QueryTransactionLogs(query: ITransactionLogQuery): TransactionLog[] {

        let transactionLogs = this.transactionLogs;

        if (query.account !== undefined) {
            transactionLogs = transactionLogs.filter(transactionLog => transactionLog.account.id === query.account.id);
        }

        if (query.agent) {
            transactionLogs = transactionLogs.filter(transactionLog => transactionLog.agent.id === query.agent.id);
        }

        if (query.subscription) {
            transactionLogs = transactionLogs.filter(transactionLog => transactionLog.subscription?.id === query.subscription.id);
        }

        if (query.dateFrom) {
            transactionLogs = transactionLogs.filter(transactionLog => transactionLog.date >= query.dateFrom);
        }

        if (query.dateTo) {
            transactionLogs = transactionLogs.filter(transactionLog => transactionLog.date <= query.dateTo);
        }

        return transactionLogs;

    }

}