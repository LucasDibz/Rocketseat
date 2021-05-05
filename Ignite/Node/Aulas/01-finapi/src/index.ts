import express from 'express';

import {
  createAccount,
  verifyExistingAccount,
  getStatement,
  getStatementByDate,
  addStatement,
  withdraw,
  updateAccount,
  getAccount,
  deleteAccount,
  getUserBalance,
} from './controllers/accountsController';

const app = express();

app.post('/account', createAccount);

// app.use(verifyExistingAccount);

//Statements
app.get('/statement', verifyExistingAccount, getStatement);
app.get('/statement/date', verifyExistingAccount, getStatementByDate);

app.post('/deposit', verifyExistingAccount, addStatement);
app.post('/withdraw', verifyExistingAccount, withdraw);

//Accounts
app.get('/account', verifyExistingAccount, getAccount);
app.get('/balance', verifyExistingAccount, getUserBalance);
app.put('/account', verifyExistingAccount, updateAccount);
app.delete('/account', verifyExistingAccount, deleteAccount);

app.listen(3333);
