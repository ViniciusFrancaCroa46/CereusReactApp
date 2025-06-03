import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { barreiraService } from '../services/api';
import { getSensores, isSimulacaoAtiva } from '../services/sensorSimulado';

export default function AlertaScreen() {
  const [sensores, setSensores] = useState([]);
  const [barreiras, setBar] = useState([]);

  useEffect(() => {
    atualizarSensores();
    carregarBarreiras();

    const interval = setInterval(() => {
      atualizarSensores();
    }, 5000);  // Atualiza a visualização a cada 5s

    return () => clearInterval(interval);
  }, []);

  const atualizarSensores = () => {
    setSensores([...getSensores()]);
  };

  const carregarBarreiras = async () => {
    try {
      const res = await barreiraService.getBar();
      setBar(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Detecta se algum sensor gerou alerta
  const alertaAtivo = sensores.some(sensor => sensor.nivelAgua > 5);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Status dos Sensores:</Text>
      <Text>Sensores {isSimulacaoAtiva() ? 'Ativos' : 'Inativos'}</Text>

      {alertaAtivo && (
        <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10 }}>
          ALERTA: Um ou mais sensores detectaram nível acima de 5m!
        </Text>
      )}

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Status das Barreiras:</Text>
      <FlatList
        data={barreiras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.nome} - {item.ativada ? 'Ativada' : 'Desativada'}
          </Text>
        )}
      />

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Resumo dos Sensores:</Text>
      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            Sensor {item.id}: {item.nivelAgua.toFixed(2)} m {item.nivelAgua > 5 ? '!' : ''}
          </Text>
        )}
      />
    </View>
  );
}

