import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import MonitoramentoScreen from './screens/MonitoramentoScreen';
import HomeScreen from './screens/HomeScreen';
import AlertasScreen from './screens/AlertasScreen';
import ControleScreen from './screens/ControleScreen';
import HistoricoScreen from './screens/HistoricoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Monitoramento" component={MonitoramentoScreen} />
        <Stack.Screen name="Controle" component={ControleScreen} />
        <Stack.Screen name="Alertas" component={AlertasScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
