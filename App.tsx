import { NavigationContainer } from "@react-navigation/native";
import Reactotron from 'reactotron-react-native'
import FirstScreen from "./src/screens/FirstScreen";

export default function App() {
  Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

  return (
    <NavigationContainer>
      <FirstScreen />
    </NavigationContainer>
  );
}
