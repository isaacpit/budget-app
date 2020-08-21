import React from 'react';

import { Text, View } from 'react-native';

import { ListItem } from 'react-native-elements';

import * as Progress from 'react-native-progress';

import { text_styles } from './StyledText';

import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { getTransactionsByBudgetId } from '../redux-playground/actions';

const getProgress = (transactions, budgetItem) => {
  let transactionTotal = 0;
  for (let i = 0; i < transactions.length; ++i) {
    transactionTotal += transactions[i].transactionAmount;
  }

  return transactionTotal / budgetItem.budgetMax;
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
          progress={getProgress(transactions, budgetItem)}
        />
      }
      rightTitle={'$' + budgetItem.budgetMax}
      rightTitleStyle={text_styles.baseText}
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
      bottomDivider
      chevron={onPressDetails === true ? Chevron : null}
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
