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
  return (
    <View style={styles.listBudgetHeaderContainer}>
      <StyledHeader>{props.title}</StyledHeader>
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
    <SectionList
      style={styles.flatListContainer}
      sections={budgets}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item, index) => {
        return String(index);
      }}
      renderItem={(item) => {
        return <BudgetItem {...item} onPressDetails />;
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <ListBudgetHeader title={title} />;
      }}
    />
    // </View>
  );
};

function extractBudgetEntriesIntoArray(dataObj) {
  const result = [];
  for (const [key, value] of Object.entries(dataObj)) {
    result.push(value);
  }
  const final_result = [
    {
      data: result,
      title: 'Budgets!',
    },
  ];
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
