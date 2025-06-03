import { Text, FlatList, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { monitoramentoService, barreiraService } from '../services/api';

export default function HistoricoScreen() {
  const [sensores, setSensores] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [barreiras, setBarreiras] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const sensores = await monitoramentoService.getSA();
      const alerta = await monitoramentoService.getAlert();
      const barreiras = await barreiraService.getBar();
      setSensores(sensores.data);
      setRegistros(alerta.data);
      setBarreiras(barreiras.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sensoresComAlerta = registros.filter(r => r.nivelAgua > 5);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Registros dos Sensores</Text>
      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            Sensor {item.sensorId} | Nível: {item.nivelAgua.toFixed(2)} m | Temp: {item.temperatura.toFixed(1)} °C | Umid: {item.umidade}%
          </Text>
        )}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>Alertas Gerados</Text>
      {sensoresComAlerta.length === 0 ? (
        <Text>Nenhum alerta registrado.</Text>
      ) : (
        <FlatList
          data={alerta}
          keyExtractor={(item) => 'alerta-' + item.id}
          renderItem={({ item }) => (
            <Text style={{ color: 'red' }}>
              ALERTA - Sensor {item.sensorId}: {item.nivelAgua.toFixed(2)} m acima do limite!
            </Text>
          )}
        />
      )}

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>Barreiras Cadastradas</Text>
      <FlatList
        data={barreiras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.nome} - {item.ativada ? 'Ativada' : 'Desativada'}
          </Text>
        )}
      />
    </ScrollView>
  );
}