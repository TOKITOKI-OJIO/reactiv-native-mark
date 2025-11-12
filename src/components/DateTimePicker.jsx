import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DateTimePickerAndroidComponent({ value, onChange }) {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: value || new Date(),
      mode: 'date',
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
          showTimePicker(selectedDate);
        }
      },
    });
  };

  const showTimePicker = selectedDate => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      mode: 'time',
      is24Hour: true,
      onChange: (event, selectedTime) => {
        if (event.type === 'set' && selectedTime) {
          onChange(selectedTime);
        }
      },
    });
  };

  const formatted = useMemo(() => {
    if (value) {
      return (
        value.getFullYear() +
        '-' +
        String(value.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(value.getDate()).padStart(2, '0') +
        ' ' +
        String(value.getHours()).padStart(2, '0') +
        ':' +
        String(value.getMinutes()).padStart(2, '0')
      );
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={styles.buttonText}>
          {value ? `${formatted}` : '选择日期和时间'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
