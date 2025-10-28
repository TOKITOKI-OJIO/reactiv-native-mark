/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Hello from './src/screens/test/hello';
import Tabs from './src/navigation/tabs';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      {/* <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      /> */}
      {/* <Hello></Hello> */}
      <Tabs></Tabs>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
