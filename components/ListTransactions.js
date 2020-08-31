import React, { useState } from 'react';

import { Text, View, StyleSheet, TextInput } from 'react-native';

import { Button as ButtonElements } from 'react-native-elements';

import { connect } from 'react-redux';

import { updateTransaction } from '../redux-playground/actions';

import { getTransactionsByBudgetId } from '../redux-playground/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';
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
  let initialEditedTransactionDates = new Array(transactions.length);
  for (let i = 0; i < transactions.length; ++i) {
    initialEditedTransactionNames[i] = transactions[i].transactionName;
    initialEditedTransactionAmounts[i] = transactions[i].transactionAmount;
    initialEditedTransactionDates[i] = transactions[i].transactionDate;
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
  console.log(
    `initialEditedTransactionDates: ${JSON.stringify(
      initialEditedTransactionDates,
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
  const [editedTransactionDates, setEditedTransactionDates] = useState(
    initialEditedTransactionDates,
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
  console.log(
    `editedTransactionDates: ${JSON.stringify(
      editedTransactionDates,
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

  const modifyTransactionDates = (index) => (text) => {
    console.log(`changeDate: ${text}`);
    console.log(
      `editedDates: ${JSON.stringify(editedTransactionDates, null, 2)}`,
    );
    let oldDates = [...editedTransactionDates];
    oldDates[index] = text;
    console.log(`oldDates after: ${JSON.stringify(oldDates, null, 2)}`);
    setEditedTransactionDates(oldDates);
    // return oldNames;
  };

  // const [editedTransactions, setEditedTransactions] = useState(new Array(transactions.length));
  console.log(`editedTransactions: ${JSON.stringify(isEditingTransactions)}`);
  console.log(`listTransactions: \n${JSON.stringify(transactions, null, 2)}`);
  console.log('any: ' + checkAnyTrue(isEditingTransactions));

  // check if new transaction was added, if so
  // reset to the new initial values
  // this fixes a bug where the edited transaction values do not reflect
  // the actual transactions
  if (
    transactions.length !== editedTransactionAmounts.length &&
    transactions.length !== editedTransactionNames.length
  ) {
    setEditedTransactionAmounts(initialEditedTransactionAmounts);
    setEditedTransactionNames(initialEditedTransactionNames);
    setEditedTransactionDates(initialEditedTransactionDates);
  }

  const SaveAllEdits = () => {
    console.log('Saving edited transactions...');
    for (let i = 0; i < transactions.length; ++i) {
      if (isEditingTransactions[i]) {
        console.log(`saving: ${i}`);
        console.log(`transaction: ${JSON.stringify(transactions[i], null, 2)}`);

        // TODO
        try {
          const txId = transactions[i].transactionId;
          const txName = editedTransactionNames[i];
          const txAmount = parseFloat(editedTransactionAmounts[i]);
          const txDate = transactions[i].transactionDate;
          updateTransaction(txId, txName, txAmount, txDate);
        } catch (err) {
          // todo better error handling
          console.log('error: ' + err);
        }
      }
    }
    setIsEditingTransactions(initialIsEditingState);
  };
  const ResetAllEdits = () => {
    console.log('Cancelling editing transactions...');
    setIsEditingTransactions(initialIsEditingState);
  };
  return (
    <View style={styles.topLevelContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.header}>Transactions</Text>
        {checkAnyTrue(isEditingTransactions) && (
          <View style={[styles.rowContainer, { padding: 0 }]}>
            <ButtonElements
              type="outline"
              title="Cancel"
              titleStyle={{ padding: 4 }}
              style={styles.transactionButtons}
              icon={<Icon name="cancel" size={20} color="black" />}
              onPress={ResetAllEdits}
            />
            <ButtonElements
              type="outline"
              title="Save"
              titleStyle={{ padding: 4 }}
              icon={<Icon name="save" size={20} color="black" />}
              style={styles.transactionButtons}
              onPress={SaveAllEdits}
            />
          </View>
        )}
      </View>
      {/* TODO: change to flatlist */}
      
      {transactions.map((item, index) => {
        return (
          <View style={styles.rowContainer} key={index}>
            <TouchableOpacity
              key={index}
              onPress={() =>
                setIsEditingTransactions((prevState) => ({
                  ...prevState,
                  [index]: !prevState[index],
                }))
              }
              // eslint-disable-next-line prettier/prettier
              style={styles.editButton}
            >
              <View style={styles.rowContainer}>
                <Icon
                  name="edit"
                  size={20}
                  color="black"
                  style={styles.smallEditIcon}
                />
                <Text style={styles.textDate}>
                  {new Date(item.transactionDate).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.rowContainer, { flex: 1 }]}>
              {isEditingTransactions[index] === true ? (
                <TextInput
                  style={[styles.textInput, styles.flexGrow]}
                  value={editedTransactionNames[index]}
                  placeholder={item.transactionName}
                  onChangeText={modifyTransactionNames(index)}
                />
              ) : (
                <Text style={[styles.flexGrow, styles.textNoInput]}>
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
  editButton: {
    backgroundColor: '#ddd',
    // margin: 2,
    borderWidth: 0.333,
    borderColor: '#2089dc',
    // padding: 4,
    borderRadius: 3,
  },
  header: {
    fontSize: 30,
    paddingVertical: 8,
  },
  transactionButtons: {
    marginHorizontal: 4,
  },
  flexGrow: {
    flex: 1,
  },
  listAmount: {
    textAlign: 'right',
  },
  line: {
    borderWidth: 5,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 4,
    textAlign: 'right',
    marginHorizontal: 4,
    paddingVertical: 8,
  },
  textNoInput: {
    padding: 4,
    textAlign: 'right',
    margin: 4,
  },
  datePicker: {
    width: 200,
    height: 60,
    fontSize: 20,
  },
  smallEditIcon: {
    marginRight: 4,
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
