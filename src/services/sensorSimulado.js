let sensores = [
  { id: 7, nivelAgua: 0, temperatura: 0, umidade: 0 },
  { id: 8, nivelAgua: 0, temperatura: 0, umidade: 0 },
  { id: 9, nivelAgua: 0, temperatura: 0, umidade: 0 },
];

let intervalo = null;

export function isSimulacaoAtiva() {
  return intervalo !== null;
}

function gerarValorAleatorio(sensor) {
 sensor.nivelAgua = Math.random() < 0.8 
    ? Math.round(Math.random() * 500) / 100   // 0.00 - 5.00 m
    : Math.round((5 + Math.random() * 5) * 100) / 100;  // 5.00 - 10.00 m

  sensor.temperatura = Math.round((15 + Math.random() * 21) * 100) / 100;  // 15.00 - 36.00 °C

  sensor.umidade = Math.floor(40 + Math.random() * 60);
}

export function iniciarSimulacao() {
  sensores.forEach(gerarValorAleatorio);

  intervalo = setInterval(() => {
    sensores.forEach(gerarValorAleatorio);
    console.log("Valores atualizados: ", sensores);
  }, 60000);  // 60 segundos
}

export function pararSimulacao() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
    console.log("Simulação parada.");
  }
}

export function getSensores() {
  return sensores;
}