import React from 'react';

import { Text, View, SectionList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyledHeader } from '../components/StyledText';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';

import Swipeable from 'react-native-swipeable';

const DATA = [
  {
    title: 'some title',
    data: ['data is here', 'more data'],
  },
];

const itemRightContent = () => {
  return (
    <View style={[styles.rightSwipeItem, { backgroundColor: 'lightskyblue' }]}>
      <Text>Some TExt</Text>
    </View>
  );
};

const renderItem = (item) => {
  return (
    <Swipeable rightContent={itemRightContent}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>

        <View style={styles.itemIconContainer}>
          <TouchableOpacity>
            <Icon
              style={styles.itemIcon}
              name="keyboard-arrow-right"
              size={50}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const ReactNativeSwipeable = () => {
  return (
    <View style={styles.topLevelContainer}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topLevelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  itemContainer: {
    padding: 24,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  itemIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    left: null,
    right: 20,
  },
  itemIcon: {
    // ...StyleSheet.absoluteFillObject,
    // right: 20,
    // left: null,
    // alignSelf: 'center',
  },
  itemText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});

export default ReactNativeSwipeable;
