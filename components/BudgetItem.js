import React from 'react';

import { Text } from 'react-native';

import { ListItem } from 'react-native-elements';

import * as Progress from 'react-native-progress';

import { text_styles } from './StyledText';

import { useNavigation } from '@react-navigation/native';

const BudgetItem = ({ item, onPressDetails }) => {
  const navigation = useNavigation();

  console.log(`budget: ${JSON.stringify(item, null, 2)}`);
  return (
    <ListItem
      // containerStyle={{ width: dimensions.window.width-10, margin: 4}}
      // style={styles.listItem}
      titleStyle={text_styles.largeText}
      title={item.item.budgetName}
      subtitle={
        <Progress.Bar
          animated
          borderWidth={1}
          borderColor={'#ccc'}
          height={20}
          progress={0.5}
        />
      }
      rightTitle={'$' + item.item.budgetMax}
      rightTitleStyle={text_styles.baseText}
      leftAvatar={
        onPressDetails === true ? (
          <Text>SHOULD GENERATE</Text>
        ) : (
          <Text>NONE</Text>
        )
      }
      onPress={
        onPressDetails === true
          ? () =>
              {
                console.log("TESTING BUDGET ITEM");
                navigation.navigate('BudgetDetails', {
                // budgetId: item.item.budgetId,
                item: item,
              });
              }
          : null
      }
      // onPress={onPressDetails && () => navigation.navigate('Details');}
      // onPress={onPressDetails === true ? () => navigation.navigate('Details')}
      bottomDivider
      chevron={onPressDetails === true ? true : false}
      // checkmark={true}
    />
  );
};

export default BudgetItem;
