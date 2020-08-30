// actions
export const ADD_BUDGET = 'ADD_BUDGET';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const UPDATE_BUDGET_VALUES = 'UPDATE_BUDGET';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION_VALUES';
export const DELETE_BUDGET = 'DELETE_BUDGET';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
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

export const updateTransaction = (
  transactionId,
  transactionName,
  transactionAmount,
  transactionDate = new Date(),
) => ({
  type: UPDATE_TRANSACTION,
  transactionId: transactionId,
  transactionName: transactionName,
  transactionAmount: transactionAmount,
  transactionDate: transactionDate,
});

export const deleteBudget = (budgetId) => ({
  type: DELETE_BUDGET,
  budgetId: budgetId,
});

export const deleteTransaction = (budgetId, transactionId) => ({
  type: DELETE_TRANSACTION,
  budgetId: budgetId,
  transactionId: transactionId,
});

// separate file

// keep data separate from UI state
const initialState = {
  // budgets: [],
  // test_counter: 0,
  mapBudgetIdToData: {
    '0': {
      budgetName: 'First Budget',
      budgetMax: 20,
      budgetId: '0',
      transactionIds: ['44'],
    },
  },
  mapTransactionIdToData: {
    '44': {
      transactionId: '44',
      transactionName: 'Grocery Trip',
      transactionAmount: 5,
      transactionDate: new Date(),
    },
  },
};

// Reducer
const budgetAppReducer = (state = initialState, action) => {
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
        // add transaction data
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
    case UPDATE_TRANSACTION:
      return Object.assign({}, state, {
        // set transaction data
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
    case DELETE_BUDGET:
      // deletes a budget and all associated transactions
      const budgetIdToDelete = action.budgetId;
      console.log(`Deleting budgetId: ${budgetIdToDelete}`);
      let transactionsIdsToDelete = state.mapBudgetIdToData[budgetIdToDelete].transactionIds;
      console.log(
        `transactionsToDelete: ${JSON.stringify(
          transactionsIdsToDelete,
          null,
          2,
        )}`,
      );
      let newState = Object.assign({}, state);
      delete newState.mapBudgetIdToData[action.budgetId];
      for (let j = 0; j < transactionsIdsToDelete.length; ++j) {
        delete newState.mapTransactionIdToData[transactionsIdsToDelete[j]];
      }
      return newState;
    case DELETE_TRANSACTION:
      const transactionIdToDelete = action.transactionId;
      const associatedBudgetId = action.budgetId;
      const newTransactionList = state.mapBudgetIdToData[
        associatedBudgetId
      ].transactionIds.filter((txId) => {
        console.log(
          `txId: ${transactionIdToDelete} ${txId} ${
            parseInt(txId) !== transactionIdToDelete
          }
          ${typeof txId} ${typeof transactionIdToDelete}`,
        );
        // should this be !== ?
        return txId != transactionIdToDelete;
      });
      console.log(
        `Deleting transactionId: ${transactionIdToDelete} budgetId: ${associatedBudgetId}`,
      );
      console.log(
        `oldTxList: ${state.mapBudgetIdToData[associatedBudgetId].transactionIds} newTxList: ${newTransactionList}`,
      );
      // update budget's list of transactions
      let updatedState = Object.assign({}, state, {
        ...state,
        mapBudgetIdToData: {
          ...state.mapBudgetIdToData,
          [associatedBudgetId]: {
            ...state.mapBudgetIdToData[associatedBudgetId],
            transactionIds: state.mapBudgetIdToData[
              associatedBudgetId
            ].transactionIds.filter((txId) => txId != transactionIdToDelete),
          },
        },
      });
      // delete transaction data
      delete updatedState.mapTransactionIdToData[transactionIdToDelete];
      return updatedState;
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

export default budgetAppReducer;
