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
  const [addButtonIsEnabled, setAddButtonIsEnabled] = React.useState(false);

  const validateBudgetMax = (text) => {
    if (/^\d+$/.test(text.toString()) || /^$/.test(text.toString())) {
      setBudgetMax(text);
    } else {
      Alert.alert('Invalid input, numbers only.');
    }
  };

  const checkWhetherEnableButton = () => {
    console.log(
      `checkWhetherEnaledButton: ${checkValuesAreNonEmpty(
        budgetNameValue,
      )} ${checkValuesAreNonEmpty(budgetMaxValue)}`,
    );
    if (
      checkValuesAreNonEmpty(budgetNameValue) &&
      checkValuesAreNonEmpty(budgetMaxValue)
    ) {
      setAddButtonIsEnabled(true);
    }
  };

  const checkValuesAreNonEmpty = (text) => {
    if (text) {
      return true;
    }
    return false;
  };

  const addToBudgetList = () => {
    if (
      !checkValuesAreNonEmpty(budgetNameValue) ||
      !checkValuesAreNonEmpty(budgetMaxValue)
    ) {
      Alert.alert("New budget can't have empty values");
      return false;
    }

    const uuid = uuidv4();
    sendBudget(uuid, budgetNameValue, budgetMaxValue);
    setBudgetName('');
    setBudgetMax('');
    setAddButtonIsEnabled(false);
  };

  return (
    <View>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.textInput}
          value={budgetNameValue}
          onChangeText={(text) => {
            setBudgetName(text);
            checkWhetherEnableButton();
          }}
          placeholder="Budget Name"
          maxLength={10}
        />
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.textInput}
          value={budgetMaxValue}
          onChangeText={(text) => {
            validateBudgetMax(text);
            checkWhetherEnableButton();
            // setIsEdited is set upon validation
          }}
          keyboardType="number-pad"
          placeholder="20"
          maxLength={10}
          // placeholder={'Max'}
        />
      </View>
      <ElementsButton
        style={styles.addButton}
        title="Add Budget"
        onPress={addToBudgetList}
        disabled={!addButtonIsEnabled ? true : false}
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
    margin: 4,
    // width: 150,
  },
  dollarSign: {
    fontSize: 20,
  },
  rowContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addButton: {
    margin: 20,
  },
});

const mapStateToProps = (state, ownProps) => ({
  budgets: state.budgets,
});

const mapDispatchToProps = (dispatch) => ({
  sendBudget: (budgetId, budgetName, budgetMax) => {
    console.log(`onSubmit: ${budgetId} ${budgetName} ${budgetMax}`);
    dispatch(addBudget(budgetId, budgetName, budgetMax));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBudgetElements);
