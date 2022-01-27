import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reactotron from "reactotron-react-native";
import FirstScreen from "./src/screens/FirstScreen";
import MyProfile from './src/screens/MyProfile';
import ProductCategories from './src/screens/ProductCategories';
import Customers from './src/screens/Customers';

const Stack = createNativeStackNavigator();

export default function App() {
  Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FirstScreen} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Product Categories" component={ProductCategories} />
        <Stack.Screen name="Customers" component={Customers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
