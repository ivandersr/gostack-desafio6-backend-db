// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  categoryName: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryName,
  }: Request): Promise<Transaction> {
    switch (type) {
      case 'income':
        break;
      case 'outcome':
        break;
      default:
        throw new AppError(
          'Invalid transaction type. Transaction should be (income/outcome)',
          400,
        );
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (
      type === 'outcome' &&
      value > (await transactionsRepository.getBalance()).total
    ) {
      throw new AppError(
        "You don't have enought balance to perform this transaction.",
        400,
      );
    }

    const createCategory = new CreateCategoryService();
    const category = await createCategory.execute(categoryName);

    const transaction = transactionsRepository.save({
      title,
      value,
      type,
      category,
    });

    return transaction;
  }
}

export default CreateTransactionService;
