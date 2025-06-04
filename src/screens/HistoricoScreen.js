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
      setSensores(sensores.data || []);
      setRegistros(alerta.data || []);
      setBarreiras(barreiras.data || []);
      console.log("Sensores:", sensores.data);
      console.log("Registros:", alerta.data);
      console.log("Barreiras:", barreiras.data);
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Registros dos Sensores</Text>
      <FlatList
        data={sensores}
        keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <Text>
            Sensor ID: {item.id ?? 'N/A'} | 
            Nível: {item.nivelAgua != null ? item.nivelAgua + ' m' : 'N/A'} | 
            Temp: {item.temperatura != null ? item.temperatura + ' °C' : 'N/A'} | 
            Umid: {item.umidade != null ? item.umidade + '%' : 'N/A'} | 
            Registrado em: {item.dataHora}
          </Text>
        )}
        ListEmptyComponent={<Text>Nenhum sensor registrado.</Text>}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>Alertas Gerados</Text>
      {registros.length == 0 ? (
        <Text>Nenhum alerta registrado.</Text>
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item, index) => item?.id ? `alerta-${item}` : `alerta-${index}`}
          renderItem={({ item }) => (
            <Text style={{ color: 'red' }}>
              ALERTA - ID: {item.id ?? 'N/A'} | Sensor {item.sensorAgua.id ?? 'N/A'}  
              |{item.sensorAgua.nivelAgua != null ? item.sensorAgua.nivelAgua + ' m, passando do limite!' : 'N/A'} | 
              Registrado em: {item.dataHora}
            </Text>
          )}
        />
      )}

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>Barreiras Cadastradas</Text>
      <FlatList
        data={barreiras}
        keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <Text>
            Barreira ID: {item.id ?? 'N/A'} - {item.ativacao ? 'Ativada' : 'Desativada'} | 
            Registrado em: {item.dataHoraAtivacao}
          </Text>
        )}
        ListEmptyComponent={<Text>Nenhuma barreira cadastrada.</Text>}
      />
    </ScrollView>
  );
}
