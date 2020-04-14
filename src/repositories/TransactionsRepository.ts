import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(trans => trans.type === 'income')
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      },0);
    const outcome = this.transactions.filter(trans => trans.type === 'outcome')
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      },0);

    return {
      income: income,
      outcome: outcome,
      total: income - outcome
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
