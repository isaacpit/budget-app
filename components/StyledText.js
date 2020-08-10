import React from 'react';

import { Text, StyleSheet } from 'react-native';

const FONT_FAMILY = 'Cochin';

const StyledText = (props) => {
  return (
    <Text {...props} style={text_styles.baseText}>
      {props.children}
    </Text>
  );
};

export const StyledHeader = (props) => {
  return (
    <Text {...props} style={text_styles.headerText}>
      {props.children}
    </Text>
  );
};

export const text_styles = StyleSheet.create({
  baseText: {
    fontFamily: FONT_FAMILY,
    fontSize: 22,
  },
  largeText: {
    fontFamily: FONT_FAMILY,
    fontSize: 25,
  },
  headerText: {
    fontFamily: FONT_FAMILY,
    fontSize: 30,
  },
});

export default StyledText;
