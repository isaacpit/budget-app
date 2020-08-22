import React from 'react';

import { Text, View } from 'react-native';

import { ListItem, Badge } from 'react-native-elements';

import * as Progress from 'react-native-progress';

import { text_styles } from './StyledText';

import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { getTransactionsByBudgetId } from '../redux-playground/actions';
import { color } from 'react-native-reanimated';

const DANGER_THRESHHOLD = .80;

const getProgress = (transactions, budgetItem) => {
  // let transactionTotal = 0;
  // for (let i = 0; i < transactions.length; ++i) {
  //   transactionTotal += parseFloat(transactions[i].transactionAmount);
  // }
  let transactionTotal = getTransactionTotal(transactions);
  return transactionTotal / budgetItem.budgetMax;
};

const getTransactionTotal = (transactions) => {
  let transactionTotal = 0;
  for (let i = 0; i < transactions.length; ++i) {
    transactionTotal += parseFloat(transactions[i].transactionAmount);
  }
  return transactionTotal;
};

const getRemainingAmount = (transactions, budgetItem) => {
  return budgetItem.budgetMax - getTransactionTotal(transactions);
};

const BudgetItem = ({ budgetItem, onPressDetails, transactions }) => {
  const navigation = useNavigation();
  const Chevron = () => {
    return (
      <View style={{alignContent: 'center', justifyContent: 'center'}}>
        <Icon
          name="navigate-next"
          type="material"
          color="#bbb"
          size={40}
          style={{ alignSelf: 'center', fontSize: 100 }}
        />
      </View>
    );
  };

  let colorStatus = 'success';
  let colorIndicator = 'green';
  if (getProgress(transactions, budgetItem) > 1.0) {
    colorStatus = 'error';
    colorIndicator = 'red';
  } else if (getProgress(transactions, budgetItem) > DANGER_THRESHHOLD) {
    colorStatus = 'warning';
    colorIndicator = 'orange';
  }

  return (
    <ListItem
      titleStyle={text_styles.largeText}
      title={budgetItem.budgetName}
      subtitle={
        <Progress.Bar
          animated
          borderWidth={1}
          borderColor={'#ccc'}
          height={20}
          color={colorIndicator}
          progress={getProgress(transactions, budgetItem)}
        />
      }
      rightTitle={
        'Left $' + getRemainingAmount(transactions, budgetItem).toFixed(2)
      }
      rightTitleStyle={[text_styles.baseText, { fontSize: 22 }]}
      rightTitleProps={{ flex: 1 }}
      rightSubtitle={
        <Badge
          value={'Total $' + budgetItem.budgetMax}
          textStyle={{ color: 'white' }}
          status={colorStatus}
          badgeStyle={{ position: 'absolute', right: 0, top: 5, }}
        />
      }
      // pad={0}
      onPress={
        onPressDetails === true
          ? () => {
              navigation.navigate('BudgetDetails', {
                // budgetId: item.item.budgetId,
                item: budgetItem,
              });
            }
          : null
      }
      // topDivider
      bottomDivider
      chevron={onPressDetails === true ? Chevron : null}
      rightContentContainerStyle={{ flex: 0.75 }}
      // checkmark={true}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    budgetItem: state.mapBudgetIdToData[ownProps.item.budgetId],
    transactions: getTransactionsByBudgetId(state, ownProps.item.budgetId),
  };
};

export default connect(mapStateToProps)(BudgetItem);
