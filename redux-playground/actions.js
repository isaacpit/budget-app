// actions
export const ADD_BUDGET = 'ADD_BUDGET';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const UPDATE_BUDGET_VALUES = 'UPDATE_BUDGET';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
// export const ADD_TRANSACTION = 'ADD_TRANSACTION';

// action creators
export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

export const addBudget = (id, name, max) => ({
  type: ADD_BUDGET,
  id: id,
  name: name,
  max: max,
});

export const updateBudget = (id, name, max) => ({
  type: UPDATE_BUDGET_VALUES,
  id: id,
  name: name,
  max: max,
});

export const addTransactionToBudget = (
  budgetId,
  transactionId,
  transactionName,
  transactionAmount,
  transactionDate = new Date(),
) => ({
  type: ADD_TRANSACTION,
  budgetId: budgetId,
  transactionId: transactionId,
  transactionName: transactionName,
  transactionAmount: transactionAmount,
  transactionDate: transactionDate,
});
// separate file

// keep data separate from UI state
const initialState = {
  budgets: [],
  test_counter: 0,
  mapBudgetIdToData: {
    '0': {
      budgetName: 'Initial Budget',
      budgetMax: 20,
      budgetId: '0',
      transactionIds: ['44', '45'],
    },
  },
  mapTransactionIdToData: {
    '44': {
      transactionId: '44',
      transactionName: 'HEB',
      transactionAmount: 10,
      transactionDate: new Date(),
    },
    '45': {
      transactionId: '45',
      transactionName: 'Kroger',
      transactionAmount: 5,
      transactionDate: new Date(),
    },
  },
};

// Reducer
const budgetApp = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUDGET:
      return Object.assign({}, state, {
        mapBudgetIdToData: {
          ...state.mapBudgetIdToData,
          [action.id]: {
            budgetName: action.name,
            budgetMax: action.max,
            budgetId: action.id,
            transactionIds: [],
          },
        },
      });
    case UPDATE_BUDGET_VALUES:
      // update new state without mutating old state
      return Object.assign({}, state, {
        mapBudgetIdToData: {
          ...state.mapBudgetIdToData,
          [action.id]: {
            budgetName: action.name,
            budgetMax: action.max,
            budgetId: action.id,
            transactionIds: state.mapBudgetIdToData[action.id]
              ? state.mapBudgetIdToData[action.id].transactionIds
              : [],
            // TODO: transactions?
          },
        },
      });
    case ADD_TRANSACTION:
      return Object.assign({}, state, {
        ...state,
        // add transaction id to associated budget's list of transactions ids
        mapBudgetIdToData: {
          ...state.mapBudgetIdToData,
          [action.budgetId]: {
            ...state.mapBudgetIdToData[action.budgetId],
            transactionIds: [
              ...state.mapBudgetIdToData[action.budgetId].transactionIds,
              action.transactionId,
            ],
          },
        },
        mapTransactionIdToData: {
          ...state.mapTransactionIdToData,
          [action.transactionId]: {
            transactionId: action.transactionId,
            transactionName: action.transactionName,
            transactionAmount: action.transactionAmount,
            transactionDate: action.transactionDate,
          },
        },
      });
    // delete
    case INCREMENT_COUNTER:
      return Object.assign({}, state, {
        test_counter: state.test_counter + 1,
      });
    default:
      return state;
  }
};

// helper functions
export function getTransactionsByBudgetId(state, budgetId) {
  const listAssociatedTransactionsIds =
    state.mapBudgetIdToData[budgetId].transactionIds;
  let transactionsData = new Array(listAssociatedTransactionsIds.length);
  for (let i = 0; i < listAssociatedTransactionsIds.length; ++i) {
    const currTransactionData =
      state.mapTransactionIdToData[listAssociatedTransactionsIds[i]];
    transactionsData[i] = currTransactionData;
  }
  return transactionsData;
}

export default budgetApp;
