import { NextFunction, Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { getBalance } from '../utils/Balance';

type Statement = {
  description?: string;
  amount: number;
  created_at: Date;
  type: string;
};

type Customer = {
  id: string;
  cpf: string;
  name: string;
  statement: Statement[];
};

const customers: Customer[] = [];

interface RequestCustomer extends Request {
  customer?: Customer;
}

//Middleware
export function verifyExistingAccount(
  request: RequestCustomer,
  response: Response,
  next: NextFunction,
) {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer)
    return response.status(404).send({ error: 'Customer not found' });

  request.customer = customer;

  return next();
}

export function createAccount(request: Request, response: Response) {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (account) => account.cpf === cpf,
  );

  if (customerAlreadyExists)
    return response.status(400).send({ error: 'Customer already exists!' });

  const id = uuidv4();

  const account: Customer = {
    id,
    cpf,
    name,
    statement: [],
  };

  customers.push(account);

  return response.status(201).send();
}

export function getStatement(request: RequestCustomer, response: Response) {
  const { customer } = request;

  return response.json(customer?.statement);
}

export function addStatement(request: RequestCustomer, response: Response) {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation: Statement = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer?.statement.push(statementOperation);

  return response.status(201).send();
}

export function withdraw(request: RequestCustomer, response: Response) {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer?.statement);

  if (balance < amount)
    return response.status(400).json({ error: 'Insufficient funds' });

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer?.statement.push(statementOperation);

  return response.status(201).send();
}

export function getStatementByDate(
  request: RequestCustomer,
  response: Response,
) {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + ' 00:00');

  const statement = customer?.statement.filter(
    (statement) =>
      statement.created_at.toDateString() === dateFormat.toDateString(),
  );

  return response.json(statement);
}

export function getAccount(request: RequestCustomer, response: Response) {
  const { customer } = request;

  return response.status(201).send(customer);
}

export function updateAccount(request: RequestCustomer, response: Response) {
  const { name } = request.body;

  const { customer } = request;

  customer && (customer.name = name);

  return response.status(201).send(customer);
}

export function deleteAccount(request: RequestCustomer, response: Response) {
  const { customer } = request;

  const index = customers.findIndex((user) => user.id === customer?.id);

  customers.splice(index, 1);

  return response.status(201).send();
}

export function getUserBalance(request: RequestCustomer, response: Response) {
  const { customer } = request;

  const balance = getBalance(customer?.statement);

  return response.send(balance);
}
