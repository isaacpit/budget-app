import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

import { Button, ListItem } from 'react-native-elements';

import StyledText, { StyledHeader, text_styles } from './StyledText';

import { useNavigation } from '@react-navigation/native';

import BudgetItem from './BudgetItem';

import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const ListBudgetHeader = () => {
  return (
    <View style={styles.listBudgetHeaderContainer}>
      <StyledHeader>Budgets</StyledHeader>
    </View>
  );
};

const ListBudget = ({ budgets }) => {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  return (
    // <View styles={styles.containerView}>
    <FlatList
      // contentContainerStyle={styles.flatListContainer}
      ListHeaderComponent={ListBudgetHeader}
      style={styles.flatListContainer}
      data={budgets}
      keyExtractor={(item, index) => {
        return String(index);
      }}
      // extraData={budgets}
      renderItem={(item) => {
        // console.log(`budget: ${JSON.stringify(item, null, 2)}`);
        // return (
        //   <ListItem
        //     // containerStyle={{ width: dimensions.window.width-10, margin: 4}}
        //     // style={styles.listItem}
        //     titleStyle={text_styles.largeText}
        //     title={item.item.budgetName}
        //     subtitle={
        //       <Progress.Bar
        //         animated
        //         borderWidth={1}
        //         borderColor={'#ccc'}
        //         height={20}
        //         progress={0.5}
        //       />
        //     }
        //     rightTitle={'$' + item.item.budgetMax}
        //     rightTitleStyle={text_styles.baseText}
        //     bottomDivider
        //     chevron
        //     // checkmark={true}
        //   />
        return <BudgetItem {...item} onPressDetails />;
      }}
    />
    // </View>
  );
};

function extractBudgetEntriesIntoArray(dataObj) {
  console.log(dataObj);

  const result = [];
  for (const [key, value] of Object.entries(dataObj)) {
    console.log(`${key}: ${value}`);
    result.push(value);
  }

  console.log(`result: ${JSON.stringify(result, null, 2)}`);
  return result;
}

const mapStateToProps = (state, ownProps) => ({
  budgets: extractBudgetEntriesIntoArray(state.mapBudgetIdToData),
});

const styles = StyleSheet.create({
  flatListContainer: {
    // flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 4,

    // flexGrow: 0,
    // flexShrink: 0,
    // maxHeight: 300,
    // maxHeight: 400,
    backgroundColor: '#ddd',
    padding: 4,
  },
  listItemContainer: {
    // alignSelf: 'stretch',
    // width: 300,
  },
  listItem: {
    // width: 400,
    // alignSelf: 'stretch',
    margin: 2,
  },

  button: {
    // width: 200,
  },
  titleStyle: {
    fontSize: 20,
    marginBottom: 5,
  },
  listBudgetHeaderContainer: {},
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(ListBudget);
// export default ListBudget;
