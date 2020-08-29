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
import HeaderMenu from './HomeScreenHeaderMenu';

import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteBudget } from '../redux-playground/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { abs } from 'react-native-reanimated';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const ListBudgetHeader = (props) => {
  return (
    <View style={styles.listBudgetHeaderContainer}>
      <StyledHeader>{props.title}</StyledHeader>
    </View>
  );
};

const ROW_RIGHT_OPEN_VALUE = -75;
const ROW_RIGHT_ACTIVATION_VALUE = -100;

const ListBudget = ({ budgets, headerMenu, deleteRow }) => {
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
    <SwipeListView
      useSectionList
      style={styles.flatListContainer}
      sections={budgets}
      keyExtractor={(item, index) => {
        return String(index);
      }}
      renderItem={(data, rowMap) => {
        console.log(`budgetItem: ${JSON.stringify(data.item, null, 2)}`);
        return <BudgetItem budgetItemData={data.item} onPressDetails />;
      }}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={headerMenu != null ? headerMenu : null}
      renderHiddenItem={(data, rowMap) => {
        return (
          <View style={styles.rowBack}>
            <TouchableOpacity
              {...data.item}
              onPress={() => {
                onPressDeleteRow(data, rowMap, deleteRow);
              }}
              style={styles.buttonDelete}>
              <Text style={styles.titleStyle}>Delete</Text>
              <Icon name="delete" size={40} />
            </TouchableOpacity>
          </View>
        );
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <ListBudgetHeader title={title} />;
      }}
      // leftOpenValue={75}
      disableRightSwipe={true}
      // leftOpenValue={-75}
      rightOpenValue={ROW_RIGHT_OPEN_VALUE}
      rightActivationValue={ROW_RIGHT_ACTIVATION_VALUE}
      stopRightSwipe={-75}
      // leftActivationValue={-100}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      friction={10}
      tension={100}
      restSpeedThreshold={1}
      restDisplacementThreshold={0.025}
      directionalDistanceChangeThreshold={1}
      // onRowDidOpen={onRowDidOpen}
    />
  );
};

function onPressDeleteRow(data, rowMap, deleteRow) {
  if (rowMap[data.index]) {
    rowMap[data.index].closeRow();
  }
  deleteRow(data.item.budgetId);
}

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

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteRow: (budgetId) => {
    dispatch(deleteBudget(budgetId));
  },
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
    backgroundColor: '#fff',
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
  rowBack: {
    alignItems: 'stretch',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  buttonDelete: {
    backgroundColor: '#f77',
    // alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.abs(ROW_RIGHT_OPEN_VALUE),
    // height: 'auto',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBudget);
// export default ListBudget;
