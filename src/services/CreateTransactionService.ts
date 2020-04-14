import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    if (type === 'outcome') {

      let total = this.transactionsRepository.getBalance().total;

      if (total < value) {
        throw Error("You do not have enough money!");
      }
    }

    return this.transactionsRepository.create(new Transaction({title, value, type}));
  }
}

export default CreateTransactionService;
