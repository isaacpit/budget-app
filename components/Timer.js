import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native';

const Timer = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
      setIsLoaded(true);
    }
  }, [timeCount]);

  return (
    <View>
      <Text>Timer</Text>
      <Text style={{ fontSize: 30 }}>
        {isLoaded ? 'Loaded data' : 'Loading!'}
      </Text>
      <Text>{timeCount}</Text>
    </View>
  );
};

export default Timer;
