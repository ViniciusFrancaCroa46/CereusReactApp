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
  sensor.nivelAgua = Math.random() < 0.8 ? (Math.random() * 5) : (5 + Math.random() * 5);
  sensor.temperatura = 15 + Math.random() * 21;
  sensor.umidade = Math.floor(40 + Math.random() * 60);
}

export function iniciarSimulacao() {
  sensores.forEach(gerarValorAleatorio);

  intervalo = setInterval(() => {
    sensores.forEach(gerarValorAleatorio);
    console.log("Valores atualizados: ", sensores);
  }, 30000);  // 30 segundos
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