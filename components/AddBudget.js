import React, { Component } from 'react';

import { Text, View, TextInput, Alert, StyleSheet } from 'react-native';

import { Button as ElementsButton, FlatList } from 'react-native-elements';

import { connect } from 'react-redux';

import { addBudget } from '../redux-playground/actions';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import StyledText from '../components/StyledText';

const AddBudgetElements = ({ budgets, sendBudget }) => {
  const [budgetNameValue, setBudgetName] = React.useState('');
  const [budgetMaxValue, setBudgetMax] = React.useState('');

  const checkInputs = () => {
    return budgetNameValue.length > 0 && budgetMaxValue > 0;
  };

  const addToBudgetList = () => {
    try {
      const uuid = uuidv4();
      const f_budgetMaxValue = parseFloat(budgetMaxValue);
      sendBudget(uuid, budgetNameValue, f_budgetMaxValue);
      setBudgetName('');
      setBudgetMax('');
      // setAddButtonIsEnabled(false);
    } catch (err) {
      console.log('Error adding a budget: ' + err);
    }
  };

  return (
    <View>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.textInput}
          value={budgetNameValue}
          onChangeText={(newBudgetNameString) => {
            console.log(
              `budgetName: ${budgetNameValue} => ${newBudgetNameString} newLength: ${newBudgetNameString.length} `,
            );
            setBudgetName(newBudgetNameString);
          }}
          placeholder="Budget Name"
          maxLength={10}
        />
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.textInput}
          value={budgetMaxValue}
          onChangeText={(newBudgetMaxString) => {
            console.log(
              `budgetMax: ${budgetMaxValue ? budgetMaxValue : 'ValueNone'} => ${
                newBudgetMaxString ? newBudgetMaxString : 'TextNone'
              } newBudgetLength: ${newBudgetMaxString.length}`,
            );
            try {
              const budgetMaxFloatVal = parseFloat(newBudgetMaxString);
              console.log(
                'AddBudget::budgetMaxFloatValue = ' + budgetMaxFloatVal,
              );
              setBudgetMax(newBudgetMaxString);
            } catch (ex) {
              console.log(
                'Error adding budget. Try again later. Error Message: ' +
                  ex.toString(),
              );
            }
          }}
          keyboardType="decimal-pad"
          placeholder="20.00"
          maxLength={10}
          // placeholder={'Max'}
        />
      </View>
      <ElementsButton
        style={styles.addButton}
        title="Add Budget"
        onPress={() => {
          addToBudgetList();
        }}
        disabled={!checkInputs()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#ddd',
    padding: 6,
    minWidth: 100,
    textAlign: 'right',
    // margin: 4,
    // width: 150,
  },
  dollarSign: {
    fontSize: 20,
    marginLeft: 40,
  },
  rowContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // padding: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },
  addButton: {
    marginTop: 8,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});

const mapStateToProps = (state, ownProps) => ({
  budgets: state.budgets,
});

const mapDispatchToProps = (dispatch) => ({
  sendBudget: (budgetId, budgetName, budgetMax) => {
    console.log(`addBudget: ${budgetId} ${budgetName} ${budgetMax}`);
    dispatch(addBudget(budgetId, budgetName, budgetMax));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBudgetElements);
