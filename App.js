// In App.js in a new project

import React from 'react';
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

import Timer from './components/Timer';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useNavigation } from '@react-navigation/native';

import { DrawerActions } from '@react-navigation/native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

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

const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerRight: <HeaderButtonRight />,
          headerRight: () => <HeaderButtonRight />,
          title: 'Home',
        }}
      />
      <Drawer.Screen name="BottomSheet" component={BottomSheetExample} />
      <Drawer.Screen name="DynamicBottomSheet" component={DynamicBottomSheet} />
      <Drawer.Screen name="Collapsible" component={CollapsibleExample} />
      <Drawer.Screen name="Timer" component={Timer} />
    </Drawer.Navigator>
  );
};

const HeaderButtonRight = () => {
  const navigation = useNavigation();
  return (
    <Button
      buttonStyle={styles.navigationButtonRight}
      title="Open Menu"
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}
    />
  );
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen name="Home" component={DrawerComponent} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="DynamicBottomSheet"
            component={DynamicBottomSheet}
          />
          <Stack.Screen name="BudgetDetails" component={BudgetDetails} />
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
  navigationButtonRight: {
    width: 150,
    backgroundColor: '#aaa',
    margin: 4,
    padding: 3,
  }
});

export default App;
