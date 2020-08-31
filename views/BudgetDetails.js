import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DatePicker from 'react-native-date-picker';

import { connect } from 'react-redux';

import {
  updateBudget,
  addTransactionToBudget,
} from '../redux-playground/actions';

import BudgetItem from '../components/BudgetItem';

import RBSheet from 'react-native-raw-bottom-sheet';

import ListTransaction from '../components/ListTransactions';

import { v4 as uuidv4 } from 'uuid';

const BudgetDetails = ({
  route,
  updateBudget,
  addTransaction,
  ...restProps
}) => {
  console.log(`budgetDetails: ${JSON.stringify(route.params, null, 2)}`);
  const [budgetName, setBudgetName] = useState(
    route.params.budgetItemData.budgetName,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetMax, setBudgetMax] = useState(
    route.params.budgetItemData.budgetMax.toString(),
  );
  const [transactionName, setTransactionName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date());

  const bottomSheetRef = useRef(null);
  return (
    <View onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1}}>
      <View style={styles.rowContainer}>
        <ButtonElements
          onPress={() => {
            bottomSheetRef.current.open();
          }}
          style={{ margin: 10 }}
          icon={<Icon name="edit" size={40} color="black" />}
          type="outline"
        />
        <ButtonElements
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{ margin: 10 }}
          icon={<Icon name="add" size={40} color="black" />}
          type="outline"
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add a Transaction</Text>
              <View style={{ ...styles.inputRowContainer }}>
                <Text style={styles.labelStyle}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={transactionName}
                  placeholder="Groceries"
                  onChangeText={(text) => setTransactionName(text)}
                />
              </View>
              <View style={{ ...styles.inputRowContainer }}>
                <Text style={styles.labelStyle}>Amount</Text>
                <TextInput
                  style={styles.textInput}
                  value={transactionAmount}
                  keyboardType="decimal-pad"
                  placeholder="20.00"
                  onChangeText={(text) => setTransactionAmount(text)}
                />
              </View>
              <DatePicker
                date={transactionDate}
                onDateChange={setTransactionDate}
                mode={'date'}
                style={{ height: 150 }}
              />

              <View style={{ ...styles.rowContainer, width: 250, margin: 8, }}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    try {
                      const budgetId = route.params.budgetItemData.budgetId;
                      const txName = transactionName;
                      const txAmount = parseFloat(transactionAmount);
                      const txDate = transactionDate;
                      const txId = uuidv4();
                      console.log(
                        `budgetId: ${budgetId}\ntxId: ${txId}\ntxName: ${txName}\ntxAmount: ${txAmount}\ntxDate: ${txDate}`,
                      );
                      addTransaction(
                        budgetId,
                        txId,
                        txName,
                        txAmount,
                        txDate,
                      );
                      setModalVisible(!modalVisible);
                    } catch (err) {
                      console.log(
                        'error creating transaction: ' + err.toString(),
                      );
                    }
                  }}>
                  <Text style={styles.textStyle}>Save</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
              updateBudget(
                route.params.budgetItemData.budgetId,
                budgetName,
                budgetMax,
              );
            }}
          />
        </View>
      </RBSheet>
      <BudgetItem budgetItemData={route.params.budgetItemData} />
      <ListTransaction budgetId={route.params.budgetItemData.budgetId} />
    </View>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateBudget: (id, name, max) => {
      dispatch(updateBudget(id, name, max));
    },
    addTransaction: (budgetId, transactionId, name, amount, date) => {
      dispatch(
        addTransactionToBudget(budgetId, transactionId, name, amount, date),
      );
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputRowContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
    alignItems: 'center',
    margin: 8,
  },
  textInput: {
    fontSize: 20,
    // fontStyle: 'bold',
    backgroundColor: '#ddd',
    padding: 4,
    margin: 4,
    width: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    minWidth: 100,
    padding: 10,
    elevation: 2,
  },
  labelStyle: {
    color: 'black',
    width: 60,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default connect(null, mapDispatchToProps)(BudgetDetails);
