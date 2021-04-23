# pit-backend
Desafio referente à implementação do backend de uma aplicação de agendamento da vacinação contra a COVID-19. Em relação aos agendamentos, devemos seguir algumas regras:
 
- A disponibilidade das vagas são de 20 por dia. 
- Só existe a disponibilidade máxima de 2 agendamentos para o mesmo horário. 
- Caso um paciente idoso(60+ anos) escolha a mesma hora que um paciente mais jovem ele terá prioridade, ou seja, o paciente mais jovem
terá seu agendamento cancelado e o idoso será alocado no seu lugar.

## :blue_book: Instruções de uso

- Baixe o repositório através do comando `git clone https://github.com/gabrieloqm/pit-backend.git`
- Instale os pacotes necessários para esta aplicação através do `yarn` ou `npm install`
- Verifique as variáveis de ambiente em `.env.example` e crie um arquivo `.env` inserindo os valores para as variáveis. Este projeto está rodando na `HTTP_PORT=3333` e os valores para `DAILY_LIMIT` e `HOUR_LIMIT` são referentes a disponibilidade máxima de vagas por dia`(20)` e por hora`(2)`, respectivamente. O `MONGO_URL` é referente à URL da nossa base de dados
- Para iniciar a aplicação backend, utilize o comando `yarn start`
- Com a aplicação rodando, utilize o comando `npx jest` para executar os testes.
