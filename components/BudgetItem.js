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
  console.log(
    `BudgetItem transactions: ${JSON.stringify(transactions, null, 2)}`,
  );
  let transactionTotal = 0;
  for (let i = 0; i < transactions.length; ++i) {
    transactionTotal += transactions[i].transactionAmount;
  }
  console.log(`transactionTotal: ${transactionTotal}`);
  console.log(`       budgetMax: ${budgetItem.budgetMax}`);

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

  console.log(`budget: ${JSON.stringify(budgetItem, null, 2)}`);
  return (
    <ListItem
      // containerStyle={{ width: dimensions.window.width-10, margin: 4}}
      // style={styles.listItem}
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
      // leftAvatar={
      //   onPressDetails === true ? (
      //     <Text>SHOULD GENERATE</Text>
      //   ) : (
      //     <Text>NONE</Text>
      //   )
      // }
      onPress={
        onPressDetails === true
          ? () => {
              console.log('TESTING BUDGET ITEM');
              navigation.navigate('BudgetDetails', {
                // budgetId: item.item.budgetId,
                item: budgetItem,
              });
            }
          : null
      }
      // onPress={onPressDetails && () => navigation.navigate('Details');}
      // onPress={onPressDetails === true ? () => navigation.navigate('Details')}
      bottomDivider
      chevron={onPressDetails === true ? Chevron : null}
      // checkmark={true}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps state   : ' + JSON.stringify(state, null, 2));
  console.log('mapStateToProps ownProps: ' + JSON.stringify(ownProps, null, 2));
  console.log(
    'mapStateToProps id?: ' + JSON.stringify(ownProps.item.budgetId, null, 2),
  );
  return {
    budgetItem: state.mapBudgetIdToData[ownProps.item.budgetId],
    transactions: getTransactionsByBudgetId(state, ownProps.item.budgetId),
  };
};

export default connect(mapStateToProps)(BudgetItem);
