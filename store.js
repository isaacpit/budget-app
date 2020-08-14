import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import budgetApp, {
  addBudget,
  addTransactionToBudget,
} from './redux-playground/actions';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(budgetApp, composeEnhancer(applyMiddleware(thunk)));

export default store;

console.log('Initial State:');
console.log(store.getState());

const unsubscribe = store.subscribe(() =>
  console.log(JSON.stringify(store.getState(), null, 2)),
);

const some_id = uuidv4();

const nBudgets = 10;
const arr_ids = Array(nBudgets);

console.log(`arr_ids: ${JSON.stringify(arr_ids, null, 2)}`);

console.log(`arr_ids: ${JSON.stringify(arr_ids, null, 2)}`);

const fake_id = 44;
store.dispatch(addBudget(some_id, 'some_name', 100));

store.dispatch(
  addTransactionToBudget('0', '46', 'Added Transaction', 3, new Date()),
);

for (let i = 0; i < nBudgets; ++i) {
  arr_ids[i] = uuidv4();
  console.log(`i: ${i}`);
  store.dispatch(addBudget(arr_ids[i], 'some_name', i + 1));
}

console.log(
  `CHECKER state: ${JSON.stringify(
    store.getState().mapBudgetIdToData.hasOwnProperty(some_id),
    null,
    2,
  )}`,
);

console.log(
  `state: ${JSON.stringify(
    store.getState().mapBudgetIdToData[some_id],
    null,
    2,
  )}`,
);

console.log(
  `FAKE state: ${JSON.stringify(
    store.getState().mapBudgetIdToData.hasOwnProperty(fake_id),
    null,
    2,
  )}`,
);

console.log(
  `FAKE state: ${JSON.stringify(
    store.getState().mapBudgetIdToData[fake_id],
    null,
    2,
  )}`,
);
