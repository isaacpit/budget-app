import React, { useState } from 'react';

import { Text, View, StyleSheet, TextInput } from 'react-native';

import { Button as ButtonElements } from 'react-native-elements';

import { connect } from 'react-redux';

import { updateTransaction } from '../redux-playground/actions';

import { getTransactionsByBudgetId } from '../redux-playground/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// loop through obj and return true if any of the values are true
const checkAnyTrue = (obj) => {
  return Object.values(obj).some((x) => x === true);
};

const getTransactionTotal = (transactions) => {
  return transactions.reduce(function (cnt, budget) {
    return cnt + parseFloat(budget.transactionAmount);
  }, 0);
};

const ListTransaction = ({ transactions, budgetId, updateTransaction }) => {
  let initialIsEditingState = {};
  let initialEditedTransactionNames = new Array(transactions.length);
  let initialEditedTransactionAmounts = new Array(transactions.length);
  for (let i = 0; i < transactions.length; ++i) {
    initialEditedTransactionNames[i] = transactions[i].transactionName;
    initialEditedTransactionAmounts[i] = transactions[i].transactionAmount;
    initialIsEditingState[i] = false;
  }
  console.log(
    `initialIsEditingState: ${JSON.stringify(initialIsEditingState, null, 2)}`,
  );
  console.log(
    `initialEditedTransactionNames: ${JSON.stringify(
      initialEditedTransactionNames,
      null,
      2,
    )}`,
  );
  console.log(
    `initialEditedTransactionAmounts: ${JSON.stringify(
      initialEditedTransactionAmounts,
      null,
      2,
    )}`,
  );
  // combine into a single array of objects
  const [isEditingTransactions, setIsEditingTransactions] = useState(
    initialIsEditingState,
  );
  const [editedTransactionNames, setEditedTransactionNames] = useState(
    initialEditedTransactionNames,
  );
  const [editedTransactionAmounts, setEditedTransactionAmounts] = useState(
    initialEditedTransactionAmounts,
  );
  console.log(
    `isEditingTransactions: ${JSON.stringify(isEditingTransactions, null, 2)}`,
  );
  console.log(
    `editedTransactionNames: ${JSON.stringify(
      editedTransactionNames,
      null,
      2,
    )}`,
  );
  console.log(
    `editedTransactionAmounts: ${JSON.stringify(
      editedTransactionAmounts,
      null,
      2,
    )}`,
  );

  const modifyTransactionNames = (index) => (text) => {
    console.log(`changeName: ${text}`);
    console.log(
      `editedNames: ${JSON.stringify(editedTransactionNames, null, 2)}`,
    );
    let oldNames = [...editedTransactionNames];
    oldNames[index] = text;
    console.log(`editedNames after: ${JSON.stringify(oldNames, null, 2)}`);
    setEditedTransactionNames(oldNames);
    // return oldNames;
  };

  const modifyTransactionAmounts = (index) => (text) => {
    console.log(`changeAmount: ${text}`);
    console.log(
      `editedAmounts: ${JSON.stringify(editedTransactionAmounts, null, 2)}`,
    );
    let oldAmounts = [...editedTransactionAmounts];
    oldAmounts[index] = text;
    console.log(`editedAmounts after: ${JSON.stringify(oldAmounts, null, 2)}`);
    setEditedTransactionAmounts(oldAmounts);
    // return oldNames;
  };

  // const [editedTransactions, setEditedTransactions] = useState(new Array(transactions.length));
  console.log(`editedTransactions: ${JSON.stringify(isEditingTransactions)}`);
  console.log(`listTransactions: \n${JSON.stringify(transactions, null, 2)}`);
  console.log('any: ' + checkAnyTrue(isEditingTransactions));
  return (
    <View style={styles.topLevelContainer}>
      <Text>Transactions</Text>
      {checkAnyTrue(isEditingTransactions) && (
        <View style={styles.rowContainer}>
          <ButtonElements
            type="outline"
            title="Cancel"
            titleStyle={{ padding: 4 }}
            icon={<Icon name="cancel" size={20} color="black" />}
            onPress={() => {
              console.log('Cancelling editing transactions...');
              setIsEditingTransactions(initialIsEditingState);
            }}
          />
          <ButtonElements
            type="outline"
            title="Save"
            titleStyle={{ padding: 4 }}
            icon={<Icon name="save" size={20} color="black" />}
            onPress={() => {
              console.log('Saving edited transactions...');
              for (let i = 0; i < transactions.length; ++i) {
                if (isEditingTransactions[i]) {
                  console.log(`saving: ${i}`);
                  console.log(
                    `transaction: ${JSON.stringify(transactions[i], null, 2)}`,
                  );
                  const txId = transactions[i].transactionId;
                  const txName = editedTransactionNames[i];
                  // TODO
                  const txAmount = editedTransactionAmounts[i];
                  const txDate = transactions[i].transactionDate;
                  updateTransaction(txId, txName, txAmount, txDate);
                }
              }
              setIsEditingTransactions(initialIsEditingState);
            }}
          />
        </View>
      )}
      {/* TODO: change to flatlist */}
      {transactions.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              setIsEditingTransactions((prevState) => ({
                ...prevState,
                [index]: !prevState[index],
              }))
            }>
            <View style={styles.rowContainer}>
              <Text style={styles.listDate}>
                {item.transactionDate.toLocaleDateString()}
              </Text>
              <View style={[styles.rowContainer, { flex: 1 }]}>
                {isEditingTransactions[index] === true ? (
                  <TextInput
                    style={[styles.textInput, styles.flexGrow]}
                    value={editedTransactionNames[index]}
                    placeholder={item.transactionName}
                    onChangeText={modifyTransactionNames(index)}
                  />
                ) : (
                  <Text
                    style={[
                      styles.listText,
                      styles.flexGrow,
                      styles.textNoInput,
                    ]}>
                    {item.transactionName}
                  </Text>
                )}

                {isEditingTransactions[index] === true ? (
                  <TextInput
                    style={[styles.textInput, styles.flexGrow]}
                    // value={editedTransactions[index]}
                    placeholder={item.transactionAmount.toString()}
                    value={editedTransactionAmounts[index].toString()}
                    onChangeText={modifyTransactionAmounts(index)}
                  />
                ) : (
                  <Text
                    style={[
                      styles.listAmount,
                      styles.flexGrow,
                      styles.textNoInput,
                    ]}>
                    {parseFloat(item.transactionAmount).toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={styles.line} />
      <View style={styles.rowContainer}>
        <Text>Total: </Text>
        <Text>{getTransactionTotal(transactions).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topLevelContainer: {
    padding: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  flexGrow: {
    flex: 1,
  },
  listText: {
    // width: 150,
  },
  listAmount: {
    // width: 100,
    textAlign: 'right',
  },
  listDate: {
    // width: 80,
  },
  line: {
    borderWidth: 5,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 4,
    textAlign: 'right',
    margin: 4,
  },
  textNoInput: {
    padding: 4,
    textAlign: 'right',
    margin: 4,
  },
});

const mapStateToProps = (state, ownProps) => {
  let transactionsData = getTransactionsByBudgetId(state, ownProps.budgetId);
  return {
    transactions: transactionsData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTransaction: (
      transactionId,
      transactionName,
      transactionAmount,
      transactionDate,
    ) => {
      console.log(
        `updateTransaction: ${transactionId} ${transactionName} ${transactionAmount} ${transactionDate}`,
      );
      dispatch(
        updateTransaction(
          transactionId,
          transactionName,
          transactionAmount,
          transactionDate,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTransaction);
