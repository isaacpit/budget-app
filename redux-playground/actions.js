// actions
export const ADD_BUDGET = 'ADD_BUDGET';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const ADD_BUDGET_OBJ = 'ADD_BUDGET_OBJ';
// export const ADD_TRANSACTION = 'ADD_TRANSACTION';

// action creators
export const addBudget = (text, max) => ({
  type: ADD_BUDGET,
  name: text,
  max: max,
});

export const updateBudget = (index, text, max) => ({
  type: UPDATE_BUDGET,
  index: index,
  text: text,
  max: max,
});

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

export const addBudgetObj = (id, name, max) => ({
  type: ADD_BUDGET_OBJ,
  id: id,
  name: name,
  max: max,
});

// separate file

// keep data separate from UI state
const initialState = {
  budgets: [],
  test_counter: 0,
  mapBudgetIdToData: {},
};

// Reducer
const budgetApp = (state = initialState, action) => {
  console.log('previous state: ');
  console.log(JSON.stringify(state, null, 2));
  console.log(`dispatching action type: ${action.type}`);
  console.log(`full action: ${JSON.stringify(action, null, 2)}`);
  switch (action.type) {
    case ADD_BUDGET:
      return Object.assign({}, state, {
        budgets: [
          ...state.budgets,
          {
            name: action.name,
            max: action.max,
          },
        ],
      });
    case UPDATE_BUDGET:
      // update new state without mutating old state
      return Object.assign({}, state, {
        budgets: [
          state.budgets.map((budget, index) => {
            if (index === action.index) {
              return Object.assign(
                {},
                {
                  name: action.name,
                  max: action.max,
                },
              );
            }
            return budget;
          }),
        ],
      });
    case INCREMENT_COUNTER:
      return Object.assign({}, state, {
        test_counter: state.test_counter + 1,
      });
    case ADD_BUDGET_OBJ:
      return Object.assign({}, state, {
        mapBudgetIdToData: {
          ...state.mapBudgetIdToData,
          [action.id]: {
            budgetName: action.name,
            budgetMax: action.max,
            budgetId: action.id,
          },
        },
      });
    default:
      return state;
  }
};

export default budgetApp;
