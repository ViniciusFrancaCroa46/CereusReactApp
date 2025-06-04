import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <h1>Tela inicial</h1>
      <Button title="Monitoramento" onPress={() => navigation.navigate('Monitoramento')} />
      <Button title="Alertas" onPress={() => navigation.navigate('Alertas')} />
      <Button title="Controle" onPress={() => navigation.navigate('Controle')} />
      <Button title="Histórico" onPress={() => navigation.navigate('Historico')} />
    </View>
  );
}