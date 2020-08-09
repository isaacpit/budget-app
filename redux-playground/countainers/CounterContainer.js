import * as React from 'react';

import { connect } from 'react-redux';
import { incrementCounter } from '../actions';

import Counter from '../presentational-components/Counter';

// grabs important state values 
const mapStateToProps = (state) => ({
  value: state.test_counter,
  budgets: state.budgets,
});

// states how to dispatch the functions
const mapDispatchToProps = (dispatch) => ({
  incrementCounter: () => dispatch(incrementCounter()),
});

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;
