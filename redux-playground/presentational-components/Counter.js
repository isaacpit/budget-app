import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';

// presentational component

function Counter({ test_counter, budgets, incrementCounter }) {
  console.log('COUNTER COMPONENT: ' + JSON.stringify(budgets, null, 2));
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: '#FDD7E4',
        padding: 10,
      }}>
      <Button title="Increment Counter" onPress={() => incrementCounter()} />
      <Button
        title="Generate new Budget"
        onPress={() => {
          console.log('id: ' + uuidv4());
          incrementCounter();
        }}
      />
      <Text>Count: {test_counter}</Text>

      {budgets.map((budget, index) => {
        console.log(`${index} ${budget.name}`);
        return (
          <View
            key={index}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'red',
              alignSelf: 'stretch',
              padding: 10,
              // width: 200,
              // width: "100%",
            }}>
            <Text>{budget.name}</Text>
            <Text>{budget.max}</Text>
          </View>
        );
      })}
    </View>
  );
}

Counter.propTypes = {
  test_counter: PropTypes.number.isRequired,
};

export default Counter;
