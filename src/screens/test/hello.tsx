import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const ViewBoxesWithColorAndText = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ backgroundColor: 'blue', flex: 0.2 }} />
      <Text>Hello World!</Text>
    </>
  );
};

export default ViewBoxesWithColorAndText;
