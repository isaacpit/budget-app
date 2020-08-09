// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { connect } from 'react-redux';

import { Provider } from 'react-redux';

import { createStore } from 'redux';
import budgetApp, { addBudget, updateBudget, incrementCounter } from './redux-playground/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CounterContainer from './redux-playground/countainers/CounterContainer';



const store = createStore(budgetApp);

// const unsubscribe = store.subscribe(() => console.log(store.getState()));

console.log('Initial State:');
console.log(store.getState());

const unsubscribe = store.subscribe(() =>
  console.log(JSON.stringify(store.getState(), null, 2)),
);

store.dispatch(addBudget('Groceries', 123));
store.dispatch(addBudget('Allowance', 456));

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Homescreen props: ');
    console.log(JSON.stringify(props, null, 2));
  }
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        {/* <ListExpenses></ListExpenses> */}
        <Button
          title="test"
          onPress={() => this.props.navigation.navigate('Details')}>
          Go To Details
        </Button>
        <Button
          title="Add Budget"
          onPress={() => store.dispatch(addBudget('Groceries', 123))}
        />
        <CounterContainer />
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

export default App;
