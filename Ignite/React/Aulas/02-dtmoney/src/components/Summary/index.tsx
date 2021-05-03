import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  // const totalDeposits = transactions.reduce((total, transaction) => {
  //   if (transaction.type === 'deposit') return total + transaction.amount;
  //   return total;
  // }, 0);

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === 'deposit') {
        accumulator.deposits += transaction.amount;
        accumulator.total += transaction.amount;
      } else {
        accumulator.withdraws += transaction.amount;
        accumulator.total -= transaction.amount;
      }

      return accumulator;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container total={summary.total}>
      <div>
        <header>
          <p>Entradas</p> <img src={incomeImg} alt='Entradas' />
        </header>
        <strong className='income'>
          {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p> <img src={outcomeImg} alt='Saídas' />
        </header>
        <strong className='outcome'>
          -{' '}
          {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p> <img src={totalImg} alt='Total' />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
