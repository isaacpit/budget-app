import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';

import Collapsible from 'react-native-collapsible';

import Timer from './Timer';

import AddBudgetElements from './AddBudget';

const setObjValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@data_key', jsonValue);
  } catch (e) {
    // save error
    Alert.alert(e);
  }

  console.log('Done.');
};

const HeaderMenu = (props) => {
  console.log(`headerMenuProps: ${JSON.stringify(props, null, 2)}`);
  const [collapsed, toggleCollapsed] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [data, setData] = React.useState({ data: 'After' });
  const navigation = useNavigation();

  const id = React.useRef(null);
  const [timeCount, setTimeCount] = React.useState(3);
  const clear = () => {
    clearInterval(id.current);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimeCount((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timeCount === 0) {
      clear();
      setIsLoaded(true);
    }
  }, [timeCount]);

  const loadData = async () => {
    const jsonValue = await AsyncStorage.getItem('@data_key');
    console.log('jsonValue: ' + jsonValue);
    const result_data = jsonValue != null ? JSON.parse(jsonValue) : null;
    setData(result_data);
    console.log('data: ' + JSON.stringify(data, null, 2));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          toggleCollapsed(!collapsed);
        }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.devConsole}>
          <Button
            style={styles.verticalSpacing}
            title="Save Data Async"
            onPress={() => setObjValue(data)}
          />
          <Button
            style={styles.verticalSpacing}
            title="Load Data Async"
            onPress={() => loadData()}
          />
          <Text styles={styles.verticalSpacing}>
            Data: {JSON.stringify(data, null, 2)}
          </Text>
        </View>
      </Collapsible>
      <AddBudgetElements />
    </View>
  );
};

const styles = StyleSheet.create({
  devConsole: {
    backgroundColor: '#e6ffcc',
    margin: 20,
  },
  topLevelContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  verticalSpacing: {
    marginVertical: 8,
  },
});

export default HeaderMenu;
