// In App.js in a new project

import React, {  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-elements';

import DynamicBottomSheet from './components/raw-bottom-sheet/DynamicBottomSheetExample';
import BottomSheetExample from './components/raw-bottom-sheet/BottomSheetExample';

import { Provider } from 'react-redux';

import store from './store';

import { Keyboard } from 'react-native';

import BudgetDetails from './views/BudgetDetails';

import ListBudget from './components/ListBudget';

import CollapsibleExample from './components/collapsible/CollapseExample';

import HeaderMenu from './components/HomeScreenHeaderMenu';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Homescreen props: ');
    console.log(JSON.stringify(props, null, 2));
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.topLevelContainer}>
          <HeaderMenu />
          <ListBudget />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const HeaderButtonRight = () => {
  return (
    <Button style={{ width: 100, backgroundColor: '#aaa' }} title="Open Menu" />
  );
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              // headerRight: <HeaderButtonRight />,
              headerRight: () => <HeaderButtonRight />,
            }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="DynamicBottomSheet"
            component={DynamicBottomSheet}
          />
          <Stack.Screen name="BudgetDetails" component={BudgetDetails} />
          <Stack.Screen name="BottomSheet" component={BottomSheetExample} />
          <Stack.Screen name="Collapsible" component={CollapsibleExample} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

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
});

export default App;
