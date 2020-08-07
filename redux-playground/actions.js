// actions
export const ADD_BUDGET = 'ADD_BUDGET';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
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

// separate file

// keep data separate from UI state
const initialState = {
  budgets: [],
  test_counter: 0,
};

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
    default:
      return state;
  }
};

export default budgetApp;
