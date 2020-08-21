import React, { useRef, useState } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';

import { connect } from 'react-redux';

import { updateBudget } from '../redux-playground/actions';

import BudgetItem from '../components/BudgetItem';

import RBSheet from 'react-native-raw-bottom-sheet';

import ListTransaction from '../components/ListTransactions';

const BudgetDetails = (props) => {
  const [budgetName, setBudgetName] = useState(
    props.route.params.item.budgetName,
  );
  const [budgetMax, setBudgetMax] = useState(
    props.route.params.item.budgetMax.toString(),
  );
  const bottomSheetRef = useRef(null);
  return (
    <View>
      <ButtonElements
        title="Edit Budget"
        onPress={() => {
          bottomSheetRef.current.open();
        }}
        style={{ width: 100, alignSelf: 'flex-end', margin: 10 }}
      />
      <RBSheet
        closeOnDragDown
        ref={bottomSheetRef}
        height={330}
        customStyles={bottomSheetObj}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Create</Text>
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
        </View>
      </RBSheet>
      <BudgetItem item={props.route.params.item} />
      <ListTransaction budgetId={props.route.params.item.budgetId} />
    </View>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateBudget: (id, name, max) => {
      dispatch(updateBudget(id, name, max));
    },
  };
};

const bottomSheetObj = {
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
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
