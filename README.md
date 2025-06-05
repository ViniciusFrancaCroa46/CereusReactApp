Sobre o projeto da GS1-2025: Aplicação em React Native junto com Expo, para interface do sistema de detecção, 
alerta e ativação de barreiras para prevenir alagamentos,
funcionando em conjuto ao Spring Boot no Java.

Observações do funcionamento:
  - Sobre as Telas:
    - HomeScreen: Tela inical com logo da equipe e descrição do app;
    - MonitoramentoScreen: Tela que mostra os sensores que estão funcionado e exibir seus dados como:
        Sensor Id,
        Nível da Água(m) e o alerta caso passe de 5m,
        Temperatura(ºC),
        Umidade(%);
    - HistoricoScreen: Tela com todos os registros do banco de dados H2, sendo os sensores, os alertas e as barreiras;
    - AlertasScreen: Tela que exibi os alertas que estão sendo exibidos atualmente e o sensor simulado que está o gerando;
    - ControleScreen:
      - Tela que exibi os sensores e as barreiras,
      - Para possibilida uma simulação, tem um javascript que simula 3 sensores, que tem seus valores atulizados a cada 30 segundos,
      - Foram inseridos na interface 3 botões: para começa a simulação(os dados serão exibidos nas outras telas também), para parar a simulação(os dados permaneceram), e para enviar os ultimos
        dados gerados pelos sensores simulados para o banco de dados, isso também afeta as barreiras que terão seu dados atulizados, dependendo se caso o último sensor gerar um alerta;  
        
Equipe Cereus © Integrantes:
- Vinicius França C. RM557988
- Olivier A. RM98585
- Julivan Wagner RM559030
