import React, { useState } from 'react';

import { View, Text } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker'

const DateView = () => {
  return (
    <View>
      {/* <DateTimePicker
        value={new Date()}
        display="default"
        //
      /> */}
      {/* <DateTimePicker
        value={new Date()}
        display="spinner"
        //
      /> */}
      <DateTimePicker
        value={new Date()}
        display="compact"
        // mode="countdown"
        style={{ width: 300,height: 50 }}
        //
      />
    </View>
  );
};

export default DateView;