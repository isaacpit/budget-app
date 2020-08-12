import React from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';

import { connect } from 'react-redux';

import { updateBudget } from '../redux-playground/actions';

import BudgetItem from '../components/BudgetItem';

import ListTransaction from '../components/ListTransactions';

const BudgetDetails = (props) => {
  const [budgetName, setBudgetName] = React.useState(
    props.route.params.item.budgetName,
  );
  const [budgetMax, setBudgetMax] = React.useState(
    props.route.params.item.budgetMax.toString(),
  );
  console.log(
    `Budget Details Screen props: ${JSON.stringify(props, null, 2)} `,
  );
  console.log(
    `Budget Details Screen route.params: ${JSON.stringify(
      props.route.params,
      null,
      2,
    )} `,
  );
  return (
    <View>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.textInput}
          value={budgetName}
          onChangeText={(text) => setBudgetName(text)}
        />
        <TextInput
          style={styles.textInput}
          value={budgetMax}
          onChangeText={(text) => setBudgetMax(text)}
        />
      </View>
      <ButtonElements
        title="Modify"
        onPress={() => {
          props.updateBudget(
            props.route.params.item.budgetId,
            budgetName,
            budgetMax,
          );
        }}
      />
      <BudgetItem item={props.route.params.item} />
      <ListTransaction budgetId={props.route.params.item.budgetId} />
    </View>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(`BudgetDetails`)
  return {
    updateBudget: (id, name, max) => {
      console.log(
        `updateBudget called with ownProps: ${JSON.stringify(
          ownProps,
          null,
          2,
        )}`,
      );
      dispatch(updateBudget(id, name, max));
    },
  };
};

const styles = StyleSheet.create({
  rowContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 20,
    // fontStyle: 'bold',
    backgroundColor: '#ddd',
    padding: 4,
    margin: 4,
    width: 150,
  },
});

export default connect(null, mapDispatchToProps)(BudgetDetails);
