import {StatusBar} from 'expo-status-bar';
import {View} from 'react-native';
import {Weather} from "./Weather";

export default function App() {
  return (
    <View>
      <StatusBar style="auto"/>
      <Weather/>
    </View>
  );
}
