import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { getSensores } from '../services/sensorSimulado';

export default function MonitoramentoScreen() {
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    atualizarSensores();

    const interval = setInterval(() => {
      atualizarSensores();
    }, 5000);  // Atualiza a visualização a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const atualizarSensores = () => {
    setSensores([...getSensores()]);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dados dos Sensores</Text>

      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>Sensor {item.id}</Text>
            <Text>Nível da Água: {item.nivelAgua} m {item.nivelAgua > 5 ? 'ALERTA!' : ''}</Text>
            <Text>Temperatura: {item.temperatura} °C</Text>
            <Text>Umidade: {item.umidade}%</Text>
          </View>
        )}
      />
    </View>
  );
}