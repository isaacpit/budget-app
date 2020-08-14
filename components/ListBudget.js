import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Dimensions,
  SectionList,
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

const ListBudgetHeader = (props) => {
  console.log(`ListBudgetHeader: ${JSON.stringify(props, null, 2)}`);
  return (
    <View style={styles.listBudgetHeaderContainer}>
      <StyledHeader>{props.title}</StyledHeader>
    </View>
  );
};

const ListBudget = ({ budgets, header }) => {
  const [dimensions, setDimensions] = useState({ window, screen });

  console.log(`budgets: ${JSON.stringify(budgets, null, 2)}`);

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
    <SectionList
      // contentContainerStyle={styles.flatListContainer}
      ListHeaderComponent={header}
      style={styles.flatListContainer}
      sections={budgets}
      stickySectionHeadersEnabled={false}
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
        console.log(`renderItem: ${JSON.stringify(item, null, 2)}`);
        return <BudgetItem {...item} onPressDetails />;
      }}
      renderSectionHeader={({ section: { title } }) => {
        console.log(`titleSectionHeader: ${title}`);
        return <ListBudgetHeader title={title} />;
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
  const final_result = [
    {
      data: result,
      title: 'Budgets!',
    },
  ];
  console.log(`final_result: ${JSON.stringify(final_result, null, 2)}`);
  return final_result;
}

const mapStateToProps = (state, ownProps) => ({
  budgets: extractBudgetEntriesIntoArray(state.mapBudgetIdToData),
});

const styles = StyleSheet.create({
  flatListContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // marginHorizontal: 4,
    // paddingBottom: 10,

    // flexGrow: 0,
    // flexShrink: 0,
    // maxHeight: 300,
    // maxHeight: 400,
    backgroundColor: '#ddd',
    paddingHorizontal: 4,
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
  listBudgetHeaderContainer: {
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(ListBudget);
// export default ListBudget;
