import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/CadastroScreen';
import HomeScreen from '../Screens/HomeScreen';
import Conversa from '../Screens/ChatScreen';
import App from '../../App';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Chat" component={Conversa}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}