// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import DynamicBottomSheet from './components/raw-bottom-sheet/DynamicBottomSheetExample';
import BottomSheetExample from './components/raw-bottom-sheet/BottomSheetExample';

import { connect } from 'react-redux';

import { Provider } from 'react-redux';

import { createStore } from 'redux';
import budgetApp, {
  addBudget,
  updateBudget,
  incrementCounter,
  addTransactionToBudget,
} from './redux-playground/actions';

import AsyncStorage from '@react-native-community/async-storage';

import { TouchableOpacity } from 'react-native-gesture-handler';

import CounterContainer from './redux-playground/countainers/CounterContainer';

import BudgetDetails from './views/BudgetDetails';

import AddBudgetElements from './components/AddBudget';
import ListBudget from './components/ListBudget';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const store = createStore(budgetApp);

// const unsubscribe = store.subscribe(() => console.log(store.getState()));

console.log('Initial State:');
console.log(store.getState());

const unsubscribe = store.subscribe(() =>
  console.log(JSON.stringify(store.getState(), null, 2)),
);

const some_id = uuidv4();
const fake_id = 44;
store.dispatch(addBudget(some_id, 'some_name', 100));

store.dispatch(
  addTransactionToBudget('0', '46', 'Added Transaction', 3, new Date()),
);

console.log(
  `CHECKER state: ${JSON.stringify(
    store.getState().mapBudgetIdToData.hasOwnProperty(some_id),
    null,
    2,
  )}`,
);

console.log(
  `state: ${JSON.stringify(
    store.getState().mapBudgetIdToData[some_id],
    null,
    2,
  )}`,
);

console.log(
  `FAKE state: ${JSON.stringify(
    store.getState().mapBudgetIdToData.hasOwnProperty(fake_id),
    null,
    2,
  )}`,
);

console.log(
  `FAKE state: ${JSON.stringify(
    store.getState().mapBudgetIdToData[fake_id],
    null,
    2,
  )}`,
);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Homescreen props: ');
    console.log(JSON.stringify(props, null, 2));

    this.state = {
      isLoaded: false,
      timeCount: 3,
      data: null,
    };
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data_key');
      console.log('jsonValue: ' + jsonValue);
      this.setState({
        isLoaded: true,
        data: jsonValue,
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
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      console.log('ran!' + this.state.timeCount);
      this.setState({ timeCount: parseInt(this.state.timeCount, 10) - 1 });
      if (this.state.timeCount < 1) {
        clearInterval(this.intervalId);
        this.getData();
      }
    }, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <SafeAreaView style={styles.topLevelContainer}>
        {/* <Text>Home Screen</Text> */}
        {/* <ListExpenses></ListExpenses> */}
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
          { this.state.isLoaded ? <Text>{this.state.data}</Text> : null}
          <Text>{this.state.timeCount}</Text>
          <Button
            title="Dynamic Bottom Sheet"
            onPress={() => this.props.navigation.navigate('DynamicBottomSheet')}
          />
          <Button
            title="Bottom Sheet"
            onPress={() => this.props.navigation.navigate('BottomSheet')}
          />
        </View>
        <AddBudgetElements />
        <ListBudget />
        {/* <CounterContainer /> */}
      </SafeAreaView>
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

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="DynamicBottomSheet"
            component={DynamicBottomSheet}
          />
          <Stack.Screen name="BudgetDetails" component={BudgetDetails} />
          <Stack.Screen name="BottomSheet" component={BottomSheetExample} />
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
  }
});

export default App;
