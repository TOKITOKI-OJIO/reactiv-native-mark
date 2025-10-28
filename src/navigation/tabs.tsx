import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import Hello from '../screens/test/hello';
import Hello2 from '../screens/test/hello2';

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Hello} />
      <Tab.Screen name="Profile" component={Hello2} />
    </Tab.Navigator>
  );
}