import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import budgetApp, {
  addBudget,
  addTransactionToBudget,
  deleteBudget,
  deleteTransaction,
} from './redux-playground/actions';

import AsyncStorage from '@react-native-community/async-storage';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const DATA_KEY = '@data_key';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(budgetApp, composeEnhancer(applyMiddleware(thunk)));

export default store;

// subscribe store to do something on every action
// const unsubscribe = store.subscribe(() =>
//   console.log(JSON.stringify(store.getState(), null, 2)),
// );

const nBudgets = 4;
const arrBudgetIds = Array(nBudgets);

let mapBudgetIdsToTransactionIds = {};

// add some budgets
const addDummyBudgets = () => {
  for (let i = 0; i < nBudgets; ++i) {
    arrBudgetIds[i] = uuidv4();
    mapBudgetIdsToTransactionIds[arrBudgetIds[i]] = [];
    store.dispatch(
      addBudget(arrBudgetIds[i], 'Budget ' + (i + 1), (i + 1) * 20),
    );
    // add some transactions to those budgets
    for (let j = 0; j < i + 1; ++j) {
      const txId = uuidv4();
      mapBudgetIdsToTransactionIds[arrBudgetIds[i]] = [
        ...mapBudgetIdsToTransactionIds[arrBudgetIds[i]],
        txId,
      ];
      store.dispatch(
        addTransactionToBudget(
          arrBudgetIds[i],
          txId,
          'Transaction ' + j,
          (j + 1) * 10,
          new Date(),
        ),
      );
    }
  }
};

// addDummyBudgets()
