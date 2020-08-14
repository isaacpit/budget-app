// In App.js in a new project

import * as React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import DynamicBottomSheet from './components/raw-bottom-sheet/DynamicBottomSheetExample';
import BottomSheetExample from './components/raw-bottom-sheet/BottomSheetExample';

import { connect } from 'react-redux';

import { Provider } from 'react-redux';

import store from './store';

import budgetApp, {
  addBudget,
  updateBudget,
  incrementCounter,
  addTransactionToBudget,
} from './redux-playground/actions';

import AsyncStorage from '@react-native-community/async-storage';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Keyboard } from 'react-native';

import CounterContainer from './redux-playground/countainers/CounterContainer';

import BudgetDetails from './views/BudgetDetails';

import AddBudgetElements from './components/AddBudget';
import ListBudget from './components/ListBudget';

import CollapsibleExample from './components/collapsible/CollapseExample';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Collapsible from 'react-native-collapsible';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Homescreen props: ');
    console.log(JSON.stringify(props, null, 2));

    this.state = {
      isLoaded: false,
      timeCount: 3,
      data: null,
      collapsed: true,
    };
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data_key');
      console.log('jsonValue: ' + jsonValue);
      this.setState((prevState) => {
        return {
          isLoaded: true,
          data: jsonValue,
        };
      });
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      Alert.alert(e);
    }
  };

  setObjValue = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@data_key', jsonValue);
    } catch (e) {
      // save error
      Alert.alert(e);
    }

    console.log('Done.');
  };

  componentDidMount() {
    console.log('Homescreen mounted');
    this.intervalId = setInterval(() => {
      console.log('ran!' + this.state.timeCount);
      this.setState((prevState) => {
        return {
          timeCount: prevState.timeCount - 1,
        };
      });
    }, 1000);
  }

  componentDidUpdate() {
    console.log('looking at interval!');
    console.log(
      `\tstate.timeCount: ${this.state.timeCount} state.isLoaded: ${this.state.isLoaded}`,
    );
    if (this.state.timeCount < 1 && !this.state.isLoaded) {
      console.log('clearing interval!');
      console.log(
        `\tstate.timeCount: ${this.state.timeCount} state.isLoaded: ${this.state.isLoaded}`,
      );
      clearInterval(this.intervalId);
      this.getData();
    }
  }

  componentWillUnMount() {
    clearInterval(this.intervalId);
  }

  toggleExpanded = () => {
    this.setState((prevState) => {
      return {
        collapsed: !prevState.collapsed,
      };
    });
  };

  render() {
    return (
      // wrapped so that numeric keypad will go away
      // <ScrollView contentInsetAdjustmentBehavior="automatic">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.topLevelContainer}>
          {/* <Text>Home Screen</Text> */}
          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Menu</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.devConsole}>
              <Button
                title="Go to Details"
                onPress={() => this.props.navigation.navigate('Details')}>
                Go To Details
              </Button>
              <Button
                title="Save Data"
                onPress={() => this.setObjValue({ data: 'Saved data' })}
              />
              <Text style={{ fontSize: 30 }}>
                {this.state.isLoaded ? 'Loaded data' : 'Loading!'}
              </Text>
              {this.state.isLoaded ? <Text>{this.state.data}</Text> : null}
              <Text>{this.state.timeCount}</Text>
              <Button
                title="Dynamic Bottom Sheet"
                onPress={() =>
                  this.props.navigation.navigate('DynamicBottomSheet')
                }
              />
              <Button
                title="Bottom Sheet"
                onPress={() => this.props.navigation.navigate('BottomSheet')}
              />
              <Button
                title="Collapsible"
                onPress={() => this.props.navigation.navigate('Collapsible')}
              />
            </View>
          </Collapsible>
          <AddBudgetElements />
          <ListBudget />
          {/* <CounterContainer /> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function DetailsScreen({ navigation }) {
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
