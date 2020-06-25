import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = this.find();

    const totalIncome = (await transactions).reduce(
      (total, current) =>
        current.type === 'income' ? total + Number(current.value) : total,
      0,
    );

    const totalOutcome = (await transactions).reduce(
      (total, current) =>
        current.type === 'outcome' ? total + Number(current.value) : total,
      0,
    );

    const total = totalIncome - totalOutcome;
    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }
}

export default TransactionsRepository;
