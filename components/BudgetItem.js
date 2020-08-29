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

const DANGER_THRESHHOLD = 0.80;

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

const BudgetItem = ({
  budgetItem: budgetItemData,
  onPressDetails,
  transactions,
}) => {
  console.log(
    `BudgetItem.budgetItemData: ${JSON.stringify(budgetItemData, null, 2)}`,
  );
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
  let fillColor = '#dadada';
  let unfilledColor = 'rgb(82,196,25)';
  let containerColor = 'rgb(82,196,25)';
  if (getProgress(transactions, budgetItemData) > 1.0) {
    colorStatus = 'error';
    unfilledColor = 'red';
    containerColor = '#f08080';
  } else if (getProgress(transactions, budgetItemData) > DANGER_THRESHHOLD) {
    colorStatus = 'warning';
    unfilledColor = 'orange';
    containerColor = '#ffdab9';
  }

  return (
    <ListItem
      titleStyle={text_styles.largeText}
      title={budgetItemData.budgetName}
      subtitle={
        <Progress.Bar
          animated
          // borderWidth={1}
          // borderColor={'#ccc'}
          height={20}
          color={fillColor}
          unfilledColor={unfilledColor}
          progress={getProgress(transactions, budgetItemData)}
          borderColor={containerColor}
          borderWidth={1.25}
          borderRadius={15}
        />
      }
      rightTitle={
        'Left $' + getRemainingAmount(transactions, budgetItemData).toFixed(2)
      }
      rightTitleStyle={[text_styles.baseText, { fontSize: 22 }]}
      rightTitleProps={{ flex: 1 }}
      rightSubtitle={
        <Badge
          value={'Total $' + budgetItemData.budgetMax}
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
                budgetItemData: budgetItemData,
              });
            }
          : null
      }
      // topDivider
      bottomDivider
      chevron={onPressDetails === true ? Chevron : null}
      rightContentContainerStyle={{ flex: 0.75 }}
      // containerStyle={{ backgroundColor: containerColor }}
      // checkmark={true}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(`budgetItemComponent: ${JSON.stringify(ownProps, null, 2)}`);
  return {
    budgetItem: state.mapBudgetIdToData[ownProps.budgetItemData.budgetId],
    transactions: getTransactionsByBudgetId(
      state,
      ownProps.budgetItemData.budgetId,
    ),
  };
};

export default connect(mapStateToProps)(BudgetItem);
