import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Timer = () => {
  const [isCountingDown, setIsCountingDown] = useState(true);

  const id = useRef(null);
  const [timeCount, setTimeCount] = useState(3);
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
      setIsCountingDown(false);
    }
  }, [timeCount]);

  return (
    <View style={styles.topLevelContainer}>
      <View style={styles.bordered}>
        <Text style={styles.header}>Timer</Text>
      </View>
      <Text style={styles.largeText}>
        {isCountingDown ? 'Counting down' : 'Done!'}
      </Text>
      <Text style={styles.p}>{timeCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topLevelContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bordered: {
    padding: 4,
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    fontSize: 30,
  },
  largeText: {
    fontSize: 25,
  },
  p: {
    fontSize: 20,
  },
});

export default Timer;
