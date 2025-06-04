import { View, Text, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Tela Inicial</Text>
      <Image
        source={require('../screens/LogoCereusMini.png')}
        style={{ width: 400, height: 300, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={{ textAlign: 'center', fontSize: 16 }}>
        App para monitoramento de barragens e prevenção de inundações
      </Text>
    </View>
  );
}
