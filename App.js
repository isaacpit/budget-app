// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { connect } from 'react-redux';

import { Provider } from 'react-redux';

import { createStore } from 'redux';
import budgetApp, { addBudget, updateBudget, incrementCounter, addBudgetObj } from './redux-playground/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CounterContainer from './redux-playground/countainers/CounterContainer';

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

store.dispatch(addBudget('Groceries', 123));
store.dispatch(addBudget('Allowance', 456));
const some_id = uuidv4();
const fake_id = 44;
store.dispatch(addBudgetObj(some_id, 'some_name', 100));

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
  }
  render() {
    return (
      <SafeAreaView style={styles.topLevelContainer}>
        {/* <Text>Home Screen</Text> */}
        {/* <ListExpenses></ListExpenses> */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}>
          Go To Details
        </Button>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
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
