import React, { Component } from 'react';

import { Text, View, TextInput, Alert, StyleSheet } from 'react-native';

import { Button, FlatList } from 'react-native-elements';

import { connect } from 'react-redux';

import { addBudgetObj } from '../redux-playground/actions';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddBudgetElements = ({ budgets, sendBudget }) => {
  const [budgetNameValue, onNameValueChange] = React.useState('');
  const [budgetMaxValue, onMaxValueChange] = React.useState('');

  const validate = (text) => {
    if (/^\d+$/.test(text.toString()) || /^$/.test(text.toString())) {
      onMaxValueChange(text);
    } else {
      Alert.alert('Invalid input, numbers only.');
    }
  };

  return (
    <View>
      <Button
        title="Add Budget"
        onPress={() => {
          const uuid = uuidv4();
          sendBudget(uuid, budgetNameValue, budgetMaxValue);
          Alert.alert('added budget obj');
        }}
      />
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.textInput}
          value={budgetNameValue}
          onChangeText={(text) => onNameValueChange(text)}
          placeholder="Budget Name"
          maxLength={10}
        />
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.textInput}
          value={budgetMaxValue}
          onChangeText={(text) => {
            validate(text);
          }}
          keyboardType="number-pad"
          placeholder="20"
          maxLength={10}
          // placeholder={'Max'}
        />
      </View>
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
    width: 150,
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
});

const mapStateToProps = (state, ownProps) => ({
  budgets: state.budgets,
});

const mapDispatchToProps = (dispatch) => ({
  sendBudget: (budgetId, budgetName, budgetMax) => {
    console.log(`onSubmit: ${budgetId} ${budgetName} ${budgetMax}`);
    dispatch(addBudgetObj(budgetId, budgetName, budgetMax));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBudgetElements);
