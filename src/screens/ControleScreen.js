import { View, Text, Button, FlatList, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { monitoramentoService, barreiraService } from '../services/api';
import { getSensores, iniciarSimulacao, pararSimulacao } from '../services/sensorSimulado';

export default function ControleScreen() {
  const [sensores, setSA] = useState([]);
  const [barreiras, setBar] = useState([]);

  useEffect(() => {
    atualizarSensores();
    carregarBarreiras();

    const interval = setInterval(() => {
      atualizarSensores();
    }, 5000);  // Atualiza a exibição a cada 5s (não muda os valores)

    return () => clearInterval(interval);
  }, []);

  const atualizarSensores = () => {
    setSA([...getSensores()]);
  };

  const carregarBarreiras = async () => {
    try {
      const res = await barreiraService.getBar();
      setBar(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const enviarDados = async () => {
    try {
      for (const sensor of sensores) {
        const payload = {
          nivelAgua: sensor.nivelAgua,
          temperatura: sensor.temperatura,
          umidade: sensor.umidade
        };

        console.log('Enviando:', payload);

        await monitoramentoService.createSA(payload);
      }

      Alert.alert("Sucesso", "Todos os dados enviados para o backend!");
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      Alert.alert("Erro", "Falha ao enviar dados.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Iniciar Simulação" onPress={() => iniciarSimulacao()} />
      <Button title="Parar Simulação" onPress={() => pararSimulacao()} />
      <Button title="Enviar Dados ao Backend" onPress={() => enviarDados()} />

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Sensores:</Text>
      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5
          }}>
            <Text style={{ fontWeight: 'bold' }}>Sensor {item.id}</Text>
            <Text>Nível: {item.nivelAgua} m {item.nivelAgua > 5 ? 'ALERTA!' : ''}</Text>
            <Text>Temperatura: {item.temperatura} °C</Text>
            <Text>Umidade: {item.umidade}%</Text>
          </View>
        )}
      />

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Barreiras:</Text>
      <FlatList
        data={barreiras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.id} - {item.ativacao ? 'Ativada' : 'Desativada'}</Text>
        )}
      />
    </View>
  );
}