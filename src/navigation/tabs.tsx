import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import Hello from '../screens/test/hello';
import Hello2 from '../screens/test/hello2';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Hello}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="wallet" iconStyle="solid" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Hello2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="book" iconStyle="solid" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
