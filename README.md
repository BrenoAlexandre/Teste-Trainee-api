<p align="center">
  <img src="https://softdesign.com.br/wp-content/themes/bones/library/images/logotipo.svg" alt="Softdesign logo" />
</p>

# Pré-requisitos

Digite o comando:

`$ yarn install`

Ter o Docker instalado e rodar o seguinte comando

`$ docker run --name trainee-teste -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

Configurar um database postgres com as variáveis do .env.example

Copiar as variáveis do .env.example para um arquivo .env

# Seed

Digite os comandos:

`$ yarn typeorm:run`

`$ yarn seed:run`

Isso criará a tabela de usuários e os primeiros registros no banco

Admin:

user: Admin master

password: 123123admin

cpf: 00000000000

# Start

Digite o comando:

`$ yarn dev`

# Test

Digite o comando:

`$ yarn test`
