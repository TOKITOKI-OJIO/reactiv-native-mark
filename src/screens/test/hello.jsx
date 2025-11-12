import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../../components/ExpenseForm';

const App = () => {
  const handleExpenseSubmit = expense => {
    console.log('New expense:', expense);
  };

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={handleExpenseSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
