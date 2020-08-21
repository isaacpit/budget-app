import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { Button as ButtonElements } from 'react-native-elements';

import { connect } from 'react-redux';

import { getTransactionsByBudgetId } from '../redux-playground/actions';

const getTransactionTotal = (transactions) => {
  return transactions.reduce(function (cnt, budget) {
    return cnt + budget.transactionAmount;
  }, 0);
};

const ListTransaction = ({ transactions, budgetId }) => {
  return (
    <View>
      <Text>Transactions</Text>
      {/* TODO: change to flatlist */}
      {transactions.map((item, index) => {
        return (
          <View style={styles.rowContainer} key={index}>
            <Text>{item.transactionName}</Text>
            <Text>{item.transactionAmount}</Text>
          </View>
        );
      })}
      <View style={styles.line} />
      <View style={styles.rowContainer}>
        <Text>Total: </Text>
        <Text>{getTransactionTotal(transactions)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  line: {
    borderWidth: 5,
  },
});

const mapStateToProps = (state, ownProps) => {
  let transactionsData = getTransactionsByBudgetId(state, ownProps.budgetId);
  return {
    transactions: transactionsData,
  };
};

export default connect(mapStateToProps)(ListTransaction);
