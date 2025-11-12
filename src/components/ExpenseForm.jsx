import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import DateTimePicker from './DateTimePicker';
import { isNumber } from './../utils/index';
import { MessageManager, Message } from './MessageManager';
import { Tab } from '@rneui/themed';

const categories = [
  { label: '餐饮', value: 'dining' },
  { label: '娱乐休闲', value: 'entertainment' },
  { label: '购物', value: 'shopping' },
  { label: '交通', value: 'transportation' },
  { label: '生活服务', value: 'daily_services' },
  { label: '教育培训', value: 'education' },
  { label: '医疗健康', value: 'medical_health' },
  { label: '出行', value: 'travel' },
  { label: '文体活动', value: 'cultural_activities' },
  { label: '其他', value: 'other' },
];

const paymentTypes = [
  { label: '支付宝', value: 'alipay' },
  { label: '微信支付', value: 'wechat_pay' },
  { label: '银行卡', value: 'bank_card' },
  { label: '现金', value: 'cash' },
  { label: '信用卡', value: 'credit_card' },
  { label: '借记卡', value: 'debit_card' },
  { label: '其他', value: 'other' },
];

const ExpenseForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState(9); // 金额
  const [type, setType] = useState(0); // 0 for expense, 1 for income
  const [categoryId, setCategoryId] = useState('shopping'); // 分类
  const [accountId, setAccountId] = useState('wechat_pay'); // 微信 支付宝 or 账号
  const [date, setDate] = useState(
    new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  );

  const [desc, setDesc] = useState('desc');

  const handleSubmit = () => {
    if (!amount) {
      Message.error('请填写金额！');
      return;
    }
    console.log(
      date.getTime(),
      date.getTime() - 8 * 60 * 60 * 1000,
      new Date(date.getTime() - 8 * 60 * 60 * 1000),
      new Date(1762352024731),
      new Date(),
    );
    if (amount && categoryId && accountId && date) {
      onSubmit({
        amount: parseFloat(amount),
        type,
        categoryId,
        accountId,
        date: date.getTime() - 8 * 60 * 60 * 1000,
        desc,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Message 管理器 - 必须放在组件树的根部 */}
      <MessageManager />
      <Tab
        value={type}
        onChange={e => setType(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 0,
        }}
        variant="primary"
      >
        <Tab.Item title="支出" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="收入" titleStyle={{ fontSize: 12 }} />
      </Tab>
      <Text style={styles.labelText}>{'金额'}</Text>
      <TextInput
        value={String(amount)}
        inputMode="decimal"
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        style={styles.input}
      />
      {type === 0 && (
        <>
          <Text style={styles.labelText}>{'分类'}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={categoryId}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setCategoryId(itemValue)}
            >
              {categories.map(item => {
                return (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.labelText}>{'账户'}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={accountId}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setAccountId(itemValue)}
        >
          {paymentTypes.map(item => {
            return (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </Picker>
      </View>
      <Text style={styles.label}>选择日期时间</Text>
      <DateTimePicker value={date} onChange={setDate} />
      <Text style={styles.labelText}>{'描述'}</Text>
      <TextInput value={desc} onChangeText={setDesc} style={styles.input} />
      <Button title="Submit" onPress={handleSubmit} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 2,
    alignItems: 'start',
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    height: 55,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
  },
});

export default ExpenseForm;
