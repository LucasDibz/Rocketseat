type Statement = {
  amount: number;
  type: string;
};

export function getBalance(statements: Statement[] | undefined) {
  const balance = statements?.reduce((acc, operation) => {
    if (operation.type === 'credit') return acc + operation.amount;

    return acc - operation.amount;
  }, 0);

  return balance || 0;
}
